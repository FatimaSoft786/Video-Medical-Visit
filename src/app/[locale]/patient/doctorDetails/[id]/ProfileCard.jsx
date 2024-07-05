"use client";

import getPath from "@/utils/path";
import React, { useState } from "react";
import { FaCheck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useTranslations } from "next-intl";
const ProfileCard = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const t = useTranslations("DoctorDetailsPage");
  const path = getPath();
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview doctor={doctor} t={t} />;
      case "reviews":
        return <Reviews reviews={doctor.reviews} />;
      // case "businessHours":
      //   return <BusinessHours slots={doctor.slots} />;
      default:
        return <Overview doctor={doctor} t={t} />;
    }
  };

  return (
    <div className="pt-6">
      <div className="flex items-center px-2 py-6 max-md:items-start max-md:flex-col">
        <div className="relative">
          <img
            src={
              doctor.picture_url
                ? doctor.picture_url
                : doctor.default_picture_url
            }
            alt={`${doctor.firstName} ${doctor.lastName}`}
            className="size-36 border-2 max-md:size-20 border-dark-blue/50 rounded-full mr-6"
          />

          {doctor.account_approved && (
            <div className="absolute max-md:bottom-2 max-md:right-6 bottom-5 right-[30px] text-white rounded-full p-1.5 bg-dark-blue">
              <FaCheck className="size-2" />
            </div>
          )}
        </div>
        <div className="max-md:w-full">
          <h1 className="text-2xl max-md:text-xl font-bold">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <p className="text-gray-500">{doctor.specialist || "Doctor"}</p>
          <p className="text-gray-500 flex items-center">
            <FaMapMarkerAlt className="mr-1" />{" "}
            {doctor.location || "Location not mentioned"}
          </p>
          <div className="flex gap-4 mt-2 max-md:items-center max-md:justify-center">
            <button className="bg-light-gray hover:opacity-95 transition-all active:scale-95 text-black px-4 py-2 rounded-lg max-sm:text-sm max-md:w-full text-center">
              {doctor.followUp + " " + doctor.currency}/{t('Follow up')}
            </button>
            <button className="bg-dark-blue hover:opacity-95 transition-all active:scale-95 text-white px-4 py-2 rounded-lg max-sm:text-sm max-md:w-full text-center">
              {doctor.visit + " " + doctor.currency}/{t('Visit')}
            </button>
          </div>
        </div>
        <Link
          href={`/${path}/patient/appointments/${doctor._id}`}
          className="ml-auto max-md:mt-2 text-center hover:opacity-95 transition-all active:scale-95 max-md:w-full max-sm:text-sm bg-dark-blue text-white px-4 py-2 rounded-lg"
        >
          {t('Book appointment')}
        </Link>
      </div>
      <hr className="my-9" />
      <div className="border p-4 rounded-xl">
        <div className="border-b border-gray-200 mb-6 w-full">
          <nav className="flex space-x-4 w-full">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 flex-1 ${
                activeTab === "overview"
                  ? "border-b-3 font-bold border-dark-blue text-dark-blue"
                  : "text-gray-500"
              }`}
            >
             {t('Overview')}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 flex-1 ${
                activeTab === "reviews"
                  ? "border-b-3 font-bold border-dark-blue text-dark-blue"
                  : "text-gray-500"
              }`}
            >
             {t('Reviews')}
            </button>
            {/* <button
              onClick={() => setActiveTab("businessHours")}
              className={`pb-4 flex-1 ${
                activeTab === "businessHours"
                  ? "border-b-3 font-bold border-dark-blue text-dark-blue"
                  : "text-gray-500"
              }`}
            >
              Business Hours
            </button> */}
          </nav>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

const Overview = ({ doctor , t }) => (
  <div>
    <h2 className="text-xl font-bold my-5">{t('About Me')}</h2>
    <p className="text-light-gray mb-6">
      {doctor.about_info || "No description available."}
    </p>
    <h3 className="text-xl font-bold my-5">{t('Education')}</h3>
    <ul className="list-none relative text-light-gray flex flex-col gap-4">
      <li className="relative flex flex-col pl-8">
        <div className="absolute bg-dark-blue left-2.5 top-[34%] w-1 h-[60%]"></div>
        <span className="absolute left-0 top-1 size-6 bg-dark-blue/10 border-2 border-dark-blue rounded-full"></span>
        <span className="text-black">
          {doctor.institution ? doctor.institution : "Not Provide"}
        </span>
        <span>{doctor.specialist}</span>
        <span>
          {doctor.studies_start_year} - {doctor.studies_end_year}
        </span>
      </li>
    </ul>
    <h3 className="text-xl font-bold my-5">{t('Work & Experience')}</h3>
    <ul className="list-none relative text-light-gray flex flex-col gap-4">
      <li className="relative flex flex-col pl-8">
        <div className="absolute bg-dark-blue left-2.5 top-[52%] w-1 h-1/3"></div>
        <span className="absolute left-0 top-1 size-6 bg-dark-blue/10 border-2 border-dark-blue rounded-full"></span>
        <span className="text-black">
          {doctor.clinic_hospital_address
            ? doctor.clinic_hospital_address
            : "Not Available"}
        </span>
        <span>{doctor.duration ? doctor.duration : "Not Available"}</span>
      </li>
    </ul>
    <h3 className="text-lg font-semibold my-5">{t('Awards')}</h3>
    <ul className="list-none relative text-light-gray flex flex-col gap-4">
      <li className="relative flex flex-col pl-8">
        <span className="absolute left-0 top-1 size-6 bg-dark-blue/10 border-2 border-dark-blue rounded-full"></span>
        <div className="absolute bg-dark-blue left-2.5 top-[60%] w-1 h-1/3"></div>
        <span className="text-sm text-dark-blue">
          {doctor.date || "Not Provided"}
        </span>
        <span className="text-black">{doctor.special_recognition}</span>
        <span>{doctor.about_info}</span>
      </li>
    </ul>
  </div>
);

const Reviews = ({ reviews }) => (
  <div className="bg-gray-500/10 px-6 py-3 rounded-xl">
    <h2 className="text-xl font-bold mb-4">Reviews</h2>
    {reviews && reviews.length > 0 ? (
      reviews.map((review, index) => (
        <div key={index} className="mb-4">
          <p className="">
            <span className="font-bold">Total Review: {reviews.length}</span>
          </p>
          <p className="">
            <span className="font-bold">Patient Review: </span> {review.review}
          </p>
          <p className="">
            <span className="font-bold">Patient Rating: </span>
            <span className="text-yellow-500">({review.rating})</span>
          </p>
        </div>
      ))
    ) : (
      <p className="">No reviews available.</p>
    )}
  </div>
);

const BusinessHours = ({ slots }) => (
  <div className="bg-gray-500/10 px-6 py-3 rounded-xl">
    <h2 className="text-xl font-bold mb-4">Business Hours</h2>
    {slots && slots.length > 0 ? (
      slots.map((slot, index) => (
        <div key={index} className="mb-4">
          <p className="text-gray-700">
            <span className="font-bold">Date: </span> {slot.date}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Time: </span> {slot.time.join(" to ")}
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-700">No business hours available.</p>
    )}
  </div>
);

export default ProfileCard;
