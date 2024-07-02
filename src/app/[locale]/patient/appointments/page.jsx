"use client";

import React, { useEffect, useState } from "react";
import MedicalSection from "../components/MedicalSection";
import ConfirmDoctor from "../components/ConfirmedDoctor";
import { getUserSession } from "@/utils/session";

const Page = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = getUserSession();
  const patientId = user.user_details._id;

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/appointment/fetchAppointmentByPatient",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patient: patientId }),
        }
      );
      const data = await response.json();
      setAppointments(data.appointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [patientId]);

  const DoctorCardSkeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
      <div className="h-32 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="overflow-hidden">
        <title>Appointment | A Doctor's Appointment</title>
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
      <title>Appointment | A Doctor's Appointment</title>
      <MedicalSection />
      <div className="grid grid-cols-1 container mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
        {appointments.map((appointment) => (
          <ConfirmDoctor
            key={appointment._id}
            appointment={appointment}
            patientId={patientId}
            onAppointmentChange={fetchAppointments}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
