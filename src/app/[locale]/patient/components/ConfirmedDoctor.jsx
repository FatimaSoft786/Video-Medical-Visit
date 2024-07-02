import React, { useState } from "react";
import Link from "next/link";
import {
  FaCheckCircle,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaUser,
} from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import getPath from "@/utils/path";
import { addFavorite, deleteFavorite } from "@/utils/favorite";
import { cancelAppointment } from "@/utils/appointment";

const ConfirmDoctor = ({ appointment, patientId, onAppointmentChange }) => {
  const path = getPath();
  const {
    doctor,
    appointment_date,
    appointment_time,
    appointment_status,
    _id,
    doctor: { average_rating, picture_url, specialist, location, favorites },
  } = appointment;

  const renderStars = (rating) => {
    const stars = [];
    rating = rating || 0;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key={stars.length} className="text-yellow-500" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={stars.length + i} className="text-yellow-500" />
      );
    }

    return stars;
  };

  const [isFavorite, setIsFavorite] = useState(
    doctor.favorites.some((favorite) => favorite.patientId === patientId)
  );

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        const result = await deleteFavorite(doctor._id, patientId);
        if (result && result.success) {
          setIsFavorite(false);
        }
      } else {
        const result = await addFavorite(doctor._id, patientId);
        if (result && result.success) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleCancelAppointment = async () => {
    const result = await cancelAppointment(appointment._id, doctor._id);
    if (result && result.success) {
      onAppointmentChange();
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-3 flex flex-col">
      <Link href={`/${getPath()}/patient/appointments/${appointment._id}`}>
        {picture_url ? (
          <img
            src={picture_url}
            alt={doctor.firstName + " " + doctor.lastName}
            className="w-full h-40 object-cover rounded-md"
          />
        ) : (
          <FaUser className="w-full h-36 object-cover py-2 rounded-md bg-light-gray/50" />
        )}
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {doctor.firstName} {doctor.lastName}{" "}
          <FaCheckCircle className="text-green-500 inline ml-1 " />
        </h1>
        {isFavorite ? (
          <FaHeart
            className="text-dark-blue cursor-pointer text-xl focus:scale-80 active:scale-90 transition-all duration-300"
            onClick={toggleFavorite}
          />
        ) : (
          <FaRegHeart
            className="text-light-gray cursor-pointer text-xl focus:scale-80 active:scale-80"
            onClick={toggleFavorite}
          />
        )}
      </div>
      <p className="text-light-gray">Specialist: {specialist}</p>
      <div className="text-black flex justify-between">
        <h1 className="text-base text-black font-bold">Payment Date :</h1>
        <p className="text-light-gray text-sm">{appointment_date}</p>
      </div>

      <div className="flex items-center mt-2">
        <div className="ml-1 flex items-center gap-1">
          {renderStars(parseFloat(average_rating))}
          <span>({parseFloat(average_rating).toFixed(1)})</span>
        </div>
        <span className="ml-2 text-light-gray">({doctor.total_reviews})</span>
      </div>
      <p className="text-light-gray mt-2 text-sm flex items-center">
        <img
          src="/patient/location.svg"
          className="size-4 mr-2"
          alt="location"
        />
        {location}
      </p>
      <div className="text-light-gray mt-2 text-sm flex">
        <img src="/patient/time.svg" className="size-4 mr-2 mt-1" alt="time" />
        Appointment date is {appointment_date}, {appointment_time}
      </div>
      {appointment_status === "cancelled" && (
        <button
          className="flex items-center cursor-not-allowed mt-4 opacity-80 justify-center gap-2 text-xs bg-red-500/20 text-red-500 py-4 px-2 font-semibold rounded-lg flex-1"
          disabled={true}
        >
          <MdOutlineCancel className="text-lg" size={16} />
          Cancelled
        </button>
      )}
      {appointment_status !== "cancelled" && (
        <div className="flex mt-4 space-x-2">
          <button
            className="flex items-center justify-center gap-2 text-xs bg-light-gray py-4 px-2 font-semibold rounded-lg flex-1"
            onClick={handleCancelAppointment}
          >
            <MdOutlineCancel className="text-lg" size={16} />
            Cancel
          </button>
          <Link
            href={`/${path}/session?id=${_id}`}
            className="flex items-center justify-center gap-2 bg-dark-blue text-xs text-white py-4 font-semibold px-2 rounded-lg flex-1"
          >
            <img src="/svg/videocall.svg" className="size-4" alt="video call" />{" "}
            Consult Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default ConfirmDoctor;
