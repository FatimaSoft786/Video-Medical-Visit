"use client";
import { FaCheckCircle } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

const PendingDoctor = ({ doctor }) => {
  return (
    <div className="border rounded-lg shadow-md p-3 flex flex-col">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {doctor.name}{" "}
          <FaCheckCircle className="text-green-500 inline ml-1 " />
        </h2>
        {doctor.fav === false ? (
          <FaRegHeart className="text-light-gray cursor-pointer text-xl focus:scale-80 active:scale-80" />
        ) : (
          <FaHeart className="text-dark-blue cursor-pointer text-xl focus:scale-80 active:scale-90 transition-all duration-300" />
        )}
      </div>
        <p className="text-light-gray">Speciallist {doctor.specialist}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500 text-lg">{doctor.rating}</span>
        <span className="ml-2 text-light-gray">({doctor.rating.length})</span>
      </div>
      <p className="text-light-gray mt-2">{doctor.location}</p>
      <div className="flex mt-4 space-x-2">
        <button className="flex items-center justify-center gap-2 text-lg bg-light-gray py-2 px-2 rounded-lg flex-1">
          <MdOutlineCancel className="text-lg" size={20} />
          Cancel
        </button>
        <button className="flex items-center justify-center gap-4 bg-pure-red text-xl text-white py-2 px-2 rounded-lg flex-1">
          <img src="/svg/videocall.svg" className="size-5" /> Wait
        </button>
      </div>
    </div>
  );
};

export default PendingDoctor;
