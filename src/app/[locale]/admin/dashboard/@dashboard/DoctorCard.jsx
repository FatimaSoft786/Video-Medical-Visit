import { Image } from "@nextui-org/react";
import React from "react";

const DoctorCard = ({ doctorRequests }) => {
  return (
    <div className="relative overflow-x-auto">
      <div className="w-full bg-light-gray font-bold flex text-left h-[48px] px-6 items-center">
        <div className="w-[40%] flex ">Doctor Name</div>
        <div className="w-[40%] flex items-center pl-4 max-md:pl-2">Specialty</div>
        <div className="w-1/3 flex items-center justify-center pl-20">
          Actions
        </div>
      </div>
      {doctorRequests.map((data, index) => (
        <div className="w-full flex text-left py-4 px-6 border-b">
          <div className="w-[40%] flex ">
            <div className="flex items-center gap-2 justify-center">
              <Image src="/svg/user.svg" className="h-8 w-8" alt="User Icon" />
              {data.name}
            </div>
          </div>
          <div className="w-[40%] flex text-center pl-5  items-center">
            {data.specialty}
          </div>
          <div className="w-1/3 flex items-center justify-end gap-4">
            <button className="bg-lime-green rounded-lg p-2.5 text-white max-sm:text-[12px] max-sm:px-2 max-sm:py-2 tracking-wider text-[14px] px-9 max-lg:px-3 flex items-center gap-2">
              <span className="max-sm:hidden block">Accept</span>
              <img
                src="/svg/check.svg"
                sizes="24px"
                className="max-sm:block text-inherit hidden"
              />
            </button>
            <button className="bg-pure-red rounded-lg p-2.5 text-white max-sm:text-[12px] max-sm:px-2 max-sm:py-2 tracking-wider text-[14px] px-9 max-lg:px-3 flex items-center gap-2">
              <span className="max-sm:hidden block">Declined</span>
              <img
                src="/svg/delete.svg"
                sizes="24px"
                className="max-sm:block text-inherit hidden"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCard;
