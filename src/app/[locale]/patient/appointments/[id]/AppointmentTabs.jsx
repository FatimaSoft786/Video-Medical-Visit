"use client";

import { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AppointmentTabs = ({
  slots,
  selectedDate,
  setSelectedDate,
  selectedHour,
  setSelectedHour,
}) => {
  const scrollRef = useRef(null);

  const dates = slots.map((slot) => slot.date);
  const hours = slots[selectedDate]?.time || [];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-6 border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <FaChevronLeft
          className="cursor-pointer size-6 mx-2"
          onClick={scrollLeft}
        />
        <div
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          ref={scrollRef}
        >
          {dates.length > 0 ? (
            dates.map((date, index) => (
              <button
                key={index}
                className={`px-2 py-2 ${
                  selectedDate === index
                    ? "border-b-3 border-dark-blue text-black font-bold"
                    : "text-light-gray"
                }`}
                onClick={() => setSelectedDate(index)}
              >
                {date}
              </button>
            ))
          ) : (
            <p className="text-light-gray px-2 py-2">No dates available</p>
          )}
        </div>
        <FaChevronRight
          className="cursor-pointer size-6 mx-2"
          onClick={scrollRight}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Select Hour</h2>
        <div className="flex flex-wrap gap-4 mt-2 transition-all">
          {hours.length > 0 ? (
            hours.map((hour, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg ${
                  selectedHour === index
                    ? "border-2 border-dark-blue bg-dark-blue/20 text-black"
                    : "bg-white"
                }`}
                onClick={() => setSelectedHour(index)}
              >
                {hour}
              </button>
            ))
          ) : (
            <p className="text-light-gray">No time slots available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentTabs;
