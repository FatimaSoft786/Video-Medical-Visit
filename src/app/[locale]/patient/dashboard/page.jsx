"use client";
import React, { useEffect, useState } from "react";
import MedicalSection from "../components/MedicalSection";
import DoctorCard from "./DoctorCard";
import getPath from "@/utils/path";
import { getUserSession } from "@/utils/session";

const Page = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const path = getPath();
  const { token, user } = getUserSession();
  const patientId = user.user_details._id;

  useEffect(() => {
    const fetchFavoriteDoctors = async () => {
      try {
        const response = await fetch(
          `https://video-medical-backend-production.up.railway.app/api/user/doctorsList`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: "Doctor" }),
          }
        );

        const data = await response.json();
        if (data.success) {
          setDoctors(data.doctors_list);
          console.log(data.doctors_list);
        } else {
          console.error("Failed to fetch favorite doctors data");
        }
      } catch (error) {
        console.error("Error fetching favorite doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteDoctors();
  }, []);

  const DoctorCardSkeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
      <div className="h-32 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="overflow-hidden">
        <title>Favorite Doctors | Medical Appointment</title>
        <MedicalSection />
        <div className="w-full grid container mx-auto grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 p-8">
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <MedicalSection />
      <div className="w-full grid container mx-auto grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 p-8">
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            patientId={patientId}
            token={token}
          />
        ))}
      </div>
      {doctors.length === 0 && (
        <p className="text-center pb-12 font-bold text-3xl w-full mx-auto">
          No Doctors found
        </p>
      )}
    </div>
  );
};

export default Page;
