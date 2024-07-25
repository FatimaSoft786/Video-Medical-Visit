import { useState, useEffect } from "react";
import AppointmentCard from "./AppointmentCard";
import { getUserSession } from "@/utils/session";
import axios from "axios";
import LoadingSkeleton from "./LoadingSkeleton";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

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

const AppointmentsHeld = ({ appointments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
      {appointments.map((appointment, index) => (
        <AppointmentCard key={index} appointment={appointment} isHeld />
      ))}
    </div>
  );
};

const AppointmentsScheduled = ({ appointments, isLoading, onCancel }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
      {appointments.map((appointment, index) => (
        <AppointmentCard
          key={index}
          appointment={appointment}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};

export default function AppointmentTabs() {
  const t = useTranslations("DoctorAppointments");
  const [appointmentsHeld, setAppointmentsHeld] = useState([]);
  const [appointmentsScheduled, setAppointmentsScheduled] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = getUserSession();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.post(
          "https://video-medical-backend-production.up.railway.app/api/appointment/fetchAppointmentByDoctor",
          { doctor: user.user_details._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { appointments_list } = response.data;
        setPatientData(appointments_list.patient);
        const held = appointments_list.filter(
          (appointment) => appointment.appointment_status === "cancelled"
        );
        const scheduled = appointments_list.filter(
          (appointment) => appointment.appointment_status === "waiting"
        );
        setAppointmentsHeld(held);
        setAppointmentsScheduled(scheduled);
      } catch (error) {
        console.error(`${t("Error cancelling appointment")} :`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user.user_details._id, token]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.post(
        "https://video-medical-backend-production.up.railway.app/api/appointment/cancelAppointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointmentsScheduled((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      toast.error(t("Error cancelling appointment"));
    }
  };

  const tabsData = [
    {
      label: t("Appointment held"),
      content: (
        <AppointmentsHeld
          appointments={appointmentsHeld}
          isLoading={isLoading}
        />
      ),
    },
    {
      label: t("Appointment scheduled"),
      content: (
        <AppointmentsScheduled
          appointments={appointmentsScheduled}
          isLoading={isLoading}
          onCancel={handleCancelAppointment}
        />
      ),
    },
  ];

  return (
    <div>
      <Tabs tabs={tabsData} />
    </div>
  );
}
