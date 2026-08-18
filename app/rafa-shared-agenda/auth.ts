import "server-only";
import {cookies} from "next/headers";
import {createHmac,timingSafeEqual} from "crypto";
const COOKIE="rafa_agenda_session";
function signature(){const password=process.env.RAFA_AGENDA_PASSWORD;if(!password)throw new Error("RAFA_AGENDA_PASSWORD is not configured");return createHmac("sha256",password).update("rafa-agenda-v1").digest("hex")}
export async function hasAccess(){const value=(await cookies()).get(COOKIE)?.value;if(!value)return false;const expected=signature(),a=Buffer.from(value),b=Buffer.from(expected);return a.length===b.length&&timingSafeEqual(a,b)}
export async function grantAccess(){(await cookies()).set(COOKIE,signature(),{httpOnly:true,secure:true,sameSite:"lax",path:"/rafa-shared-agenda",maxAge:60*60*24*30})}
