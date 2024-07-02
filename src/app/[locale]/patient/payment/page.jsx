"use client";

import React, { useEffect, useState } from "react";
import MedicalSection from "../components/MedicalSection";
import PaymentCard from "../components/PaymentCard";
import { getUserSession } from "@/utils/session";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const { user, token } = getUserSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `https://video-medical-backend-production.up.railway.app/api/appointment/fetchAppointmentByPatient`,
          {
            method: "POST",
            body: JSON.stringify({ patient: user.user_details._id }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success && data.appointments) {
          setPayments(data.appointments);
        } else {
          setError("No payment Data");
        }
        setLoading(false);
      } catch (error) {
        setError(
          error.response
            ? `Error: ${error.response.data.message}`
            : "Error: Unable to fetch payments"
        );
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const DoctorCardSkeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
      <div className="h-32 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="overflow-hidden">
        <MedicalSection />
        <div className="w-full grid container mx-auto grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 p-8">
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-4xl font-bold flex items-center justify-center min-h-[85vh]">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <MedicalSection />
      <div className="grid grid-cols-1 mx-auto container md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {payments.length > 0 &&
          payments.map((payment) => (
            <PaymentCard key={payment._id} appointment={payment} />
          ))}
      </div>
      {payments.length === 0 && (
        <p className="text-center pb-12 font-bold text-3xl w-full mx-auto">
          No payment history
        </p>
      )}
    </div>
  );
};

export default PaymentPage;
