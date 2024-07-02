"use client";
import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";

const container = "flex flex-col items-center";
const form = "w-full max-w-md";
const inputClass =
  "w-full mb-4 size-12 text-center border rounded-lg focus:outline-none focus:border-black";
const buttonClass = "w-full bg-dark-blue text-white p-3 rounded";

const VerifyOtp = ({ email, setId }) => {
  const t = useTranslations("VerifyOtp");
  const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) && value.length === 1) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    const { key } = e;
    if (key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((ref) => ref.current.value).join("");

    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/user/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setId(data.message._id);
        toast.success(`${t("OTP verified successfully")}!`);
      } else {
        toast.error(`${t("Error verifying OTP")}`);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className={container}>
      <Toaster />
      <form className={form} onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-bold mb-4">
          {t("OTP Authentication")}
        </h2>
        <p className="mb-8 text-dark-gray text-center">
          {t(
            "Please enter the four digit verification code we have sent on your email."
          )}
          {email}.
        </p>
        <div className="flex px-12 gap-3">
          {inputRefs.current.map((ref, index) => (
            <input
              key={index}
              type="number"
              className={inputClass}
              maxLength={1}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={ref}
              required
            />
          ))}
        </div>
        <button type="submit" className={buttonClass}>
          {t("Verify OTP")}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
