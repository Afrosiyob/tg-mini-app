"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/app/login/lib/session";
import { redirect } from "next/navigation";

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.accessToken && !session?.refreshToken) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
};
