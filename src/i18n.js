import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// languages are english,italian,Arabic,french
const locales = ["en", "it", "ar", "fr"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../languages/${locale}.json`)).default,
  };
});
