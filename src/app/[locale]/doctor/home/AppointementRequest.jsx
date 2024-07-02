import React from "react";
import { getUserSession } from "@/utils/session";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

const AppointmentRequest = ({ requestsData, setRequestsData, loading }) => {
  const { token } = getUserSession();
  const t = useTranslations("DoctorDashboard");

  const handleRequestAction = async (appointmentId, status) => {
    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/appointment/ApprovalAppointmentRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentId,
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`${t("Failed to update appointment request")}`);
      }

      const updatedRequests = requestsData.filter(
        (request) =>
          request.appointment_request_approved &&
          request.appointment_request_declined
      );
      setRequestsData(updatedRequests);
      console.log(requestsData);
      toast.success(
        ` ${status ? t("Confirmed") : t("Declined")} successfully. E-mail Sent`
      );
    } catch (error) {
      console.error("Error updating appointment request:", error);
      toast.error(`${t("Failed to update appointment request")}`);
    }
  };

  return (
    <div className="p-4 max-md:p-2 bg-white rounded-xl border">
      <div className="flex justify-between items-center my-4 px-4">
        <h3 className="text-2xl font-bold mb-4">{t("Appointment Request")}</h3>
        <button className="text-gray-500 font-semibold">{t("See all")}</button>
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
      ) : !requestsData.length ? (
        <div className="p-4 text-center text-gray-500">
          {t("No appointment found")}
        </div>
      ) : (
        <ul>
          {requestsData
            .filter(
              (request) =>
                request.appointment_request_approved ||
                request.appointment_request_declined
            )
            .map((request) => (
              <li
                key={request._id}
                className="flex justify-between items-center px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={
                      request.patient.picture_url
                        ? request.patient.picture_url
                        : request.patient.default_picture_url
                    }
                    className="w-12 h-12 rounded-full"
                    alt={`User Icon for ${request.patient.firstName} ${request.patient.lastName}`}
                  />
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-semibold">{`${request.patient.firstName} ${request.patient.lastName}`}</p>
                    <p className="text-gray-500 text-sm">{`${new Date(
                      request.appointment_date
                    ).toLocaleDateString()} - ${request.appointment_time}`}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleRequestAction(request._id, true)}
                    className="px-4 py-2 w-32 rounded-xl max-md:w-fit max-md:p-2 bg-lime-green text-white"
                  >
                    {t("Confirmed")}
                  </button>
                  <button
                    onClick={() => handleRequestAction(request._id, false)}
                    className="px-4 py-2 w-32 rounded-xl max-md:w-fit max-md:p-2 bg-pure-red text-white"
                  >
                    {t("Declined")}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentRequest;
