import MySwitcher from "@/app/components/Switcher";
import { Image, Switch } from "@nextui-org/react";
import React from "react";

const headers = [
  "Doctor Name",
  "Specialty",
  "Member Since",
  "Earned",
  "Account Status",
];

const data = [
  {
    doctorName: "John Smith",
    specialty: "Dental",
    patientName: "John Smith",
    memberSinceDate: "11 Nov 2024",
    memberSinceTime: "11:00 PM",
    accountStatus: false,
    Earned: "$100",
  },
  {
    doctorName: "John Smith",
    specialty: "Dental",
    patientName: "John Smith",
    memberSinceDate: "11 Nov 2024",
    memberSinceTime: "11:00 PM",
    accountStatus: true,
    Earned: "$100",
  },
  {
    doctorName: "John Smith",
    specialty: "Dental",
    patientName: "John Smith",
    memberSinceDate: "11 Nov 2024",
    memberSinceTime: "11:00 PM",
    accountStatus: true,
    Earned: "$100",
  },
  {
    doctorName: "John Smith",
    specialty: "Dental",
    patientName: "John Smith",
    memberSinceDate: "11 Nov 2024",
    memberSinceTime: "11:00 PM",
    accountStatus: true,
    Earned: "$100",
  },
  {
    doctorName: "John Smith",
    specialty: "Dental",
    patientName: "John Smith",
    memberSinceDate: "11 Nov 2024",
    memberSinceTime: "11:00 PM",
    accountStatus: true,
    Earned: "$100",
  },
  {
    doctorName: "John Smith",
    specialty: "Dental",
    patientName: "John Smith",
    memberSinceDate: "11 Nov 2024",
    memberSinceTime: "11:00 PM",
    accountStatus: true,
    Earned: "$100",
  },
  {
    doctorName: "John Smith",
    specialty: "Dental",
    patientName: "John Smith",
    memberSinceDate: "11 Nov 2024",
    memberSinceTime: "11:00 PM",
    accountStatus: true,
    Earned: "$100",
  },
];

const TableDoctors = () => {
  return (
    <div className="container mx-auto overflow-x-auto">
      <div className="mx-4 border">
        <div className="table w-full border-b">
          <div className="table-header-group bg-light-gray text-black">
            <div className="table-row">
              {headers.map((header, index) => (
                <div
                  key={index}
                  className="table-cell header-date place-content-center font-semibold text-center text-lg px-4 py-4 max-lg:text-base max-sm:text-sm"
                >
                  {header}
                </div>
              ))}
            </div>
          </div>
          <div className="table-row-group text-dark-gray">
            {data.map((row, index) => (
              <div key={index} className="table-row relative .header-date">
                <div className="table-cell text-center place-content-center py-2 px-4 max-lg:text-base max-sm:text-sm">
                  {row.doctorName}
                </div>
                <div className="table-cell text-center place-content-center py-2 px-4 max-lg:text-base max-sm:text-sm">
                  {row.specialty}
                </div>
                <div className="table-cell text-left place-content-center py-2 max-sm:px-0 px-4 max-lg:text-base max-sm:text-sm">
                  <div className="flex flex-col text-left pl-24 max-md:pl-12 max-sm:pl-0">
                    <span className="text-left">{row.memberSinceDate}</span>
                    <span className="text-left text-black">
                      {row.memberSinceTime}
                    </span>
                  </div>
                </div>
                <div className="table-cell text-center place-content-center py-2 px-4 max-lg:text-base max-sm:text-sm">
                  {row.Earned}
                </div>
                <div className="table-cell text-center place-content-center py-2 px-4 max-lg:text-base max-sm:text-sm">
                  <MySwitcher
                    size="md"
                    defaultChecked={row.accountStatus}
                    isChecked={row.accountStatus}
                  />
                </div>
                <hr className="w-full h-2 absolute bottom-0 left-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDoctors;
