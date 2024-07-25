import { Image } from "@nextui-org/react";
import React from "react";

const Deletebtn = () => {
  return (
    <button className="bg-pure-red/30 gap-2 max-sm:px-2 text-pure-red flex max-sm:!w-fit items-center rounded-lg py-2 tracking-wider max-sm:text-[12px]  px-7 max-md:px-2 max-sm:text-sm max-lg:px-3 max-lg:text-base">
      <Image src="/svg/delete.svg" className="size-5" alt="User Delete" />
      <span className="max-md:hidden block">Delete</span>
    </button>
  );
};

export default Deletebtn;
