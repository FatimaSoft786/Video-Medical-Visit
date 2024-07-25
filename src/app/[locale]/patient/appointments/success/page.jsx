"use client";

import getPath from "@/utils/path";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

const page = () => {
  const path = getPath();

  return (
    <div className="flex justify-center text-3xl font-bold gap-2 items-center w-full min-h-[80vh]">
      <title>Successfull | Createdd Appointment</title>
      <Link
        href={`/${path}/patient/appointments`}
        className="active:scale-80 absolute top-14 left-8 ml-12 mt-10 transition-all duration-300 hover:text-black/80"
      >
        <FaArrowLeft className="my-6 text-2xl " />
      </Link>
      <FaCheck className="bg-green-600 rounded-full text-white p-2 text-5xl size-12" />{" "}
      Appointment Created
    </div>
  );
};

export default page;
