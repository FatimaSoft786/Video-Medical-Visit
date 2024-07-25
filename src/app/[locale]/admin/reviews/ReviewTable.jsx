import { Image } from "@nextui-org/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import React from "react";
import Deletebtn from "@/app/components/Deletebtn";

const headers = [
  "Patient Name",
  "Doctor Name",
  "Rating",
  "Description",
  "Date",
  "Actions",
];

const data = Array.from({ length: 6 }).map((_, index) => ({
  doctorName: "John Smith",
  rating: 3,
  patientName: "#2224244",
  reviewDate: "11 Nov 2024",
  reviewTime: "11:00 PM",
  description: "Lorem ipsum dolor sit amet, consectetur",
}));

const ReviewTable = () => {
  return (
    <div className=" overflow-auto">
      {/* Header Table */}
      <div className="mx-4 border">
        <div className="table w-full border-b">
          <div className="table-header-group bg-light-gray text-black">
            <div className="table-row">
              {headers.map((header, index) => (
                <div
                  key={index}
                  className="table-cell first:pl-12 max-md:first:pl-2 font-semibold last:text-center text-left text-lg px-4 py-4 max-lg:text-base max-sm:text-sm"
                >
                  {header}
                </div>
              ))}
            </div>
          </div>
          {/* Body Table */}
          <div className="table-row-group text-dark-gray">
            {data.map((review, index) => (
              <div
                key={index}
                className="table-row border-b border-light-gray relative"
              >
                <div className="table-cell pl-14 max-md:pl-2 place-content-center text-left py-3 px-4 max-lg:text-base max-sm:text-sm">
                  {review.patientName}
                </div>
                <div className="table-cell place-content-center items-center justify-center py-3 px-4 max-lg:text-base max-sm:text-sm gap-1">
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/svg/user.svg"
                      className="w-8 h-8 hidden md:inline-block"
                      alt="User Icon"
                    />
                    {review.doctorName}
                  </div>
                </div>
                <div className="table-cell items-center place-content-center  text-left py-3 max-lg:text-base max-sm:text-sm">
                  <div className="flex items-center justify-start gap-1 max-md:hidden">
                    {[...Array(5)].map((_, i) =>
                      review.rating > i ? (
                        <FaStar key={i} color="#FFC107" />
                      ) : (
                        <FaRegStar key={i} />
                      )
                    )}
                    <span className="mt-0.5">({review.rating})</span>
                  </div>
                </div>
                <div className="table-cell place-content-center truncate text-left py-3 px-4 max-w-[120px] max-sm:max-w-[60px] max-lg:text-base max-sm:text-sm">
                  {review.description}
                </div>
                <div className="table-cell text-left py-3 place-content-center px-4 max-lg:text-base max-sm:text-sm">
                  <div className="flex flex-col max-w-[180px]">
                    <span>{review.reviewDate}</span>
                    <span className="text-black">{review.reviewTime}</span>
                  </div>
                </div>
                <div className="table-cell pl-20 max-md:pl-14 text-left place-content-center py-3 px-4 max-lg:text-base max-sm:text-sm">
                  <Deletebtn />
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

export default ReviewTable;
