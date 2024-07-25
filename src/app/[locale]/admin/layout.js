import TopbarAdmin from "./dashboard/@dashboard/DashboardNav";

export const metadata = {
  title: "Dashobard | A Doctor's Appointment",
  description: "A Doctor's Appointment Web Application",
  icons: "/favicon.ico",
  openGraph: {
    title: "Dahobard | A Doctor's Appointment",
    description: "A Doctor's Appointment Web Application",
    siteName: "Medical Appointment,A Doctor's Appointment",
    icons: "/favicon.ico",
  },
};
const Layout = async (props) => {
  return (
    <>
      <TopbarAdmin />
      {props.children}
    </>
  );
};

export default Layout;
