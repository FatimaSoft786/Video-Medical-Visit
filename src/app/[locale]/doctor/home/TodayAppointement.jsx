import { useEffect, useState } from "react";
import { format } from "date-fns";
import DateNavigation from "./DateNavigation";
import { useTranslations } from "next-intl";

const TodayAppointments = ({
  setPatientId,
  appointments,
  loading,
  selectedDate,
  setSelectedDate,
}) => {
  const t = useTranslations("DoctorDashboard");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showAllAppointments, setShowAllAppointments] = useState(false);

  useEffect(() => {
    const filteredAppointments = appointments.filter(
      (appointment) =>
        showAllAppointments || appointment.appointment_date === selectedDate
    );
    console.log(filteredAppointments);
    if (filteredAppointments.length > 0) {
      setPatientId(filteredAppointments[0].patient._id);
    }

    setFilteredAppointments(filteredAppointments);
  }, [appointments, selectedDate, showAllAppointments, setPatientId]);

  // Set dynamic title based on selected language
  useEffect(() => {
    document.title = `${t("Today Appointments")} | A Doctor's Appointment`;
  }, [t]);

  const handleSeeAllAppointments = () => {
    setShowAllAppointments(!showAllAppointments);
  };

  return (
    <div className="p-4 rounded-xl border max-md:p-2">
      <div className="flex px-4 justify-between items-center my-4">
        <h3 className="text-2xl font-bold mb-4">{t("Today Appointments")}</h3>
        <button
          onClick={handleSeeAllAppointments}
          className="text-gray-500 font-semibold"
        >
          {showAllAppointments ? "Show Today's Appointments" : t("See all")}
        </button>
      </div>
      {loading ? (
        <div className="space-y-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : (
        <ul>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <li
                key={index}
                className={`flex px-4 py-2 justify-between items-center mb-2 ${
                  appointment.onGoingCall === "true" && "bg-lite-grayish-blue"
                }`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={
                      appointment.patient.default_picture_url || "/img/user.png"
                    }
                    className="size-12 rounded-full"
                    alt="User Icon"
                  />
                  <div className="flex flex-col items-start justify-start p-4">
                    <p className="font-semibold">
                      {appointment.patient.firstName}{" "}
                      {appointment.patient.lastName}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">{appointment.appointment_time}</p>
              </li>
            ))
          ) : (
            <p className="px-4 py-2">{t("No appointment found")}</p>
          )}
        </ul>
      )}
      <DateNavigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default TodayAppointments;
