import { getRequestConfig } from "next-intl/server";

import { defaultLocale, locales } from "./config";
import { getLocale } from "./locale";
import type { Locale } from "./types";

export default getRequestConfig(async () => {
  const locale = (await getLocale()) as Locale;

  return {
    locale,
    messages:
      locale === defaultLocale || !locales.includes(locale)
        ? (await import(`../messages/${defaultLocale}.json`)).default
        : (await import(`../messages/${locale}.json`)).default,
  };
});
