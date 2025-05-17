export const langs = ["en", "es", "fr", "de", "it", "pt"] as const;

export type Lang = (typeof langs)[number];

export const langsMap: Record<Lang, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
};