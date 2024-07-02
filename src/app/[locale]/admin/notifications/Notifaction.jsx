import { Image } from "@nextui-org/react";
import React from "react";

const Notifaction = ({ item, key, older }) => {
  return (
    <div className="flex justify-between mt-6">
      <div className="flex items-center justify-center gap-4 py-1">
        <Image src={item.imgSrc} className="size-12" alt="User Icon" />
        <div className="flex flex-col">
          <h2 className="font-bold">
            {item.name} {""}
          </h2>
          <p className="text-gray-500 flex items-center">
            {item.time}, {item.date}
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
          <img src={`/svg/videocall.svg`} className="size-5" /> Video Call
        </button>
      )}
    </div>
  );
};

export default Notifaction;
