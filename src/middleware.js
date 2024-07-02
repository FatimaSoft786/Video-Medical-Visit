import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["it", "en", "es", "fr"],

  defaultLocale: "it",
});

export const config = {
  matcher: ["/", "/(it|en|es|fr)/:path*"],
};
