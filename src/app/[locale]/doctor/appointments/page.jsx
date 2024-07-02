"use client";
import { useTranslations } from "next-intl";
import MedicalSection from "../components/MedicalSection";
import AppointmentTabs from "./AppointmentTabs";

export default function Page() {
  const t = useTranslations("DoctorDashboard");
  return (
    <div className="">
      <title>Appointments | A Doctor's Appointment</title>
      <MedicalSection placeholder={t("Search Patient")} />
      <AppointmentTabs />
    </div>
  );
}
