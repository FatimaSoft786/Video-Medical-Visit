"use client";

import React, { useEffect, useState } from "react";
import MedicalSection from "../components/MedicalSection";
import ConfirmDoctor from "../components/ConfirmedDoctor";
import { getUserSession } from "@/utils/session";
import LoadingSkeleton from "../../doctor/appointments/LoadingSkeleton";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container mx-auto py-8">
      <div className="flex border-b my-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`items-center text-center px-8 py-3 focus:outline-none ${
              activeTab === index
                ? "border-b-3 font-bold border-dark-blue text-dark-blue"
                : "text-black"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab] && tabs[activeTab].content}</div>
    </div>
  );
};



const ScheduledAppointments = ({ appointments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {appointments.map((appointment, index) => (
        <ConfirmDoctor key={index} appointment={appointment} />
      ))}
    </div>
  );
};

const DoneAppointments = ({ appointments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {appointments.map((appointment, index) => (
        <ConfirmDoctor key={index} appointment={appointment} isDone />
      ))}
    </div>
  );
};
const AppointmentTabsPage = () => {
  const [appointmentsDone, setAppointmentsDone] = useState([]);
  const [appointmentsScheduled, setAppointmentsScheduled] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = getUserSession();
  const patientId = user.user_details._id;

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/appointment/fetchAppointmentByPatient",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patient: patientId }),
        }
      );
      const data = await response.json();
      const done = data.appointments.filter(
        (appointment) => appointment.payment_status === "Paid"
      );
      const scheduled = data.appointments.filter(
        (appointment) => appointment.appointment_status === "waiting"
      );
      setAppointmentsScheduled(scheduled);
      setAppointmentsDone(done);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [patientId]);

  const tabsData = [
    {
      label: "Scheduled Appointments",
      content: (
        <ScheduledAppointments appointments={appointmentsScheduled} isLoading={isLoading} />
      ),
    },
    {
      label: "Done Appointments",
      content: (
        <DoneAppointments appointments={appointmentsDone} isLoading={isLoading} />
      ),
    },
  ];

  return (
    <div className="overflow-hidden">
      <title>Appointment | A Doctor's Appointment</title>
      <MedicalSection />
      <Tabs tabs={tabsData} />
    </div>
  );
};

export default AppointmentTabsPage;

