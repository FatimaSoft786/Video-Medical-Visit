import React from "react";
import DoctorsAdmin from "./PatientsAdmin";
import PatienceTable from "./PatienceTable";
import { Paginations } from "@/app/components/Pagination";

const page = () => {
  return (
    <div className=" container mx-auto">
      <title>Patients | Medical Appointment</title>
      <DoctorsAdmin />
      <PatienceTable />
      <Paginations />
    </div>
  );
};

export default page;
