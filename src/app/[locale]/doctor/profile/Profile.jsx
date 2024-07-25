"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import getPath from "@/utils/path";
import { getUserSession } from "@/utils/session";
import { FaFilePdf } from "react-icons/fa6";
import { useTranslations } from "next-intl";

const DoctorProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const path = getPath();
  const t = useTranslations("DoctorProfile");

  useEffect(() => {
    const { user } = getUserSession();
    if (user) {
      setProfileData(user.user_details);
      setLoading(false);
    } else {
      console.error("No user details found in session");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <></>;
  }

  const profileFields = [
    { label: t("FirstName"), key: "firstName", default: "John" },
    { label: t("LastName"), key: "lastName", default: "Doe" },
    { label: t("Email Address"), key: "email", default: "w9JpS@example.com" },
    { label: t("PhoneNumber"), key: "phoneNumber", default: "1234567890" },
    { label: t("Postal Code"), key: "postal_code", default: "123456" },
    { label: t("Location"), key: "location", default: "Pakistan" },
    { label: t("Sex"), key: "sex", default: "Male" },
    { label: t("Dob"), key: "dob", default: "12 marzo 1993" },
    {
      label: t("Year Of Study"),
      key: "yearsOfStudy",
      default: "13 aprile 2003",
    },
    {
      label: t("Special Recognition"),
      key: "special_recognition",
      default: "Best doctor 2023",
    },
    {
      label: t("Office And Hospital Address"),
      key: "officeAddress",
      default: "Pakistan",
    },
    { label: t("Specialties"), key: "specialist", default: "Allergy" },
  ];

  return (
    <div className="flex flex-col">
      <div className="h-[1px] w-full bg-line_gray"></div>
      <div className="flex flex-col rounded-lg m-[60px] max-sm:m-5 border border-line_gray">
        <div className="flex max-sm:flex-col justify-start items-center gap-6 m-10">
          <img
            className="rounded-full w-[100px] h-[100px] border-2 border-primary-color object-cover"
            src={
              profileData.picture_url
                ? profileData.picture_url
                : profileData.default_picture_url
            }
            alt="profile"
          />
          <Link href={`/${path}/doctor/profile/edit`}>
            <button className="bg-dark-blue max-sm:!w-full text-white px-6 py-2 rounded">
              {t("Edit Profile")}
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10 mb-9">
          {profileFields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <h1 className="font-medium text-[14px] text-primary-color">
                {field.label}
              </h1>
              <p className="w-full mt-2 font-normal py-2.5 rounded-[5px] h-[48px] text-dark-gray border-2 px-3">
                {profileData[field.key] || field.default}
              </p>
            </div>
          ))}
          {/* <div className="flex flex-col">
            <h1 className="font-medium text-[14px] text-primary-color">
              {t("Digital Signature")}
            </h1>
            <img
              className="size-24 object-cover"
              src={profileData.signature_url}
              alt="signature"
            />
          </div> */}
          <div className="flex flex-col">
            <h1 className="font-medium text-[14px] text-primary-color">CV</h1>
            <Link
              target="_blank"
              href={profileData.doctor_cv_url}
              className="w-full object-cover flex gap-2 text-sm p-4 mt-1 items-center rounded-xl border-2 bg-light-gray/40 hover:bg-light-gray/60 active:bg-light-gray/60"
            >
              <FaFilePdf className="size-6 text-dark-blue" />
              Doctor CV
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
