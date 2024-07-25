"use client";
import React, { useRef } from "react";

const container = "flex flex-col items-center";
const form = "w-full max-w-md";
const inputClass =
  "w-full mb-4 size-12 text-center border rounded-lg focus:outline-none focus:border-black";
const buttonClass = "w-full bg-dark-blue text-white p-3 rounded";

const VerifyOtp = ({ onOtpVerified }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((ref) => ref.current.value).join("");
    onOtpVerified();
  };

  return (
    <div className={container}>
      <form className={form} onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-bold mb-4">
          {" "}
          OTP Authentication
        </h2>
        <p className="mb-8  text-dark-gray text-center">
          Please enter the four digit verification code we have sent to{" "}
          <span className="font-bold text-dark-blue">
            on your number 43895389443
          </span>
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
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
