"use client";

import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import getPath from "@/utils/path";

export default function Page({ params }) {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const path = getPath();

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const fetchDoctorList = await fetch(
          `https://video-medical-backend-production.up.railway.app/api/user/doctorsList`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: "Doctor" }),
          }
        );

        const doctorListData = await fetchDoctorList.json();

        if (doctorListData.success) {
          const doctorFromList = doctorListData.doctors_list.find(
            (doctor) => doctor._id === params.id
          );

          setDoctor(doctorFromList);
        } else {
          setError("Failed to fetch doctor list");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Failed to fetch doctor data");
      } finally {
        setLoading(false); 
      }
    }

    fetchDoctor();
  }, [params.id]);

  if (loading) {
    return <ProfileCardSkeleton />;
  }

  if (error) {
    return (
      <div className="text-4xl font-bold flex items-center justify-center min-h-[85dvh]">
        Error: {error}
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-4xl font-bold flex items-center justify-center min-h-[85dvh]">
        No doctor found
      </div>
    );
  }

  return (
    <div className="container mx-auto relative">
      <title>Doctor Details | A Doctor's Appointment</title>

      <Link
        href={`/${path}/patient/dashboard`}
        className="active:scale-90 top-0 hover:opacity-90 absolute transition-all duration-300 hover:text-black/80"
      >
        <FaArrowLeft className="my-6 text-2xl " />
      </Link>
      <ProfileCard doctor={doctor} />
    </div>
  );
}
