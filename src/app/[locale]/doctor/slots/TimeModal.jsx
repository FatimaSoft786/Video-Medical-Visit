import { motion } from "framer-motion";
import { useEffect, useCallback, useState } from "react";

const TimeModal = ({
  isOpen,
  onClose,
  hours,
  selectedDate,
  selectedSlots,
  onTimeSelect,
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // Load selections from local storage when modal opens
    if (isOpen) {
      const savedSelected =
        JSON.parse(localStorage.getItem("selectedSlots")) || [];
      setSelected(savedSelected);
    }
  }, [isOpen]);

  const handleTimeClick = (hour) => {
    const slotKey = `${selectedDate}-${hour}`;
    const newSelected = selected.includes(slotKey)
      ? selected.filter((slot) => slot !== slotKey)
      : [...selected, slotKey];

    setSelected(newSelected);
    localStorage.setItem("selectedSlots", JSON.stringify(newSelected));
  };

  const handleConfirm = () => {
    selected.forEach((slot) => {
      const [dateIndex, hour] = slot.split("-");
      onTimeSelect(parseInt(dateIndex), parseInt(hour));
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-3/4 w-full max-h-screen overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select Time</h2>
        </div>
        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 w-full">
          {hours.map((hour) => {
            const slotKey = `${selectedDate}-${hour}`;
            const isSelected = selected.includes(slotKey);

            return (
              <div
                key={hour}
                className={`flex flex-col border rounded-xl cursor-pointer ${
                  isSelected
                    ? "border-dark-blue text-dark-blue"
                    : "border-gray-300"
                }`}
                onClick={() => handleTimeClick(hour)}
              >
                <div
                  className={`flex items-center justify-center h-16 ${
                    isSelected
                      ? "bg-dark-blue text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {hour}:00 - {hour + 1}:00 PM
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button            className="px-4 py-2 bg-dark-blue text-white rounded-lg hover:bg-dark-blue-hover"
            onClick={handleConfirm}
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TimeModal;
