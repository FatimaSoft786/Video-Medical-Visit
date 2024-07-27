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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {hours.length > 0 ? (
            hours.map((hour, index) => (
              
            <div
            className={`flex flex-col border rounded-2xl overflow-hidden cursor-pointer ${
              selectedHour === index
                ? "border-dark-blue text-dark-blue"
                : "border-light-gray text-black"
            }`}
             onClick={() => setSelectedHour(index)}
          >
            <div
              className={`p-4 text-center flex items-center justify-center ${
                selectedHour === index
                  ? "bg-dark-blue text-white"
                  : "bg-light-gray text-black"
              }`}
            ></div>
            <div
              className={`p-2 text-center ${
                selectedHour === index ? "bg-dark-blue/30" : "bg-white"
              }`}
            >
              {hour}
            </div>
          </div>
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


