"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import TodayAppointments from "./home/TodayAppointement";
import RecentPatients from "./home/RecentPatient";
import { getUserSession } from "@/utils/session";
import MedicalSection from "./components/MedicalSection";
import Counter from "./home/Counter";
import AppointmentRequest from "./home/AppointementRequest";
import { useTranslations } from "next-intl";

const Home = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [counterData, setCounterData] = useState({
    total_earning: 0,
    total_appointments: 0,
    total_patients: 0,
  });
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "dd MMMM yyyy")
  );
  const [loading, setLoading] = useState(true);
  const [requestsData, setRequestsData] = useState([]);
  const { user, token } = getUserSession();
  const doctorId = user.user_details._id;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://video-medical-backend-production.up.railway.app/api/user/doctorDashboard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ doctorId, selectedDate }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setCounterData({
          total_earning: data.total_earning,
          total_appointments: data.total_appointments,
          total_patients: data.total_patients,
        });
        setAppointments(data.appointments_list);
        setRequestsData(data.appointments_list);
        setPatients(
          data.appointments_list.map((appointment) => appointment.patient)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId, token, selectedDate]);
  const t = useTranslations("DoctorDashboard");

  return (
    <div className="overflow-hidden">
      <title>Home | A Doctor's Appointment</title>
      <MedicalSection placeholder={t("Search Patient")} />
      <div className="p-4 py-12 space-y-8 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Counter type="patients" count={counterData.total_patients} />
          <Counter type="appointments" count={counterData.total_appointments} />
          <Counter type="income" count={counterData.total_earning} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AppointmentRequest
            requestsData={requestsData}
            setRequestsData={setRequestsData}
            loading={loading}
          />
          <TodayAppointments
            setPatientId={setPatientId}
            appointments={appointments}
            loading={loading}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <RecentPatients patients={patients} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
