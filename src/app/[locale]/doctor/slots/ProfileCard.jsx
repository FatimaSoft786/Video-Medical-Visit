"use client";
import { Image } from "@nextui-org/react";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { useTranslations } from "next-intl";

const ProfileCard = ({ doctor }) => {
  const t = useTranslations("Slots");

  return (
    <>
      <div className="flex relative items-center max-md:items-start max-md:flex-col">
        <div className="relative">
          <img
            src={
              doctor.picture_url
                ? doctor.picture_url
                : doctor.default_picture_url
            }
            alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
            className="size-36 border-2 max-md:size-20 border-dark-blue rounded-full mr-6"
          />
          <div className="absolute max-md:bottom-2 max-md:right-6 bottom-5 right-[30px] text-white rounded-full p-1.5 bg-dark-blue">
            {doctor.account_approved && <FaCheck className="size-2" />}
          </div>
        </div>
        <div className="gap-2">
          <h1 className="text-2xl max-md:text-lg max-md:text-smfont-bold">
            Dr. {doctor.firstName} {doctor.lastName}
          </h1>
          <p className="text-light-gray text-lg">{doctor.specialist}</p>
          <div className="text-light-gray flex gap-1">
            <img src="/patient/location.svg" alt="location" />
            {doctor.clinic_hospital_address}
          </div>
          <div className="flex gap-2 mt-2 text-sm">
            <button className="ml-auto max-md:mt-6 max-md:w-full bg-light-gray max-md:justify-center text-black px-5 max-md:text-sm py-2 rounded-lg flex items-center gap-2">
              ${doctor.visit}/{t("First visit")}
            </button>

            <button className="ml-auto max-md:mt-6 max-md:w-full bg-dark-blue max-md:justify-center text-white px-5 max-md:text-sm py-2 rounded-lg flex items-center gap-2">
              ${doctor.followUp}/{t("Follow up")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
