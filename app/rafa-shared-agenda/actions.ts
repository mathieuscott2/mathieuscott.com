"use server";
import {redirect} from "next/navigation";
import {grantAccess} from "./auth";
export async function unlock(formData:FormData){const supplied=String(formData.get("password")??""),expected=process.env.RAFA_AGENDA_PASSWORD??"";if(!expected||supplied!==expected)redirect("/rafa-shared-agenda?error=1");await grantAccess();redirect("/rafa-shared-agenda")}
