import React from "react";
import Deletebtn from "@/app/components/Deletebtn";
import EditBtn from "@/app/components/EditBtn";

const TableSpecialities = () => {
  const specialtiesData = Array.from({ length: 6 }).map((_, index) => ({
    id: 14233 + index,
    specialty: "Urology",
  }));

  return (
    <div className="overflow-x-auto">
      <div className="mx-4 border">
        {/* Header Table */}
        <div className="w-full bg-light-gray text-black grid grid-cols-3 gap-4 px-6 py-3">
          {["#", "Specialties", "Actions"].map((header, index) => (
            <div
              key={index}
              className="font-semibold text-left last:text-center text-lg px-6 last:pl-14 py-1 max-lg:text-base max-sm:text-sm"
            >
              {header}
            </div>
          ))}
        </div>
        {/* Body Table */}
        <div className="text-dark-gray">
          {specialtiesData.map((specialty, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 py-1 border-b border-light-gray"
            >
              <div className="text-left items-center flex px-6 py-2 max-lg:text-base max-sm:text-sm">
                {specialty.id}
              </div>
              <div className="text-left items-center flex px-12 max-sm:px-4 py-2 max-lg:text-base max-sm:text-sm">
                {specialty.specialty}
              </div>
              <div className="text-center pl-14 py-2 max-lg:text-base max-sm:text-sm">
                <div className="flex items-center justify-center gap-2.5 max-sm:gap-1">
                  <EditBtn />
                  <Deletebtn />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSpecialities;
