"use client";
import React from "react";
import { FaUsers, FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Counter = ({ type, count }) => {
  const t = useTranslations("Doctor-Dashboard");

  const icons = {
    patients: <FaUsers className="bg-white rounded-full p-2" size={48} />,
    appointments: (
      <FaCalendarCheck size={48} className="bg-white rounded-full p-2" />
    ),
    income: <FaDollarSign size={48} className="bg-white rounded-full p-2" />,
  };

  const colors = {
    patients: "bg-soft-green",
    appointments: "bg-soft-blue",
    income: "bg-soft-violet",
  };

  return (
    <div className={`p-4 rounded-xl ${colors[type]}`}>
      <div className="flex flex-col items-center text-center">
        {icons[type]}
        <div className=" mt-2">
          <p className="text-lg font-medium">
            {type === "patients" && t("Total Patient")}
            {type === "appointments" && t("Total Appointments")}
            {type === "income" && t("Total Income")}
          </p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
