"use client";

import { useEffect } from "react";
import {
  FaCheckCircle,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaUser,
} from "react-icons/fa";

const RatingSection = ({ review }) => {
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
  useEffect(() => {}, []);
  return (
    <div
      key={review.patientId}
      className="border rounded-lg shadow-md p-3 flex flex-col"
    >
      {review.patientId.picture_url ? (
        <img
          src={review.patientId.picture_url || "/img/user.png"}
          alt={review.patientId.firstName}
          className="w-full h-40 object-cover rounded-md"
        />
      ) : (
        <FaUser className="w-full h-40 object-cover rounded-md" />
      )}
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {review.patientId.firstName || "Nome non trovato"}{" "}
          {review.patientId.account_approved && (
            <FaCheckCircle className="text-green-500 inline ml-1 " />
          )}
        </h1>
      </div>
      <p className="text-light-gray">{review.patientId.specialist}</p>
      <div className="flex items-center mt-2">
        <div className="ml-1 flex items-center gap-1">
          {renderStars(parseFloat(review.rating))}
          <span>({parseFloat(review.rating).toFixed(1)})</span>
        </div>
      </div>
      <p className="text-light-gray mt-2 text-sm flex">{review.review}</p>
    </div>
  );
};

export default RatingSection;
