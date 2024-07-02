"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import getPath from "@/utils/path";
import { Avatar } from "@nextui-org/react";
import { getUserSession } from "@/utils/session";
import Anamens from "./anamnesi/Anamnesis";

const DoctorProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const path = getPath();

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

  const profileFields = [
    { label: "First Name", key: "firstName", default: "John" },
    { label: "Last Name", key: "lastName", default: "Doe" },
    { label: "Email", key: "email", default: "w9JpS@example.com" },
    { label: "Phone No", key: "phoneNumber", default: "1234567890" },
    { label: "Postal Code", key: "postal_code", default: "123456" },
    { label: "Location", key: "location", default: "Pakistan" },
    { label: "Sex", key: "sex", default: "Male" },
    { label: "DOB", key: "dob", default: "12 marzo 1993" },
  ];

  return (
    <div className="flex flex-col container mx-auto">
      <div className="h-[1px] w-full bg-line_gray"></div>
      <div className="flex flex-col rounded-lg mb-12 max-sm:m-5 border border-line_gray">
        <div className="flex max-sm:flex-col justify-start items-center gap-6 m-10">
          {loading ? (
            <div className="animate-pulse w-[100px] h-[100px] bg-gray-300 rounded-full border-2 border-primary-color"></div>
          ) : (
            <Avatar
              className="rounded-full w-[100px] h-[100px] border-2 border-primary-color object-cover"
              src={
                profileData.picture_url
                  ? profileData.picture_url
                  : profileData.default_picture_url
              }
              alt="profile"
            />
          )}
          <Link href={`/${path}/patient/profile/edit`}>
            <button className="bg-dark-blue text-white px-6 py-2 rounded">
              Edit Profile
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10 mb-9">
          {profileFields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <h1 className="font-medium text-[14px] text-primary-color">
                {field.label}
              </h1>
              {loading ? (
                <div className="animate-pulse w-full mt-2 bg-gray-300 py-2.5 rounded-[5px] h-[48px] border-2 px-3"></div>
              ) : (
                <p
                  title={profileData[field.key || ""]}
                  className="w-full overflow-hidden mt-2 font-normal py-2.5 rounded-[5px] h-[48px] text-dark-gray border-2 px-3"
                >
                  {profileData[field.key] || `..`}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 py-9">
        <Anamens isProfile={true} />
      </div>
    </div>
  );
};

export default DoctorProfilePage;
