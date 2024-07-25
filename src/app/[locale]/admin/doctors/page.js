import React from "react";
import DoctorsAdmin from "./DoctorsAdmin";
import TableDoctors from "./TableDoctors";
import { Paginations } from "@/app/components/Pagination";

const page = () => {
  return (
    <div className="container mx-auto">
      <title>Doctors | Medical Appointment</title>
      <DoctorsAdmin />
      <TableDoctors />
      <Paginations />
    </div>
  );
};

export default page;
