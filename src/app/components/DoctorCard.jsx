import React from "react";
import {
  FaCheckCircle,
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaStarHalfAlt,
} from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
  const renderStars = (rating) => {
    const stars = [];
    if (!rating || isNaN(rating)) {
      return stars;
    }

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
    <div className="border rounded-lg shadow-md p-3 flex flex-col">
      <img
        src={doctor.picture_url || "/doctor/doctorcard.svg"}
        alt={doctor.firstName}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {`${doctor.firstName} ${doctor.lastName}` || "Not Found"}{" "}
          <FaCheckCircle className="text-green-500 inline ml-1" />
        </h2>
        {doctor.fav === false ? (
          <FaRegHeart className="text-light-gray cursor-pointer text-xl focus:scale-80 active:scale-80" />
        ) : (
          <FaHeart className="text-dark-blue cursor-pointer text-xl focus:scale-80 active:scale-90 transition-all duration-300" />
        )}
      </div>
      <p className="text-sm text-gray-600">
        {doctor.qualification || "Not Mentioned"}
      </p>
      <div className="flex items-center mt-2">
        {doctor.reviews && doctor.reviews.length > 0 ? (
          <div className="flex items-center">
            <div className="ml-1 flex items-center gap-1">
              {renderStars(parseFloat(doctor.reviews[0].rating))}
              <span>({parseFloat(doctor.reviews[0].rating).toFixed(1)})</span>
            </div>
          </div>
        ) : (
          <div className="text-light-gray">No reviews found</div>
        )}
      </div>
      <div className="flex gap-1 items-center text-light-gray mt-2">
        <img src="/patient/location.svg" alt="location-icon" />{" "}
        {doctor.location || "Location: not Mentioned"}
      </div>
      <div className="flex gap-1 items-center text-light-gray mt-1">
        <img src="/patient/time.svg" alt="time-icon" /> Available on:{" "}
        {doctor.availability || "Not Mentioned"}
      </div>
      <div className="flex items-center gap-1 text-light-gray mt-1">
        <img src="/patient/card.svg" alt="card-icon" /> Fee:{" "}
        {doctor.fee || "Not Mentioned"}
      </div>
      <div className="flex mt-4 space-x-2">
        <button className="bg-dark-blue text-sm text-white py-2 px-2 rounded-lg flex-1">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
