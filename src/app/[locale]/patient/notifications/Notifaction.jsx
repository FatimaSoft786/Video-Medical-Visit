import { Image } from "@nextui-org/react";
import React from "react";

const Notification = ({ item, older }) => {
  const {
    doctor,
    patient,
    appointment_date,
    appointment_time,
    appointment_status,
    payment_status,
  } = item;
  const { firstName, lastName, default_picture_url } = doctor || {};

  return (
    <div className="flex justify-between mt-6">
      <div className="flex items-center justify-center gap-4 py-1">
        <Image src={default_picture_url} className="size-12" alt="User Icon" />
        <div className="flex flex-col">
          <h2 className="font-bold">
            Dr. {firstName} {lastName}
          </h2>
          <p className="text-gray-500 flex items-center">
            {appointment_time}, {appointment_date}
          </p>
          <p className="text-gray-500 flex items-center">
            Status: {appointment_status}, Payment: {payment_status}
          </p>
        </div>
      </div>
      {older === true ? (
        <> </>
      ) : (
        <button
          className={`px-6 h-fit py-2.5 flex items-center gap-2 bg-dark-blue text-base max-sm:text-xs text-white rounded
        `}
        >
          <img
            src={`/svg/videocall.svg`}
            className="size-5"
            alt="Video Call Icon"
          />{" "}
          Video Call
        </button>
      )}
    </div>
  );
};

export default Notification;
