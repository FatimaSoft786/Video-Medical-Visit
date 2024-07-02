import React from "react";
import AppointmentAdmin from "./AppointmentAdmin";
import { Paginations } from "@/app/components/Pagination";

const page = () => {
  return (
    <div className=" container mx-auto">
      <title>Appointments | A Doctor's Appointment</title>
      <AppointmentAdmin />
      <Paginations />
    </div>
  );
};

export default page;
