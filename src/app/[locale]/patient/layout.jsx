import PatientNav from "./components/PatientNav";

export const metadata = {
  title: "Patient | A Doctor's Appointment",
  description: "A Doctor's Appointment Web Application",
  icons: "/favicon.ico",
  openGraph: {
    title: "Patient | A Doctor's Appointment",
    description: "A Doctor's Appointment Web Application",
    siteName: "Medical Appointment,A Doctor's Appointment",
    icons: "/favicon.ico",
  },
};
const Layout = async (props) => {
  
  return (
    <>
      <PatientNav />
      {props.children}
    </>
  );
};

export default Layout;
