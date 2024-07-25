import React from "react";
import { format } from "date-fns";

const SlotsTabs = ({ selectedDate, toggleSlot, selectedSlots, hours }) => {
  const limitedHours = hours.slice(0, 18);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {limitedHours.map((hour) => {
        const slotKey = `${format(selectedDate, "yyyy-MM-dd")}-${hour}`;
        const isSelected = selectedSlots.includes(slotKey);

        return (
          <div
            key={hour}
            className={`flex flex-col border rounded-2xl overflow-hidden cursor-pointer ${
              isSelected
                ? "border-dark-blue text-dark-blue"
                : "border-light-gray text-black"
            }`}
            onClick={() => toggleSlot(format(selectedDate, "yyyy-MM-dd"), hour)}
          >
            <div
              className={`p-4 text-center flex items-center justify-center ${
                isSelected
                  ? "bg-dark-blue text-white"
                  : "bg-light-gray text-black"
              }`}
            ></div>
            <div
              className={`p-2 text-center ${
                isSelected ? "bg-dark-blue/30" : "bg-white"
              }`}
            >
              {hour.toString().padStart(2, "0")}:00 -{" "}
              {(hour + 1).toString().padStart(2, "0")}:00
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SlotsTabs;
