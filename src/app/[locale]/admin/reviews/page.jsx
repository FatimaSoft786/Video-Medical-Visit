import React from "react";
import ReviewsAdmin from "./ReviewsAdmin";
import ReviewTable from "./ReviewTable";
import { Paginations } from "@/app/components/Pagination";

const page = () => {
  return (
    <div className=" container mx-auto">
      <title>Reviews | Medical Appointment</title>
      <ReviewsAdmin />
      <ReviewTable />
      <Paginations />
    </div>
  );
};

export default page;
