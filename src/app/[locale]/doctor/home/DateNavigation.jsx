"use client";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { format, addDays, subDays, startOfWeek, isSameDay } from "date-fns";
import { enUS, fr, es, it } from "date-fns/locale";

const DateNavigation = ({ setSelectedDate, selectedDate }) => {
  const [locale, setLocale] = useState(enUS);
  const [currentDate, setCurrentDate] = useState(new Date());

  const localeMap = {
    en: enUS,
    fr: fr,
    es: es,
    it: it,
  };

  useEffect(() => {
    const local = document.querySelector("html").lang || 'en';
    setLocale(localeMap[local] || enUS);
  }, []);

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });

  const handlePrevWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getDayClass = (date) => {
    const isSelected = isSameDay(date, new Date(selectedDate));
    const isToday = isSameDay(date, new Date());

    if (isSelected) {
      return "border-2 rounded-xl relative";
    } else if (isToday) {
      return "border rounded-xl bg-dark-blue text-white";
    } else {
      return "border rounded-xl";
    }
  };

  return (
    <div suppressHydrationWarning>
      <div className="flex justify-start items-center my-4">
        <p className="text-xl font-bold mx-4">
          {format(startDate, "dd", { locale })} -{" "}
          {format(addDays(startDate, 6), "dd MMMM, yyyy", { locale })}
        </p>
        <button onClick={handlePrevWeek} className="mr-4">
          <FaAngleLeft size={24} className="text-[#7CB839]" />
        </button>
        <button onClick={handleNextWeek} className="ml-4">
          <FaAngleRight size={24} className="text-[#7CB839]" />
        </button>
      </div>
      <div className="flex justify-between overflow-hidden gap-4 max-md:gap-2 px-4 max-md:px-0">
        {[...Array(7)].map((_, index) => {
          const date = addDays(startDate, index);
          const isSelected = isSameDay(date, new Date(selectedDate));
          const isToday = isSameDay(date, new Date());

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`cursor-pointer p-2 w-full text-center ${getDayClass(
                date
              )}`}
            >
              <p className="mb-1">{format(date, "EEE", { locale })}</p>
              <p>{format(date, "d", { locale })}</p>
              {isSelected && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-[#7CB839]"></div>
              )}
              {isToday && (
                <div title="Today" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-green"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateNavigation;
