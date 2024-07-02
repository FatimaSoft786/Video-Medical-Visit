import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Stars = ({ rating }) => {
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
    <div className="ml-1 flex items-center gap-1">
      {renderStars(parseFloat(rating))}
      <span>({parseFloat(rating).toFixed(1)})</span>
    </div>
  );
};

export default Stars;
