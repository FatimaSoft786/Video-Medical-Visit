"use client";

import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { format, addDays } from 'date-fns';
import { enUS, fr, es, it } from 'date-fns/locale';

const AppointmentTabs = ({
  slots,
  selectedDate,
  setSelectedDate,
  selectedHour,
  setSelectedHour,
}) => {
  const scrollRef = useRef(null);
  const [currentLocale, setCurrentLocale] = useState(enUS); 
  const t = useTranslations('DoctorDetailsPage');

  useEffect(() => {
    const lang = document.querySelector("html")?.lang || "en";
    const localeMap = {
      en: enUS,
      fr: fr,
      es: es,
      it: it,
    };
    setCurrentLocale(localeMap[lang]);
  }, []);

  const startDate = new Date();
  const monthDates = Array.from({ length: 30 }, (_, i) => addDays(startDate, i));
  const dates = slots.map((slot) => slot.date);
  const hours = slots[selectedDate]?.time || [];

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      top: 0,
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      top: 0,
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-6 border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <FaArrowLeft
          className="cursor-pointer text-2xl mx-2 size-8"
          onClick={scrollLeft}
        />
        <div
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          ref={scrollRef}
        >
          {monthDates.length > 0 ? (
            monthDates.map((date, index) => (
              <button
                key={index}
                className={`px-2 py-2 ${
                  selectedDate === index
                    ? "border-b-3 border-dark-blue text-dark-blue font-bold"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedDate(index)}
              >
                {format(date, 'dd MMMM', { locale: currentLocale })}
              </button>
            ))
          ) : (
            <p className="text-light-gray px-2 py-2">{t('No slots available')}</p>
          )}
        </div>
        <FaArrowRight
          className="cursor-pointer text-2xl mx-2 size-8"
          onClick={scrollRight}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{t('Select Hour')}</h2>
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
            <p className="text-">{t('No slots available')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentTabs;
