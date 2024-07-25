"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
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
    <div className="">
      <button onClick={() => setIsOpen(!isOpen)} className={buttonClass}>
        Log In
      </button>
      <motion.div>
        <motion.div
          className={`z-[99]  ${
            isOpen ? "" : "hidden"
          } fixed top-0 right-0 flex justify-center items-center w-full h-screen bg-black/30 px-2`}
        >
          <motion.div
            className={`z-[999]  ${
              isOpen ? "" : "hidden"
            }  w-[500px] max-sm:w-full h-fit py-8 rounded-lg bg-white p-4`}
          >
            <h1 className="text-2xl font-bold py-2 text-center">
              Who You Are ?
            </h1>
            <p className="text-center mb-6">
              We need to determine your ride. This will help us to build a
              reliable system together.
            </p>
            <label for="userType" className="!text-left text-light-gray">
              Select User Type
            </label>
            <select className="w-full border-b-2 pb-1 mb-6">
              <option value="patient" id="userType" name="userType">
                Patient
              </option>
              <option value="doctor">Doctor</option>
              <option value="admin">admin</option>
            </select>
            <Link
              href={`/${params.locale}/signin/forget-password`}
              className="py-2"
            >
              Forgot Password?
            </Link>
            <div className="flex justify-end pt-4 gap-6">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className=" bg-light-gray text-white px-12 py-3 rounded"
              >
                Cancel
              </button>
              <button className=" bg-dark-blue text-white px-12 py-3 rounded">
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
