"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function TransactionSidebar({ review }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div className="inset-0 flex flex-col text-black">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-white bg-pure-red flex justify-center px-[5px] py-[10px] max-w-[94px] rounded-[13px] w-20 ${
          review && "!bg-[#008000]"
        }`}
      >
        {review ? "Paid" : "Unpaid"}
      </button>
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className={`z-[99]  ${
          isOpen ? "" : "hidden"
        } fixed top-0 right-0 w-full transition-all duration-300 ease-in-out h-screen bg-black/50 `}
        transition={{ duration: 0.5 }}
      ></motion.div>
      <motion.div
        className={`z-[999]  ${
          isOpen ? "" : "hidden"
        } flex flex-col fixed top-0 overflow-y-scroll right-0 w-[650px] delay-75 transition-all duration-300 ease-in-out max-sm:w-full h-full bg-white`}
        transition={{ duration: 0.5 }}
      >
        <div className="text-left flex items-center border-b h-20 py-6 px-6 relative">
          <h1 className="text-xl font-bold">Transaction Details :</h1>
          <RxCross2
            onClick={() => setIsOpen(false)}
            className="text-xl right-6 absolute cursor-pointer "
          />
        </div>
        <div className="flex flex-col px-4 py-2 justify-between gap-3">
          <div className="flex p-4 mb-6 rounded-2xl border justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <img
                src="/svg/ArrowUp.svg"
                className="p-4 bg-dark-gray/20 rounded-full"
              />
              <div className="flex flex-col text-dark-gray justify-center ">
                <h1 className="text-lg">
                  Sending money to <b className="text-black">Dr. Hamza Yasin</b>
                </h1>
                <span>Sent</span>
              </div>
            </div>
            <h1 className="text-xl font-bold">20 USDT</h1>
          </div>
          <hr className="w-full px-8 pt-1" />
          <div>
            <h1 className="font-bold text-base">Details :</h1>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray">Transaction Number :</span>
              <span className="text-black">#24782420272204</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray"> Status :</span>
              <button
                className={`px-6 rounded-3xl py-3 ${
                  review
                    ? "bg-[#008000]/20 text-[#008000]"
                    : "bg-pure-red/20 text-pure-red"
                }`}
              >
                {review ? "Success" : "Pending"}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray">Transaction Date :</span>
              <span className="text-black">Aug 28, 2024 09:30 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray">Recipient :</span>
              <span className="text-black">Dr, Hamza Yasin</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray">Amount Send :</span>
              <span className="text-black">$20 USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray">Our Fee :</span>
              <span className="text-black">$2 USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dark-gray">Payment Method :</span>
              <span className="text-black">Bank Transfer</span>
            </div>
          </div>
          <hr className="w-full px-8 pt-1" />
          <div>
            <h1 className="font-bold text-lg">
              Dr. Hamza Yasin Bank Details :
            </h1>
            <div className="flex justify-between py-2 items-center">
              <span className="text-dark-gray">Bank Code :</span>
              <span className="text-black">434342344</span>
            </div>
            <div className="flex justify-between py-2 items-center">
              <span className="text-dark-gray">Account Number :</span>
              <span className="text-black">123456789</span>
            </div>
          </div>
          <hr className="w-full px-8 pt-1" />
          {/* note */}
          <div className="flex flex-col py-1 gap-2">
            <span className="text-black font-bold">Note :</span>
            <span className="text-dark-gray border w-full p-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
