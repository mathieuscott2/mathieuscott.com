// Password-protected, non-indexed report pages: /audits/<slug> and /audits/<slug>/<page>.html.
// The pages are stored encrypted (content/audits/*.json, made by scripts/encrypt-audit.mjs) because the repo is
// public; they are decrypted here with AUDIT_PASSWORD after HTTP Basic auth against AUDIT_USER / AUDIT_PASSWORD.
import {createDecipheriv, createHash, scryptSync, timingSafeEqual} from "node:crypto";
import {AUDITS} from "@/content/audits/registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRIVATE = {"X-Robots-Tag": "noindex, nofollow, noarchive", "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer"};
const same = (a: string, b: string) =>
  timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());

function authorized(req: Request, user: string, password: string) {
  const h = req.headers.get("authorization") ?? "";
  if (!h.startsWith("Basic ")) return false;
  const decoded = Buffer.from(h.slice(6), "base64").toString("utf8"), i = decoded.indexOf(":");
  if (i < 1) return false;
  const userOk = same(decoded.slice(0, i), user), passwordOk = same(decoded.slice(i + 1), password);  // both always run
  return userOk && passwordOk;
}

export async function GET(req: Request, ctx: {params: Promise<{path: string[]}>}) {
  const user = process.env.AUDIT_USER, password = process.env.AUDIT_PASSWORD;
  if (!user || !password) return new Response("Not available.", {status: 503, headers: PRIVATE});
  if (!authorized(req, user, password))
    return new Response("Password required.", {status: 401, headers: {...PRIVATE, "WWW-Authenticate": 'Basic realm="Audits", charset="UTF-8"'}});

  const [slug, page = "index.html", ...rest] = (await ctx.params).path;
  const audit = AUDITS[slug], file = rest.length ? undefined : audit?.files[page];
  if (!audit || !file) return new Response("Not found.", {status: 404, headers: PRIVATE});
  try {
    const key = scryptSync(password, Buffer.from(audit.salt, "base64"), 32);
    const d = createDecipheriv("aes-256-gcm", key, Buffer.from(file.iv, "base64"));
    d.setAuthTag(Buffer.from(file.tag, "base64"));
    const html = Buffer.concat([d.update(Buffer.from(file.data, "base64")), d.final()]).toString("utf8");
    return new Response(html, {headers: {...PRIVATE, "Content-Type": "text/html; charset=utf-8"}});
  } catch {
    // Encrypted with a different password than the one set in Vercel.
    return new Response("This audit can't be opened with the current password.", {status: 500, headers: PRIVATE});
  }
}
