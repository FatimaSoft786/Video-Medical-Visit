"use client";

import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import RightSilder from "@/app/components/RightSilder";
import getPath from "@/utils/path";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const container = "flex flex-wrap min-h-screen";
const formContainer =
  "w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8";
const form = "w-full max-w-md flex flex-col justify-center h-[88.5vh] relative";
const inputClass =
  "!w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500";
const buttonClass = `w-full bg-dark-blue text-white p-3 rounded-lg font-bold hover:bg-opacity-80 transition duration-300 `;
const sliderContainer = "w-full md:w-1/2 h-screen max-md:hidden";

const SignupPage = () => {
  const t = useTranslations("SignUp");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "patient",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const path = getPath();

  const validateForm = () => {
    const formErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        formErrors[key] = `Please enter your ${
          key === "email" ? "email address" : key
        }.`;
      } else if (key === "email" && !/\S+@\S+\.\S+/.test(formData[key])) {
        formErrors[key] = "Please enter a valid email address.";
      } else if (
        key === "phoneNumber" &&
        (isNaN(formData[key]) || formData[key].length < 10)
      ) {
        formErrors[key] = "Please enter a valid digit phone number.";
      }
    }
    return formErrors;
  };

  const handlePatientSubmit = async () => {
    const patientData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      role: "Patient",
    };

    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem("token", data.token);
          console.log(data);
          toast.success("Sign up successful");
          router.push(`/${path}/auth/otpVerify`);
        } else {
          toast.error(data.message || "Failed to sign up");
        }
      } else {
        toast.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(
        "An error occurred while trying to sign up. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDoctorSubmit = async () => {
    const doctorData = {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email,
      password: formData.password || "",
      phoneNumber: formData.phoneNumber,
      role: "Doctor",
      sex: "",
      location: "",
      dob: "",
      postal_code: "",
      studies_start_year: "",
      studies_end_year: "",
      special_recognition: "",
      specialist: "",
      clinic_hospital_address: "",
      about: "",
      education: "",
      university: "",
      experience: "",
    };

    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", formData.email);
          toast.success(data.message);
          router.push(`/${path}/${data.role.toLowerCase()}`);
        } else {
          toast.error(data.message || "Failed to sign up");
        }
      } else {
        toast.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(
        "An error occurred while trying to sign up. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTimeout(() => {
        setErrors({});
      }, 4000);
      setIsSubmitting(false);
      return;
    }

    if (formData.role.toLowerCase() === "patient") {
      handlePatientSubmit();
    } else {
      handleDoctorSubmit();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function Modal({ opener }) {
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

    const handleUserTypeChange = (e) => {
      setFormData((prevData) => ({ ...prevData, role: e.target.value }));
    };

    return (
      <div className="">
        <button onClick={() => setIsOpen(!isOpen)} className={buttonClass}>
          {opener}
        </button>
        <motion.div>
          <motion.div
            className={`z-[99] ${
              isOpen ? "" : "hidden"
            } fixed top-0 right-0 flex justify-center items-center w-full h-screen bg-black/30 px-2`}
          >
            <motion.div
              className={`z-[999] ${
                isOpen ? "" : "hidden"
              } w-[500px] max-sm:w-full h-fit py-8 rounded-lg bg-white p-4`}
            >
              <h1 className="text-2xl font-bold py-2 text-center">
                {t("Who you are?")}
              </h1>
              <p className="text-center mb-6">
                {t(
                  "We need to determine your role. This will help us to build a reliable system together."
                )}
              </p>
              <label htmlFor="userType" className="!text-left text-light-gray">
                {t("Select User Type")}
              </label>
              <select
                id="userType"
                name="userType"
                className="w-full border-b-2 pb-1 mb-6"
                value={formData.role}
                onChange={handleUserTypeChange}
              >
                <option value="patient">{t("Patient")}</option>
                <option value="doctor">{t("Doctor")}</option>
              </select>
              <Link
                href={`/${params.locale}/auth/forgetPassword`}
                className="py-2"
              >
                {t("Forget Password?")}
              </Link>
              <div className="flex justify-end pt-4 gap-6">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className=" bg-light-gray text-white px-12 py-3 rounded"
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSubmit();
                  }}
                  type="button"
                  className=" bg-dark-blue text-white px-12 py-3 rounded"
                >
                  {t("Next")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  useEffect(() => {
    document.title = `${t("Sign up")} | ${t("Medical Appointment")}`;
  }, [t]);

  return (
    <div className={container}>
      <div className={formContainer}>
        <div className={form}>
          <div className="flex items-center justify-center pb-4">
            <Image src={`/svg/logo.svg`} size={56} className="w-fit" />
          </div>
          <h2 className="text-3xl text-center font-bold mb-1">
            {t("Welcome")}
          </h2>
          <p className="mb-8 text-center">
            {t("Enter your details to access the platform.")}
          </p>
          <div className="flex gap-2">
            <div className="w-full">
              <input
                type="text"
                placeholder={t("First Name")}
                className={`${inputClass} ${
                  errors.firstName && "border-red-500"
                }`}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs py-2">{errors.firstName}</p>
              )}
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder={t("Last Name")}
                className={`${inputClass} ${
                  errors.lastName && "border-red-500"
                }`}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs py-2">{errors.lastName}</p>
              )}
            </div>
          </div>
          <input
            type="email"
            placeholder={t("Email")}
            className={`${inputClass} ${errors.email && "border-red-500"}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs py-2">{errors.email}</p>
          )}
          <div className="flex relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("Password")}
              className={`${inputClass} ${errors.password && "border-red-500"}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs py-2">{errors.password}</p>
          )}
          <input
            type="text"
            placeholder={t("Phone number")}
            className={`${inputClass} ${
              errors.phoneNumber && "border-red-500"
            }`}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs py-2">{errors.phoneNumber}</p>
          )}
          <Modal opener={t("Next")} />
        </div>
      </div>
      <div className={sliderContainer}>
        <RightSilder />
      </div>
    </div>
  );
};

export default SignupPage;
