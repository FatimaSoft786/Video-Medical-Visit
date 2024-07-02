"use client";

import { getUserSession } from "@/utils/session";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Anamens from "./Anamnesis";

const Page = ({ params }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = getUserSession();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.post(
          "https://video-medical-backend-production.up.railway.app/api/appointment/fetchAppointmentByDoctor",
          { doctor: user.user_details._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { appointments_list } = response.data;
        const matchingAppointment = appointments_list.find(
          (appointment) => appointment.patient._id === params.id
        );

        if (matchingAppointment) {
          setPatientData(matchingAppointment.patient);
        } else {
          setPatientData(null);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Error fetching appointments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [params.id, user.user_details._id, token]);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton height={30} width={200} />
        <Skeleton count={10} className="my-2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center h-[75vh] flex items-center justify-center text-3xl">
        {error}
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="text-center h-[75vh] flex items-center justify-center text-3xl">
        No patient data found for this ID
      </div>
    );
  }

  const profileFields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "sex", label: "Sex" },
    { key: "dob", label: "Date of Birth" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "location", label: "Location" },
    { key: "postal_code", label: "Postal Code" },
  ];

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4 px-6">Patient Profile</h1>
      <div className="flex flex-col container mx-auto">
        <div className="h-[1px] w-full bg-line_gray"></div>
        <div className="flex flex-col rounded-lg mb-12 max-sm:m-5 border border-line_gray">
          <div className="flex max-sm:flex-col justify-start items-center gap-6 m-10">
            <Avatar
              className="rounded-full w-[100px] h-[100px] border-2 border-primary-color object-cover"
              src={
                patientData.picture_url
                  ? patientData.picture_url
                  : patientData.default_picture_url
              }
              alt="profile"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10 mb-9">
            {profileFields.map((field) => (
              <div key={field.key} className="flex flex-col">
                <h1 className="font-medium text-[14px] text-primary-color">
                  {field.label}
                </h1>
                <p
                  title={patientData[field.key] || ""}
                  className="w-full overflow-hidden mt-2 font-normal py-2.5 rounded-[5px] h-[48px] text-dark-gray border-2 px-3"
                >
                  {patientData[field.key] || `..`}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-10 py-9">
          <Anamens isProfile={true} userDetails={patientData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
