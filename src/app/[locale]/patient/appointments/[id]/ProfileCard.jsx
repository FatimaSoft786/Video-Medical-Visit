import { Image } from "@nextui-org/react";
import React from "react";
import { FaCheck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useTranslations } from "next-intl";

const ProfileCard = ({
  doctor,
  onBookAppointment,
  setSelectedFee,
  setAppointmentType,
  appointmentType,
  selectedFee,
}) => {
  const handleSelectVisit = () => {
    setSelectedFee(doctor.visit);
    setAppointmentType("visit");
  };

  const handleSelectFollowUp = () => {
    setSelectedFee(doctor.followUp);
    setAppointmentType("followUp");
  };

    const t = useTranslations("DoctorDetailsPage");

  return (
    <div className="mx-auto max-md:p-2 rounded-lg">
      <div className="flex items-center max-md:items-start max-md:flex-col">
        <div className="relative">
          <Image
            src={
              doctor.picture_url
                ? doctor.picture_url
                : doctor.default_picture_url
            }
            alt={`${doctor.firstName} ${doctor.lastName}`}
            className="size-32 border-2 max-md:size-20 border-dark-blue/50 rounded-full mr-6"
          />
          {doctor.account_approved && (
            <div className="absolute max-md:bottom-2 z-[50] max-md:right-6 bottom-5 right-[28px] text-white rounded-full p-1.5 bg-dark-blue">
              <FaCheck className="size-2" />
            </div>
          )}
        </div>
        <div className="max-md:w-full">
          <h1 className="text-2xl max-md:text-xl font-bold">
            Dr. {doctor.firstName} {doctor.lastName}
          </h1>
          <p className="text-light-gray">{doctor.specialist}</p>
          <p className="text-light-gray flex items-center">
            <FaMapMarkerAlt className="mr-2" /> {doctor.clinic_hospital_address}
          </p>
          <div className="flex gap-4 mt-2 max-md:items-center w-full">
            <button
              onClick={handleSelectVisit}
              className={`bg-light-gray text-black px-4 py-2 rounded-lg max-sm:text-sm max-md:w-full text-center ${
                appointmentType === "visit" &&
                "!bg-black/30 ring-offset-2 text-black ring-2 ring-black/70"
              }`}
            >
              {doctor.currency}
              {doctor.visit}/{t('Visit')}
            </button>
            <button
              onClick={handleSelectFollowUp}
              className={`bg-dark-blue text-white px-4 py-2 rounded-lg max-sm:text-sm max-md:w-full !text-center  ${
                appointmentType === "followUp" &&
                "!bg-black/30 ring-offset-2 text-black ring-2 ring-black/70"
              }`}
            >
              {doctor.currency}
              {doctor.followUp}/{t('Follow up')}
            </button>
          </div>
        </div>
        <button
          onClick={onBookAppointment}
          className="ml-auto max-md:mt-6 max-md:w-full max-sm:text-sm bg-dark-blue text-white px-4 py-2 rounded-lg"
        >
          {t('Book appointment')}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
