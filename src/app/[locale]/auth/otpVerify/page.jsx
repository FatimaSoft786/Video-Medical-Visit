"use client";
import RightSilder from "@/app/components/RightSilder";
import getPath from "@/utils/path";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const container = "flex flex-col items-center px-4";
const form = "w-full max-w-md";
const inputClass =
  "w-full mb-4 h-12 !w-12 text-center border rounded-lg focus:outline-none focus:border-black";
const buttonClass = "w-full bg-dark-blue text-white p-3 rounded";

const VerifyOtp = () => {
  const t = useTranslations("VerifyOtp");
  const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));
  const path = getPath();
  const router = useRouter();

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) && value.length <= 1) {
      inputRefs.current[index].current.value = value;
      if (index < inputRefs.current.length - 1 && value.length === 1) {
        inputRefs.current[index + 1].current.focus();
      }
    } else {
      e.target.value = "";
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
      if (response.ok) {
        toast.success(
          data.message + " " + t("Now You Can Login") ||
            t("OTP verified successfully!")
        );
        router.push(`/${path}/${data.role.toLowerCase()}`);
      }
    } catch (error) {
      toast.error(`${t("Error")}` + error.message);
    }
  };

  return (
    <div className="flex">
      <div className="flex w-1/2 items-center max-md:w-full justify-center min-h-screen">
        <div className={container}>
          <form className={form} onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-bold mb-4">
              {t("OTP Authentication")}
            </h2>
            <p className="mb-8 text-dark-gray text-center">
              {t(
                "Please enter the four digit verification code we have sent on your email"
              )}{" "}
              <span className="font-bold text-dark-blue">
                {t("on your email")}
              </span>
            </p>
            <div className="flex justify-evenly">
              {inputRefs.current.map((ref, index) => (
                <input
                  key={index}
                  type="text"
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
      </div>
      <div className="w-1/2 max-md:hidden">
        <RightSilder />{" "}
      </div>
    </div>
  );
};

export default VerifyOtp;
