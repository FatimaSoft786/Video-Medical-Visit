import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UiProviders } from "@/utils/UiProvider";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/app/context/SocketContext";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  title: "Medical Appointment | A Doctor's Appointment",
  description: "A Doctor's Appointment Web Application",
  icons: "/favicon.ico",
  openGraph: {
    title: "Medical Appointment | A Doctor's Appointment",
    description: "A Doctor's Appointment Web Application",
    siteName: "Medical Appointment,A Doctor's Appointment",
    icons: "/favicon.ico",
  },
};
const RootLayout = async (props) => {
  const messages = await getMessages();

  return (
    <html
      lang={props.params.locale}
      className={poppins.className}
      suppressHydrationWarning={false}
      dir={props.params.locale === "ar" ? "rtl" : "ltr"}
    >
      <body className={"bg-white"} suppressHydrationWarning={false}>
        <NextIntlClientProvider messages={messages}>
        <>
          <UiProviders>
            <Toaster />
            {props.children}
          </UiProviders>
          </>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
