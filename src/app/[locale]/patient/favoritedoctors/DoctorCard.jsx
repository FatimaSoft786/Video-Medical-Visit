import getPath from "@/utils/path";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaStarHalfAlt,
} from "react-icons/fa";
import { addFavorite, deleteFavorite } from "@/utils/favorite";
import { useTranslations } from "next-intl";

const DoctorCard = ({ doctor, patientId, token }) => {
  const t = useTranslations("DoctorCard");
  const path = getPath();
  const [isFavorite, setIsFavorite] = useState(
    doctor.favorites.some((favorite) => favorite.patientId === patientId)
  );

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      const result = await deleteFavorite(doctor._id, token);
      if (result && result.success) {
        setIsFavorite(false);
      }
    } else {
      const result = await addFavorite(doctor._id, patientId, token);
      if (result && result.success) {
        setIsFavorite(true);
      }
    }
  };

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

  return (
    <div className="border hover:shadow-xl hover:border-black/15 transition-all group rounded-lg shadow-md p-3 flex flex-col">
      <Link
        href={`/${path}/patient/doctorDetails/${doctor._id}`}
        key={doctor._id}
      >
        <img
          src={doctor.picture_url || "/doctor/doctorcard.svg"}
          alt={`${doctor.firstName} ${doctor.lastName}`}
          className="!w-96 h-40 object-cover rounded-md"
        />
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {`${doctor.firstName} ${doctor.lastName}` || "Not Found"}{" "}
          <FaCheckCircle className="text-green-500 inline ml-1" />
        </h2>
        {isFavorite ? (
          <FaHeart
            className="text-dark-blue cursor-pointer text-xl focus:scale-80 active:scale-90 transition-all duration-300"
            onClick={handleFavoriteClick}
          />
        ) : (
          <FaRegHeart
            className="text-light-gray cursor-pointer text-xl focus:scale-80 active:scale-80"
            onClick={handleFavoriteClick}
          />
        )}
      </div>
      <p className="text-sm text-gray-600">
        {doctor.education || "Non disponibile"}
      </p>
      <div className="flex items-center mt-2">
        {doctor.total_reviews > 0 ? (
          <div className="flex items-center">
            <div className="ml-1 flex items-center gap-1">
              {renderStars(parseFloat(doctor.average_rating))}
              <span>({parseFloat(doctor.average_rating).toFixed(1)})</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="ml-1 flex items-center gap-1">
              {renderStars(0)}
              <span>(0.0)</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-1 items-center text-light-gray mt-2">
        <img src="/patient/location.svg" alt="location-icon" />{" "}
        {doctor.location || "Non disponibile"}
      </div>
      <div className="flex gap-1 items-center text-light-gray mt-1">
        <img src="/patient/time.svg" alt="time-icon" /> Available on:{" "}
        {doctor.slots && doctor.slots.length > 0
          ? doctor.slots[0].date
          : "Not Mentioned"}
      </div>
      <div className="flex items-center gap-1 text-light-gray mt-1">
        <img src="/patient/card.svg" alt="card-icon" /> Fee: {doctor.currency}{" "}
        {doctor.visit || "Not Mentioned"}
      </div>
      <Link
        href={`/${path}/patient/appointments/${doctor._id}`}
        className="flex mt-4 space-x-2"
      >
        <button className="bg-dark-blue active:scale-85 transition-all group-hover:opacity-90 text-sm text-white py-2 px-2 rounded-lg flex-1">
          {t('Book Now')}
        </button>
      </Link>
    </div>
  );
};

export default DoctorCard;
