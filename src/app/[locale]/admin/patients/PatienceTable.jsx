import { Image } from "@nextui-org/react";
import React from "react";

const headers = [
  "Patient ID",
  "Patient Name",
  "Age",
  "Address",
  "Phone",
  "Last Visit",
  "Paid",
];

const data = [
  {
    patientId: "#224244",
    patientName: "Dr. John Smith",
    age: 43,
    address: "Lorem ipsum dolor sit amet, consectetur",
    phone: "123-456-7890",
    lastVisitDate: "11 Nov 2024",
    lastVisitTime: "11:00 PM",
    paid: "$100",
  },
  {
    patientId: "#224244",
    patientName: "Dr. John Smith",
    age: 43,
    address: "Lorem ipsum dolor sit amet, consectetur",
    phone: "123-456-7890",
    lastVisitDate: "11 Nov 2024",
    lastVisitTime: "11:00 PM",
    paid: "$100",
  },
  {
    patientId: "#224244",
    patientName: "Dr. John Smith",
    age: 43,
    address: "Lorem ipsum dolor sit amet, consectetur",
    phone: "123-456-7890",
    lastVisitDate: "11 Nov 2024",
    lastVisitTime: "11:00 PM",
    paid: "$100",
  },
  {
    patientId: "#224244",
    patientName: "Dr. John Smith",
    age: 43,
    address: "Lorem ipsum dolor sit amet, consectetur",
    phone: "123-456-7890",
    lastVisitDate: "11 Nov 2024",
    lastVisitTime: "11:00 PM",
    paid: "$100",
  },
];

const PatienceTable = () => {
  return (
    <div className=" overflow-x-auto">
      <div className="mx-4 border">
        {/* Header Table */}
        <div className="table w-full border-b">
          <div className="table-header-group bg-light-gray text-black">
            <div className="table-row">
              {headers.map((header, index) => (
                <div
                  key={index}
                  className="table-cell first:pl-6 text-left place-content-center font-semibold text-lg px-2 max-sm:px-1 py-4 max-lg:text-base max-sm:text-sm"
                >
                  {header}
                </div>
              ))}
            </div>
          </div>
          {/* Body Table */}
          <div className="table-row-group text-dark-gray">
            {data.map((row, index) => (
              <div key={index} className="table-row">
                <div className="table-cell pl-6 text-left place-content-center py-2 px-2 max-sm:px-1 max-lg:text-base max-sm:text-sm">
                  {row.patientId}
                </div>
                <div className="table-cell items-center max-md:truncate text-left text-ellipsis max-sm:max-w-[50px]  place-content-center py-2 px-2 max-sm:px-1 max-lg:text-base max-sm:text-sm">
                  <div className="flex items-center">
                    <Image
                      src="/svg/user.svg"
                      className="w-8 h-8 mr-2 max-md:hidden"
                      alt="User Icon"
                    />
                    <span>{row.patientName}</span>
                  </div>
                </div>
                <div className="table-cell text-left place-content-center py-2 px-2 max-sm:px-1 max-lg:text-base max-sm:text-sm">
                  {row.age}
                </div>
                <div className="table-cell max-md:max-w-[50px] max-w-[150px] text-left !place-content-center py-2 px-2 max-sm:px-1 max-lg:text-base max-sm:text-sm truncate">
                  {row.address}
                </div>
                <div className="table-cell text-left !place-content-center py-2 px-2 max-sm:px-1 max-lg:text-base max-sm:text-sm">
                  {row.phone}
                </div>
                <div className="table-cell text-left !place-content-center py-2 px-2 max-sm:px-1 max-lg:text-base max-sm:text-sm">
                  <div className="flex flex-col items-start ">
                    <span>{row.lastVisitDate}</span>
                    <span className="text-black">{row.lastVisitTime}</span>
                  </div>
                </div>
                <div className="table-cell text-left place-content-center py-2 px-2 max-sm:px-1 max-lg:text-base max-sm:text-sm">
                  {row.paid}
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

export default PatienceTable;
