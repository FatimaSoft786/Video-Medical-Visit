import getPath from "@/utils/path";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import LoadingSkeleton from "./LoadingSkeleton";
import { useState } from "react";
import { useTranslations } from "next-intl"; // Import useTranslations hook

const AppointmentCard = ({ appointment, isHeld, onCancel }) => {
  const path = getPath();
  const [isCancelling, setIsCancelling] = useState(false);
  const t = useTranslations("DoctorAppointments"); // Fetch translations

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await onCancel(appointment._id);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="border rounded-lg p-3 shadow-md text-sm">
      <div className="flex items-center">
        <img
          src={
            appointment.patient.default_picture_url || "/doctor/doctorcard.svg"
          }
          alt="Doctor"
          className="rounded-lg h-24 flex items-center justify-center bg-black/5 py-2 w-full object-contain"
        />
      </div>
      <div className="flex justify-between py-2 border-b">
        <div className="flex flex-col items-start justify-start gap-1">
          <h3 className="text-xl font-bold">{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</h3>
          <p className="text-sm text-light-gray">{appointment.patient.sex}</p>
          <p>
            <strong>{t("Appointment date")}:</strong>{" "}
            {appointment.appointment_date}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-dark-blue rounded-lg">
            <FaEye />
            <Link
              href={`/${path}/doctor/appointments/${appointment.patient._id}`}
              className="text-sm"
            >
              {t("View Profile")}
            </Link>
          </button>
        </div>
      </div>
      <div className="flex py-1 gap-2">
        <div className="w-1/2 flex flex-col border-b py-2">
          <p>{t("Gender")}:</p>
          <p className="text-light-gray">{appointment.patient.sex}</p>
        </div>
        <div className="w-1/2 flex flex-col border-b py-2">
          <p>{t("Date of birth")}:</p>
          <p className="text-light-gray">{appointment.patient.dob}</p>
        </div>
      </div>
      <div className="flex py-1 gap-2">
        <div className="w-1/2 flex flex-col border-b py-2">
          <p>{t("Phone Number")}:</p>
          <p className="text-light-gray">{appointment.patient.phoneNumber}</p>
        </div>
        <div className="w-1/2 flex flex-col border-b py-2">
          <p>{t("Address")}:</p>
          <p className="text-light-gray">{appointment.patient.location}</p>
        </div>
      </div>
      <div className="flex py-1 gap-2">
        <div className="w-1/2 flex flex-col border-b py-2">
          <p>{t("City")}:</p>
          <p className="text-light-gray">
            {appointment.patient.location || "N/A"}
          </p>
        </div>
        <div className="w-1/2 flex flex-col border-b py-2">
          <p>{t("Postal code")}:</p>
          <p className="text-light-gray">{appointment.patient.postal_code}</p>
        </div>
      </div>
      <div className="flex py-1 gap-2">
        <div className="w-1/2 flex flex-col border-b py-2">
          <p>{t("Appointment date")}:</p>
          <p>{appointment.appointment_date}</p>
        </div>
      </div>
      {!isHeld && (
        <div className="mt-4 flex justify-between py-3">
          <button
            onClick={handleCancel}
            className="border border-pure-red text-pure-red py-2 px-4 rounded"
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : t("Cancel")}
          </button>
          <Link
            href={`/${path}/doctor/sessions`}
            className="bg-light-gray flex items-center gap-3 text-black py-2 px-4 rounded"
          >
            <img src="/svg/videocall.svg" className="invert" />{" "}
            {t("Start a video call")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;


  // <Link
  //           href={`/${path}/session?id=${appointment._id}`}
  //           className="bg-light-gray flex items-center gap-3 text-black py-2 px-4 rounded"
  //         >
  //           <img src="/svg/videocall.svg" className="invert" />{" "}
  //           {t("Start a video call")}
  //         </Link>
