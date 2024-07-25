import MySwitcher from "@/app/components/Switcher";
import { Image, Switch } from "@nextui-org/react";
import React from "react";

const TableAppointment = () => {
  const appointmentData = Array.from({ length: 6 }).map((_, index) => ({
    doctorName: "Hamza Yasin",
    specialty: "Dental",
    patientName: "Hamza Yasin",
    appointmentDate: "11 Nov 2024",
    appointmentTime: "11:00 PM",
    status: true,
    amount: "$300",
  }));

  return (
    <div className="w-full mt-2 mx-4 border overflow-x-auto">
      <div className="table w-full border-b">
        <div className="table-header-group bg-light-gray text-black">
          <div className="table-row">
            {[
              "Doctor Name",
              "Specialty",
              "Patient Name",
              "Appointment Time",
              "Status",
              "Amount",
            ].map((header, index) => (
              <div
                key={index}
                className="table-cell place-content-center font-semibold text-center text-lg px-4 py-4 max-lg:text-base max-sm:text-sm"
              >
                {header}
              </div>
            ))}
          </div>
        </div>
        <div className="table-row-group text-dark-gray">
          {appointmentData.map((appointment, index) => (
            <div key={index} className="table-row relative">
              <div className="table-cell place-content-center text-center px-4">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/svg/user.svg"
                    className="size-8"
                    alt="User Icon"
                  />
                  {appointment.doctorName}
                </div>
              </div>
              <div className="table-cell place-content-center text-center px-4  max-lg:text-base max-sm:text-sm">
                {appointment.specialty}
              </div>
              <div className="table-cell place-content-center text-center px-4 ">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/svg/user.svg"
                    className="size-8"
                    alt="User Icon"
                  />
                  {appointment.patientName}
                </div>
              </div>
              <div className="table-cell place-content-center text-center px-4 py-2 max-lg:text-base max-sm:text-sm">
                <div className="flex flex-col items-start pl-20 max-lg:pl-7 max-sm:pl-2">
                  <span>{appointment.appointmentDate}</span>
                  <span className="text-black">
                    {appointment.appointmentTime}
                  </span>
                </div>
              </div>
              <div className="table-cell place-content-center items-center max-lg:pl-6 pl-12 max-lg:text-base max-sm:text-sm">
                <MySwitcher status={appointment.status} />
              </div>
              <div className="table-cell place-content-center text-center px-4 max-lg:text-base max-sm:text-sm">
                {appointment.amount}
              </div>
              <hr className="w-full h-2 absolute bottom-0 left-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableAppointment;
