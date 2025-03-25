import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Root } from "@/components/Root/Root";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "@telegram-apps/telegram-ui/dist/styles.css";

export const metadata: Metadata = {
  title: "Your Application Title Goes Here",
  description: "Your application description goes here",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Root>{children}</Root>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
