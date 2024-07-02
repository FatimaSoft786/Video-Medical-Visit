import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { format, addDays, startOfWeek, isBefore, isSameDay } from "date-fns";

const DateTabs = ({ selectedDate, setSelectedDate }) => {
  const containerRef = useRef(null);

  const currentDate = new Date();
  const startDate = startOfWeek(new Date(), {
    weekStartsOn: currentDate.getDay(),
  });

  const dates = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 100;
    }
  };

  return (
    <div className="flex items-center my-4 w-full">
      <FaArrowLeft className="cursor-pointer mx-2" onClick={scrollLeft} />
      <div
        className="flex overflow-x-auto scrollbar-hide w-full items-center"
        ref={containerRef}
      >
        {dates.map((date) => (
          <div
            key={date}
            className={`px-4 py-2 cursor-pointer flex-1 text-center ${
              isSameDay(date, selectedDate)
                ? "border-b-2 border-dark-blue font-bold text-dark-blue"
                : "text-gray-500"
            }`}
            onClick={() => {
              if (!isBefore(date, currentDate)) {
                setSelectedDate(date);
              }
            }}
          >
            {format(date, "MMM dd")}
          </div>
        ))}
      </div>
      <FaArrowRight className="cursor-pointer mx-2" onClick={scrollRight} />
    </div>
  );
};

export default DateTabs;
