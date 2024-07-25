import React from "react";
import ReviewsAdmin from "./TransActionsAdmin";
import TransactionTable from "./TransactionTable";
import { Paginations } from "@/app/components/Pagination";

const page = () => {
  return (
    <div className="container mx-auto">
      <title>Transactions | Medical Appointment</title>
      <ReviewsAdmin />
      <TransactionTable />
      <Paginations />
    </div>
  );
};

export default page;
