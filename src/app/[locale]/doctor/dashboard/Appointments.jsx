"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Appointments = ({ appointments, loading }) => {
  const getFirstFourDigits = (id) => {
    return id.substring(0, 4);
  };

  const t = useTranslations("DoctorDashboard");

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm md:text-base">
          <thead className="bg-light-gray">
            <tr>
              <th className="py-3">{t("ID")}</th>
              <th className="py-3">{t("Patient")}</th>
              <th className="py-3">{t("Appointment Date")}</th>
              <th className="py-3">{t("Booking Date")}</th>
              <th className="py-3">{t("Amount")}</th>
              <th className="py-3">{t("Status")}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="text-center border-b text-light-gray">
                <td className="py-6 text-[#7CB839]">
                  <Skeleton width={40} />
                </td>
                <td className="py-6 flex gap-2 items-center justify-center">
                  <Skeleton circle width={32} height={32} />
                  <Skeleton width={80} />
                </td>
                <td className="py-6">
                  <Skeleton width={120} />
                </td>
                <td className="py-6">
                  <Skeleton width={120} />
                </td>
                <td className="py-6">
                  <Skeleton width={60} />
                </td>
                <td className="py-6">
                  <Skeleton width={80} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm md:text-base">
        <thead className="bg-light-gray">
          <tr>
            <th className="py-3">{t("ID")}</th>
            <th className="py-3">{t("Patient")}</th>
            <th className="py-3">{t("Appointment Date")}</th>
            <th className="py-3">{t("Booking Date")}</th>
            <th className="py-3">{t("Amount")}</th>
            <th className="py-3">{t("Status")}</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment._id}
              className="text-center border-b text-light-gray"
            >
              <td className="py-6 text-[#7CB839]">
                {getFirstFourDigits(appointment._id)}
              </td>
              <td className="py-6 flex gap-2 items-center justify-center">
                <img
                  src={
                    appointment.patient.picture_url
                      ? appointment.patient.picture_url
                      : appointment.patient.default_picture_url
                  }
                  className="w-8 h-8 md:w-12 md:h-12 object-cover max-md:hidden rounded-full"
                  alt={`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                />
                {`${appointment.patient.firstName} ${appointment.patient.lastName}`}
              </td>
              <td className="py-6">{appointment.appointment_date}</td>
              <td className="py-6">
                {new Date(appointment.date).toLocaleDateString()}
              </td>
              <td className="py-6">${appointment.fee}</td>
              <td className="py-6">
                <span
                  className={`bg-${
                    appointment.appointment_status === "waiting"
                      ? "green-500"
                      : "red-500"
                  } text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm`}
                >
                  {appointment.appointment_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
