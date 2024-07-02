import React from "react";
import SpecialitiessAdmin from "./SpecialtiesAdmin";
import TableSpecialities from "./TableSpecialties";
import { Pagination } from "@nextui-org/react";
import { Paginations } from "@/app/components/Pagination";

const page = () => {
  return (
    <div className="container mx-auto">
      <title>Specialties | A Doctor's Appointment</title>
      <SpecialitiessAdmin />
      <TableSpecialities />
      <Paginations />
    </div>
  );
};

export default page;
