"use client";
import { getUserSession } from '@/utils/session';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import getPath from '@/utils/path';
import { useSearchParams } from "next/navigation";

const EndCallModal = ({ isOpen, onClose }) => {
  const [appointment, setAppointment] = useState("");
  const { user, token } = getUserSession();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("room");

  const role = user?.user_details;
  const router = useRouter();

  const handleStatusChange = async (status) => {
    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/appointment/changeAppointmentStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({appointmentId }),
        }
      );

      if (response.success === true) {
        
              const path = getPath();
              router.push(`/${path}/${role}`);
        throw new Error("Failed to change appointment status");
      }
    } catch (error) {
      console.error("Error changing appointment status:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 backdrop-blur-md flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-lg shadow-lg p-6 w-1/3 max-md:w-[90%]"
      >
        <h2 className="text-lg font-bold mb-4">Appointment Options</h2>
        <p className="mb-4">Please select an option below:</p>
        <div className="flex justify-between gap-2">
          <button
            className={`border px-2.5 py-0.5 rounded-lg ${
              appointment === "complete" && "bg-gray-200/70"
            }`}
            onClick={() => setAppointment("complete")}
          >
            Appointment Complete
          </button>
          <button
            className={`border px-2.5 py-0.5 rounded-lg ${
              appointment === "waiting" && "bg-gray-200/70"
            }`}
            onClick={() => setAppointment("waiting")}
          >
            Waiting Appointment
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={() => handleStatusChange(appointment)}
          >
            Leave
          </button>
          <button
            className="mt-4 bg-black/80 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EndCallModal;
