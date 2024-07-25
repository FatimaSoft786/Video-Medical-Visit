import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { format, addDays, startOfWeek, isBefore, isSameDay } from "date-fns";
import { useRouter } from "next/navigation";
import { enUS, fr, es, it } from "date-fns/locale";

const DateTabs = ({ selectedDate, setSelectedDate }) => {
  const containerRef = useRef(null);
  const router = useRouter();
  const [locale, setLocale] = useState();
  const localeMap = {
    en: enUS,
    fr: fr,
    es: es,
    it: it,
  };
  useEffect(() => {
    const local = document.querySelector("html").lang;
    setLocale(local);
  }, [locale]);
  const currentDate = new Date();
  const startDate = startOfWeek(currentDate, {
    weekStartsOn: currentDate.getDay(),
  });

  const dates = Array.from({ length: 30 }, (_, i) => addDays(startDate, i));

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center my-4 w-full">
      <FaArrowLeft className="cursor-pointer mx-2 size-8" onClick={scrollLeft} />
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
             // const format1 = format(date, "MMMM dd yyyy", { locale: localeMap[locale] })
             // console.log(format1)
              if (!isBefore(date, currentDate)) {
                setSelectedDate(date);
              }
            }}
          >
            {format(date, "dd MMMM", { locale: localeMap[locale] })}
          </div>
        ))}
      </div>
      <FaArrowRight className="cursor-pointer mx-2 size-8" onClick={scrollRight} />
    </div>
  );
};

export default DateTabs;
