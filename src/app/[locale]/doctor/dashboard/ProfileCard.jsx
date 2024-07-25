"use client";
import Appointments from "./Appointments";
import { FaCheck } from "react-icons/fa";
import { getUserSession } from "@/utils/session";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";

const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const { user, token } = getUserSession();
  const doctor = user.user_details;
  const [appointments, setAppointments] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(true);
  const t = useTranslations("DoctorDashboard");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://video-medical-backend-production.up.railway.app/api/user/doctorDashboard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              doctorId: user.user_details._id,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setAppointments(data.appointments_list);
          if (data.appointments_list.length > 0) {
            const nextAppointment = data.appointments_list[0];
            setAppointmentTime(
              new Date(nextAppointment.appointment_date).toLocaleString()
            );
          }
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, user.user_details._id]);

  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        return <Appointments appointments={appointments} loading={loading} />;
      default:
        return <Appointments appointments={appointments} loading={loading} />;
    }
  };

  const calculateAge = (dob) => {
    const [day, month, year] = dob.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex relative items-center max-md:items-start max-md:flex-col">
        <div className="relative">
          <img
            src={
              doctor.picture_url
                ? doctor.picture_url
                : doctor.default_picture_url
            }
            alt={doctor.firstName}
            className="size-36 border-2 max-md:size-20 border-dark-blue rounded-full mr-6"
          />
          <div className="absolute max-md:bottom-2 max-md:right-6 bottom-5 right-[30px] text-white rounded-full p-1.5 bg-dark-blue">
            {doctor.account_approved && <FaCheck className="size-2" />}
          </div>
        </div>
        <div>
          <h1 className="text-2xl max-md:text-lg max-sm:text-sm font-bold">
            Dr. {doctor.firstName} {doctor.lastName}
          </h1>
          <p className="text-light-gray text-lg">{doctor.specialist}</p>
          <p className="text-light-gray">
            <span className="text-black font-semibold">
              {t("Appointment Time")}:
            </span>{" "}
            {loading ? (
              <Skeleton width={200} />
            ) : (
              appointmentTime || t("No appointment found")
            )}
          </p>
          <p className="text-light-gray">{doctor.sex}</p>
        </div>
        {/* <button className="ml-auto max-md:mt-6 max-md:w-full bg-dark-blue max-md:justify-center text-white px-5 text-lg max-md:text-sm py-2 rounded-lg flex items-center gap-2">
          <AiFillMessage className="text-white" /> {t("Send Message")}
        </button> */}
      </div>

      <hr className="my-9" />
      <div className="rounded-xl">
        <div className="mb-6 w-full">
          <nav className="flex space-x-4 w-full gap-4">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`pb-4 px-5 text-lg max-md:text-sm ${
                activeTab === "appointments"
                  ? "border-b-3 font-bold  border-dark-blue text-dark-blue"
                  : "text-light-gray"
              }`}
            >
              {t("Appointments")}
            </button>
            {/* Add other tabs/buttons here */}
          </nav>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
