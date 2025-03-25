"use client";

import { useLocale } from "next-intl";
import { FC } from "react";

import { localesMap } from "@/i18n/config";
import { setLocale } from "@/i18n/locale";
import { Locale } from "@/i18n/types";

export const LocaleSwitcher: FC = () => {
  const locale = useLocale();

  const onChange = (value: string) => {
    const locale = value as Locale;
    setLocale(locale);
  };

  return (
    <select value={locale} onChange={({ target }) => onChange(target.value)}>
      {localesMap.map((locale) => (
        <option key={locale.key} value={locale.key}>
          {locale.title}
        </option>
      ))}
    </select>
  );
};
