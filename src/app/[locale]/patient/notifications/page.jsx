"use client";
import React, { useEffect, useState } from "react";
import { getUserSession } from "@/utils/session";

const Page = () => {
  const [notificationsData, setNotificationData] = useState([]);
  const { token } = getUserSession();

  useEffect(() => {
    async function fetchNotification() {
      try {
        const date = new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        const res = await fetch(
          "https://video-medical-backend-production.up.railway.app/api/appointment/patientNotifications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ date }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          setNotificationData(data.notifications);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("An error occurred while fetching notifications", error);
      }
    }

    fetchNotification();
  }, [token]);

  return (
    <div className="mt-6 container mx-auto w-full">
      <title>Notifications | Medical Appointment</title>
      <h1 className="font-bold text-3xl max-md:text-2xl px-5 mt-6">
        Notifications
      </h1>
      <div className="flex justify-between px-6 pt-8">
        <p className="text-lg text-light-gray">TODAY</p>
      </div>
      <div className="gap-2 px-4">
        {notificationsData.map((item, index) => (
          <Notification key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;

import { Image } from "@nextui-org/react";

const Notification = ({ item }) => {
  const { doctor, appointment_date, appointment_time, onGoingCall } = item;
  const { firstName, lastName, default_picture_url } = doctor || {};

  return (
    <div className="flex justify-between mt-6">
      <div className="flex items-center justify-center gap-4 py-1">
        <Image src={default_picture_url} className="size-12" alt="User Icon" />
        <div className="flex flex-col">
          <h2 className="font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-500 flex items-center">
            {appointment_time}, {appointment_date}
          </p>
          {/* <p className="text-gray-500 flex items-center">
            Status: {}, Payment: {payment_status}
          </p> */}
        </div>
      </div>
      {onGoingCall && (
        <button className="px-6 h-fit py-2.5 flex items-center gap-2 bg-dark-blue text-base max-sm:text-xs text-white rounded">
          <img
            src="/svg/videocall.svg"
            className="size-5"
            alt="Video Call Icon"
          />{" "}
          Video Call
        </button>
      )}
    </div>
  );
};
