import { LoginSchema, FormState } from "@/app/login/lib/definitions";

import { createSession, deleteSession } from "@/app/login/lib/sessions";

import { redirect } from "next/navigation";

export async function loginAction(state: FormState, formData: FormData) {
  const validatedFields = LoginSchema.isValid({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields) {
    return {
      errors: {
        username: ["invalid username"],
        password: ["invalid password"],
      },
    };
  }

  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      username: (formData.get("username") as string) || "",
      password: (formData.get("password") as string) || "",
    }),
    headers: { "Content-Type": "application/json" },
  });

  const item = await response.json();

  if (!item.accessToken && !item.refreshToken) {
    return {
      message: "token is empty",
    };
  }

  await createSession({
    tokens: { accessToken: item.accessToken, refreshToken: item.refreshToken },
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  deleteSession();
  redirect("/login");
}
