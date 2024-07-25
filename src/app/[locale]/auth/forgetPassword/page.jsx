"use client";
import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import { toast, Toaster } from "react-hot-toast";
import VerifyOtp from "./VerifyOtp";
import ChangePassword from "./ChangePassword";
import RightSilder from "@/app/components/RightSilder";
import { useTranslations } from "next-intl";

const container = "flex flex-wrap min-h-screen justify-center items-center";
const formContainer =
  "w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8";
const form = "w-full max-w-md";
const inputClass = "w-full p-3 mb-4 border rounded-lg";
const buttonClass = "w-full bg-dark-blue text-white p-3 rounded";

const ForgetPage = () => {
  const t = useTranslations("Forget");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [id, setId] = useState("");

  useEffect(() => {
    document.title = `${t("Forget Password")} | Medical Appointment`;
  }, []); // Empty dependency array ensures this effect runs only once

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/user/checkEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (response.ok) {
        setStep(2);
        toast.success(t("Please check your email, a code has been sent"));
      } else {
        toast.error(t("Error verifying email"));
      }
    } catch (error) {
      console.error(`${t("Error")}`, error);
      toast.error(t("Error verifying email"));
    }
  };

  const handleOtpVerified = (verifiedId) => {
    setId(verifiedId);
    setStep(3);
  };

  const sliderContainer = "w-full md:w-1/2 h-screen max-md:hidden";

  return (
    <div className={container}>
      <Toaster />
      <div className={formContainer}>
        {step === 1 && (
          <form className={form} onSubmit={handleEmailSubmit}>
            <div className="flex items-center justify-center pb-4">
              <Image src={`/svg/logo.svg`} size={56} className="w-fit" />
            </div>
            <h2 className="text-3xl text-center font-bold mb-1">
              {t("Forget Password")}
            </h2>
            <p className="mb-8 text-center">
              {t(
                "Dont worry we can help out if you still remember your email address you can quickly reset your password"
              )}
              .
            </p>
            <input
              type="email"
              placeholder="Example@example.com"
              className={inputClass}
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={buttonClass}>
              {t("Request Password Change")}
            </button>
          </form>
        )}
        {step === 2 && <VerifyOtp email={email} setId={handleOtpVerified} />}
        {step === 3 && <ChangePassword id={id} email={email} />}
      </div>
      <div className={sliderContainer}>
        <RightSilder />
      </div>
    </div>
  );
};

export default ForgetPage;
