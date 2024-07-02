// Import necessary modules and components
"use client";
import getPath from "@/utils/path";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import LanguageModal from "./LanguageModal";
import { useTranslations } from "next-intl";

const SettingsPage = () => {
  const path = getPath();
  const t = useTranslations("Setting");
  useEffect(() => {
    document.title = t("Setting");
  }, [t]);

  return (
    <div className="container mx-auto">
      <title>{t("Settings")} | A Doctor's Appointment</title>
      <div className="flex flex-col mx-[20px] max-md:px-6">
        {/* Link to My Profile */}
        <Link
          href={`/${path}/patient/profile`}
          className="flex flex-row justify-between mx-[20px] mt-[50px] mb-[35px] max-md:px-6"
        >
          <div className="flex flex-row">
            <img src={`/svg/profile.svg`} alt="profile" />
            <p className="font-abc font-medium text-[16px] mx-[15px] text-[#000]">
              {t("My Profile")}
            </p>
          </div>
          <FaChevronRight className="flex justify-end items-end my-1" />
        </Link>

        {/* Divider */}
        <div className="bg-light-gray h-[1px] mx-[20px] max-md:px-6"></div>

        {/* Language Selection */}
        <div className="flex flex-row justify-between mx-[20px] max-md:px-6 mt-[50px] mb-[35px]">
          <LanguageModal />
          <FaChevronRight className="flex justify-end items-end my-1" />
        </div>

        {/* Divider */}
        <div className="bg-light-gray h-[1px] mx-[20px] max-md:px-6"></div>

        {/* Link to Privacy Policy */}
        <Link
          href="https://res.cloudinary.com/dm5cvivrc/image/upload/v1716117064/Informativa_sulla_Privacy_gsajxd.pdf"
          className="max-md:px-6 cursor-pointer flex flex-row justify-between mx-[20px] mt-[50px] mb-[35px]"
        >
          <div className="flex flex-row">
            <img src={`/svg/privacy.svg`} alt="Privacy" />
            <p className="font-abc font-medium text-[16px] mx-[15px] text-[#000]">
              {t("Privacy Policy")}
            </p>
          </div>
          <FaChevronRight className="flex justify-end items-end my-1" />
        </Link>

        {/* Divider */}
        <div className="bg-light-gray h-[1px] mx-[20px] max-md:px-6"></div>

        {/* Link to Terms and Conditions */}
        <Link
          href={`/${path}/patient/terms`}
          className="max-md:px-6 cursor-pointer flex flex-row justify-between mx-[20px] mt-[50px] mb-[35px]"
        >
          <div className="flex flex-row">
            <img src={`/svg/tems.svg`} alt="Terms&Condition" />
            <p className="font-abc font-medium text-[16px] mx-[15px] text-[#000]">
              {t("Terms & Condition")}
            </p>
          </div>
          <FaChevronRight className="flex justify-end items-end my-1" />
        </Link>

        {/* Divider */}
        <div className="bg-light-gray h-[1px] mx-[20px] max-md:px-6"></div>
      </div>
    </div>
  );
};

export default SettingsPage;
