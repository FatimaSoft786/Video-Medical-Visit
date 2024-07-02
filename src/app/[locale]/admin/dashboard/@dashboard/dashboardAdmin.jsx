"use client";
import { Image, Switch } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import DoctorCard from "./DoctorCard";

const cardsData = [
  {
    icon: "/svg/adminDashboard/doctorCard.svg",
    title: "Doctors",
    count: 168,
    link: "/admin/doctors",
    bgColor: "bg-cyan-card",
  },
  {
    icon: "/svg/adminDashboard/patientCard.svg",
    title: "Patients",
    count: 200,
    link: "/admin/patients",
    bgColor: "bg-green-card",
  },
  {
    icon: "/svg/adminDashboard/appointmentCard.svg",
    title: "Appointments",
    count: 422121,
    link: "/admin/appointments",
    bgColor: "bg-red-card",
  },
  {
    icon: "/svg/adminDashboard/incomeCard.svg",
    title: "Income",
    count: "$43664",
    link: "/admin/doctors",
    bgColor: "bg-yellow-card",
  },
];

const doctorRequests = [
  {
    name: "Hamza Yasin",
    specialty: "Dentist",
  },
  {
    name: "Hamza Yasin",
    specialty: "Dentist",
  },
  {
    name: "Hamza Yasin",
    specialty: "Dentist",
  },

  {
    name: "Hamza Yasin",
    specialty: "Dentist",
  },
];

const DashboardAdmin = () => {
  const params = useParams();
  return (
    <>
      <div className="flex container flex-col mx-auto py-6 h-auto gap-4">
        <h1 className="font-bold text-3xl max-md:text-2xl mt-4 mb-8 px-4">
          Welcome Admin!
        </h1>
        {/* grid */}
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {cardsData.map((card) => (
            <Link
              href={`/${params.locale}${card.link}`}
              className={`w-auto h-28 shadow-lg text-white rounded-2xl p-4 m-4 ${card.bgColor}`}
              key={card.title}
            >
              <div className="flex h-full items-center text-left gap-2">
                <div className="p-2 rounded-full bg-white">
                  <Image
                    radius="none"
                    src={card.icon}
                    alt={card.title}
                    className="w-8 h-8 p-0.5 "
                  />
                </div>
                <div>
                  <h1 className="text-xl">{card.title}</h1>
                  <h1 className="text-2xl font-bold">{card.count}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="border rounded-lg mx-[14px]">
          <h1 className="text-2xl font-bold pt-10 pb-4 px-6">
            Doctor Request For Account Approval
          </h1>
          <DoctorCard doctorRequests={doctorRequests} />
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
