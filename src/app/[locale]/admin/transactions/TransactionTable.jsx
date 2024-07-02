"use client";
import Deletebtn from "@/app/components/Deletebtn";
import { Image } from "@nextui-org/react";
import React, { useState } from "react";
import TransactionSidebar from "./TransactionSidebar";
const headers = [
  "Invoice Number",
  "Patient ID",
  "Patient Name",
  "Total Amount",
  "Status",
  "Actions",
];
const data = [
  {
    patientName: "John smith",
    InvoiceNumber: "#322244",
    PatientID: "#apt222",
    totalAmount: "$5885",
    status: true,
  },
  {
    patientName: "John smith",
    InvoiceNumber: "#322244",
    PatientID: "#apt222",
    totalAmount: "$5885",
    status: false,
  },
  {
    patientName: "John smith",
    InvoiceNumber: "#322244",
    PatientID: "#apt222",
    totalAmount: "$5885",
    status: true,
  },
  {
    patientName: "John smith",
    InvoiceNumber: "#322244",
    PatientID: "#apt222",
    totalAmount: "$5885",
    status: false,
  },
];

const TransactionTable = () => {
  return (
    <div className="overflow-auto w-full">
      <div className="border mx-4">
        <div className="table w-full">
          {/* Header section */}
          <div className="table-header-group bg-light-gray text-black">
            <div className="table-row">
              {headers.map((header, index) => (
                <div
                  key={index}
                  className="table-cell first:pl-10 font-semibold text-left text-lg px-4 py-4 max-lg:text-base max-sm:text-sm"
                >
                  {header}
                </div>
              ))}
            </div>
          </div>
          {/* Table body */}
          <div className="table-row-group text-dark-gray">
            {data.map((review, index) => (
              <div
                key={index}
                className="table-row border-b border-light-gray relative"
              >
                <div className="table-cell place-content-center pl-14 py-3 px-4 max-lg:text-base max-sm:text-sm">
                  {review.InvoiceNumber}
                </div>
                <div className="table-cell place-content-center items-center justify-center py-3 px-4 max-lg:text-base max-sm:text-sm gap-1">
                  {review.PatientID}
                </div>
                <div className="table-cell place-content-center items-center justify-center py-3 px-4 max-lg:text-base max-sm:text-sm gap-1">
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/svg/user.svg"
                      className="size-8 max-sm:hidden"
                      alt="User Icon"
                    />
                    {review.patientName}
                  </div>
                </div>
                <div className="table-cell place-content-center items-center justify-center py-3 pl-8 max-lg:text-base max-sm:text-sm gap-1">
                  {review.totalAmount}
                </div>
                <div className="table-cell text-left place-content-center py-3 px-4 max-lg:text-base max-sm:text-sm">
                  <TransactionSidebar review={review.status} />
                </div>
                <div className="table-cell text-left place-content-center py-3 px-4 max-lg:text-base max-sm:text-sm">
                  <Deletebtn />
                </div>
                <hr className="w-full h-2 absolute bottom-0 left-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
