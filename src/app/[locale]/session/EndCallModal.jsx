"use client";
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getUserSession } from '@/utils/session';

const EndCallModal = ({ isOpen, onClose, ModalText }) => {
  const [appointment, setAppointment] = useState("completed");
  const { user, token } = getUserSession();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("room");
  const router = useRouter();

  const changeAppointmentStatus = useCallback(async (appointmentStatus) => {
    const role = user?.user_details.role.toLowerCase();

    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/appointment/changeAppointmentStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ appointmentId, appointment_status: appointmentStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to change appointment status");
      }

      router.push(`/it/${role}`);
    } catch (error) {
      console.error("Error changing appointment status:", error);
    }
  }, [appointmentId, token, user, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 backdrop-blur-md flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-lg shadow-lg p-6 w-1/3 max-md:w-[90%]"
      >
        {ModalText ? (
          <p>{ModalText}</p>
        ) : (
          <>
            <p className="mb-4">Please select an option </p>
            {/* <div className="flex justify-center items-center gap-2">
              <button
                className={`border px-2.5 py-0.5 rounded-lg ${appointment === "completed" && "bg-gray-200/70"}`}
                onClick={() => setAppointment("completed")}
              >
                Appointment Complete
              </button>
              <button
                className={`border px-2.5 py-0.5 rounded-lg ${appointment === "waiting" && "bg-gray-200/70"}`}
                onClick={() => setAppointment("waiting")}
              >
                Waiting Appointment
              </button>
            </div> */}
          </>
        )}
        <div className="flex justify-end gap-2">
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={() => changeAppointmentStatus(appointment)}
          >
            Leave Meeting
          </button>
          {ModalText && (
            <button
              className="mt-4 bg-black/80 text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Back to Meeting
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EndCallModal;
