"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import AppointmentTabs from "./AppointmentTabs";
import RatingSection from "./RatingSection";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import getPath from "@/utils/path";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/utils/session";
import { toast } from "react-hot-toast";

const Page = ({ params }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedFee, setSelectedFee] = useState(null);
  const [appointmentType, setAppointmentType] = useState("visit");
  const path = getPath();
  const route = useRouter();

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const fetchDoctorResponse = await fetch(
          `https://video-medical-backend-production.up.railway.app/api/user/getSlots`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ doctorId: params.id }),
          }
        );

        const doctorData = await fetchDoctorResponse.json();

        if (doctorData.success) {
          setDoctor(doctorData.appointment_details);
        } else if (doctorData?.message) {
          setError(doctorData?.message);
        } else {
          setError("Failed to fetch doctor details");
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
      <div className="container px-6 mx-auto py-9">
        <b
          onClick={() => {
            route.back();
          }}
          className="active:scale-80 transition-all  duration-300 hover:text-black/80"
        >
          <FaArrowLeft className="my-6 text-2xl " />
        </b>
        <title>Appointment Details</title>
        <div className="text-4xl font-bold flex items-center justify-center min-h-[50vh]">
          {error}
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container px-6 mx-auto py-9">
        <Link
          href={`/${path}/patient/appointments`}
          className="active:scale-80 transition-all duration-300 hover:text-black/80"
        >
          <FaArrowLeft className="my-6 text-2xl " />
        </Link>
        <title>Appointment Details</title>
        <div className="text-4xl font-bold flex items-center justify-center min-h-[50vh]">
          No doctor found
        </div>
      </div>
    );
  }

  const handleBookAppointment = async () => {
    if (!doctor.slots[selectedDate]) {
      toast.error("Please select a valid date.");
      return;
    }

    if (!doctor.slots[selectedDate].time[selectedHour]) {
      toast.error("Please select a valid time.");
      return;
    }

    const appointment_date = doctor.slots[selectedDate].date;
    const appointment_time = doctor.slots[selectedDate].time[selectedHour];
    const fee = selectedFee;
    const { user } = getUserSession();
    const patientId = user.user_details._id;
    const doctorId = doctor._id;
    console.log(appointmentType, selectedFee);

    try {
      const res = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/appointment/BookAppointment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            items: [
              {
                id: 1,
                quantity: 1,
                price: fee,
                name: doctor.specialist,
                description: "testing the data",
              },
            ],
            doctorId: doctorId,
            patientId: patientId,
            fee: fee,
            appointment_date: appointment_date,
            appointment_time: appointment_time,
          }),
        }
      );

      const data = await res.json();
      const url = data.url;
      if (url) {
        route.push(url);
      } else {
        throw new Error("Failed to get the payment URL.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(error.message || "Failed to book appointment.");
    }
  };

  return (
    <div className="container px-6 mx-auto py-9">
      <Link
        href={`/${path}/patient/appointments`}
        className="active:scale-80 transition-all duration-300 hover:text-black/80"
      >
        <FaArrowLeft className="my-6 text-2xl " />
      </Link>
      <title>Appointment Details</title>
      <ProfileCard
        doctor={doctor}
        onBookAppointment={handleBookAppointment}
        setSelectedFee={setSelectedFee}
        setAppointmentType={setAppointmentType}
        appointmentType={appointmentType}
        selectedFee={selectedFee}
      />
      <hr className="w-full h-2 mt-12" />
      <AppointmentTabs
        slots={doctor.slots}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        appointmentType={appointmentType}
        selectedFee={selectedFee}
      />
      <div className="mt-6">
        <h2 className="text-3xl font-bold my-6 mt-12">
          Reviews About {doctor.firstName} {doctor.lastName}
        </h2>
        {doctor.reviews && doctor.reviews.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {doctor.reviews.map((review, index) => (
              <RatingSection key={index} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center">No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default Page;
