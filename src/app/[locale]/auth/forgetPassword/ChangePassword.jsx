"use client";

import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import getPath from "@/utils/path";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const container = "flex flex-col items-center";
const form = "w-full max-w-md";
const inputClass = "w-full p-3 mb-4 border rounded-lg";
const buttonClass = "w-full bg-dark-blue text-white p-3 rounded";

const ChangePassword = ({ email, id }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const path = getPath();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/user/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, password: password }),
        }
      );
      const data = await response.json();
      if (response) {
        toast.success(data.message + " " + "Now You Can Login");
        router.push("/");
      } else {
        toast.error("Error changing password");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  return (
    <div className={container}>
      <form className={form} onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-bold mb-4">Change Password</h2>
        <p className="text-center mb-4">Input your new password below.</p>
        <div className="flex relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className={inputClass}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaEye
            onClick={() => setShow(!show)}
            className="absolute cursor-pointer right-4 m-auto top-4"
          />
        </div>
        <div className="flex relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            className={inputClass}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaEye
            onClick={() => setShow(!show)}
            className="absolute cursor-pointer right-4 m-auto top-4"
          />
        </div>
        <button type="submit" className={buttonClass}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
