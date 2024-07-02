import React from "react";
import Notifaction from "./Notifaction";

const data = [
  {
    imgSrc: "/svg/user.svg",
    name: "Dr.  Hamza Yasin",
    date: "15 April 2023",
    time: "8AM - 11:00 PM",
    status: false,
  },
  {
    imgSrc: "/svg/user.svg",
    name: "Dr.  Hamza Yasin",
    date: "15 April 2023",
    time: "8AM - 11:00 PM",
    status: true,
  },
  {
    imgSrc: "/svg/user.svg",
    name: "Dr.  Hamza Yasin",
    date: "15 April 2023",
    time: "8AM - 11:00 PM",
    status: false,
  },
  {
    imgSrc: "/svg/user.svg",
    name: "Dr.  Hamza Yasin",
    date: "15 April 2023",
    time: "8AM - 11:00 PM",
    status: true,
  },
];
const page = () => {
  return (
    <div className="mt-6 container mx-auto w-full">
      <title>Notifications | Medical Appointment</title>
      <h1 className="font-bold text-3xl max-md:text-2xl px-5 mt-6">
        Notifications
      </h1>
      <div className="flex justify-between px-6 pt-8">
        <p className="text-lg text-light-gray">TODAY</p>
        <p className="cursor-pointer">Mark all as read</p>
      </div>
      {/* notifications */}
      <div className="gap-2 px-4">
        {data.map((item, index) => (
          <Notifaction key={index} item={item} />
        ))}
      </div>
      <p className="text-lg text-light-gray px-6 pt-12">OLDER</p>
      <div className="gap-2 px-4">
        {data.map((item, index) => (
          <Notifaction key={index} item={item} older={true} />
        ))}
      </div>
    </div>
  );
};

export default page;
