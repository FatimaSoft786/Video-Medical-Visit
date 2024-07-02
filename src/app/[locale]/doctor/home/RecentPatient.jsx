import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";

const RecentPatients = ({ patients, loading }) => {
  const t = useTranslations("DoctorDashboard");

  const getShortId = (id) => {
    return id ? id.slice(0, 4) : "N/A";
  };

  return (
    <div className="border rounded-xl">
      <h3 className="text-2xl font-bold mb-4 px-4 pt-6 pb-2">
        {t("Recent Patients")}
      </h3>
      <table className="w-full text-center">
        <thead className="bg-light-gray">
          <tr className="capitalize text-center max-md:text-sm">
            <th className="py-3">{t("Patient Name")}</th>
            <th className="py-3">{t("Visit ID")}</th>
            <th className="py-3">{t("Date")}</th>
            <th className="py-3">{t("Gender")}</th>
            <th className="py-3">{t("Disease")}</th>
            <th className="py-3">{t("Status")}</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array(5)
              .fill()
              .map((_, index) => (
                <tr
                  key={index}
                  className="text-center max-md:text-sm text-black/80 border-b last:border-none"
                >
                  <td className="py-3 flex items-center justify-center gap-2">
                    <Skeleton
                      circle={true}
                      height={40}
                      width={40}
                      className="max-md:hidden"
                    />
                    <Skeleton width={100} />
                  </td>
                  <td className="py-3">
                    <Skeleton width={80} />
                  </td>
                  <td className="py-3">
                    <Skeleton width={80} />
                  </td>
                  <td className="py-3">
                    <Skeleton width={60} />
                  </td>
                  <td className="py-3">
                    <Skeleton width={80} />
                  </td>
                  <td className="py-3">
                    <Skeleton width={80} />
                  </td>
                </tr>
              ))
          ) : patients.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-3 text-center">
                {t("No patient data available")}
              </td>
            </tr>
          ) : (
            patients.map((patient, index) => (
              <tr
                key={index}
                className="text-center max-md:text-sm text-black/80 border-b last:border-none"
              >
                <td className="py-3 flex items-center justify-center gap-2">
                  <img
                    src={patient.default_picture_url || "/img/user.png"}
                    className="max-md:hidden size-6"
                    alt="User Icon"
                  />
                  {patient.firstName} {patient.lastName || "N/A"}
                </td>
                <td className="py-3">{getShortId(patient._id)}</td>
                <td className="py-3">
                  {new Date(patient.date).toLocaleDateString() || "N/A"}
                </td>
                <td className="py-3">{patient.sex || "N/A"}</td>
                <td className="py-3">{patient.disease || "N/A"}</td>
                <td className="py-3">{patient.status || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPatients;
