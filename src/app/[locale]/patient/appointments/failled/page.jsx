"use client";

import getPath from "@/utils/path";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const page = () => {
  const path = getPath();
  return (
    <div className="flex justify-center text-3xl font-bold gap-2 items-center w-full min-h-[80vh]">
      <title>Failled | Creating Appointment</title>
      <Link
        href={`/${path}/patient/appointments`}
        className="active:scale-80 absolute top-20 left-8 ml-12 mt-10 transition-all duration-300 hover:text-black/80"
      >
        <FaArrowLeft className="my-6 text-2xl " />
      </Link>
      <MdCancel className="text-red-600 rounded-full text-5xl size-12" />{" "}
      Appointment Not Created
    </div>
  );
};

export default page;
