import { Image } from "@nextui-org/react";
import React from "react";

const Editbtn = () => {
  return (
    <button className="bg-lime-green/30 gap-2 max-sm:px-2 text-green-700 flex max-sm:!w-fit items-center rounded-lg max-md:py-1.5 py-2 tracking-wider max-sm:text-[12px]  px-7 max-md:px-2 max-sm:text-sm max-lg:px-3 max-lg:text-base">
      <Image src="/svg/edit.svg" className="size-5 mt-1" alt="User Edit" />
      <span className="max-sm:hidden block">Edit</span>
    </button>
  );
};

export default Editbtn;
