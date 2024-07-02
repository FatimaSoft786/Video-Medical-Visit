"use client";
import React, { useEffect, useState } from "react";

import getPath from "@/utils/path";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdOutlineDateRange,
  MdPerson,
  MdPersonOutline,
} from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const DoctorSignUp = () => {
  const t = useTranslations("Doctor Sign up");
  const path = getPath();
  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState("/img/user.png");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    setSelectedFile(file);
    setProfileImg(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [selectSex, setSelectedSex] = useState("");

  const handleSelectedSex = (event) => {
    setSelectedSex(event.target.value);
  };

  const [selectSpecialist, setSelectSpecialist] = useState("");
  const handleSpecialistChange = (event) => {
    setSelectSpecialist(event.target.value);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (selectSex === "") {
      toast.error("Please select option from the sex");
    } else if (selectSpecialist === "") {
      toast.error("Please select option from the specialist");
    } else if (fileName === "") {
      toast.error("Please select file");
    } else {
      toast.success("Please wait your information is uploading on the server");
      const formData = new FormData();
      formData.append("cv", selectedFile);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("dob", data.dob);
      formData.append("location", data.location);
      formData.append("postal_code", data.postalCode);
      formData.append("sex", selectSex);
      formData.append("studies_start_year", data.studies_start_year);
      formData.append("role", "Doctor");
      formData.append("studies_end_year", data.studies_end_year);
      formData.append("special_recognition", data.special_recognition);
      formData.append("specialist", selectSpecialist);
      formData.append("clinic_hospital_address", data.clinic_hospital_address);
      formData.append("about", "Testing description");
      formData.append("education", "Not provided");
      formData.append("university", "Not provided");
      formData.append("experience", "Not provided");

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(
          "https://video-medical-backend-production.up.railway.app/api/user/signup",
          formData,
          config
        )
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          reset();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <div className="container mx-auto p-4 my-12">
      <title>Doctor | Signup</title>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-12">
        {/* <div className="flex items-center justify-start gap-12">
          <div className="relative mb-8">
            <img
              src={profileImg}
              alt="Profile"
              className="size-36 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="px-6 py-2 bg-dark-blue text-white rounded"
              onClick={() =>
                document.querySelector("input[type='file']").click()
              }
            >
              Change Photo
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-transparent border border-red-600 text-red-600 rounded"
              onClick={() => confirm("Are you sure you want to delete image")}
            >
              Delete Photo
            </button>
          </div>
        </div> */}
        <Link
          href={`/${path}/auth/signin`}
          className="active:scale-90 top-0 hover:opacity-90 absolute transition-all duration-300 hover:text-black/80"
        >
          <FaArrowLeft className="my-6 text-2xl " />
        </Link>
        <h1 className="text-4xl max-sm:text-2xl font-bold my-3">
          {t("Signup as Doctor")}
        </h1>
        <p className="mb-12">{t("Fill the form to get started")}</p>
        <div className="flex space-x-4 pb-4">
          <div className=" w-1/2 flex flex-col">
            <div className="w-full relative">
              <label className="block text-black font-bold mb-1">
                {t("First Name")}
              </label>
              <MdPerson className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
              <input
                type="text"
                name="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full pl-10 px-4 py-2 border rounded"
              />
            </div>
            {errors.firstName && (
              <p className=" text-pure-red">{errors.firstName.message}</p>
            )}
          </div>

          <div className=" flex flex-col w-1/2">
            <div className="w-full relative">
              <label className="block text-black font-bold mb-1">
                {t("Last Name")}{" "}
              </label>
              <MdPersonOutline className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
              <input
                type="text"
                name="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className="w-full pl-10 px-4 py-2 border rounded"
              />
            </div>
            {errors.lastName && (
              <p className=" text-pure-red">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className=" flex flex-col w-1/2">
            <div className="relative w-full">
              <label className="block text-black font-bold mb-1">
                {t("Email Address")}
              </label>
              <MdEmail className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "email is not valid",
                  },
                })}
                className="w-full pl-10 px-4 py-2 border rounded"
              />
            </div>
            {errors.email && (
              <p className=" text-pure-red">{errors.email.message}</p>
            )}
          </div>
          <div className=" flex flex-col w-1/2">
            <div className="w-full relative">
              <label className="block text-black font-bold mb-1">
                {t("Phone Number")}
              </label>
              <MdPhone className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
              <input
                type="text"
                name="phone"
                {...register("phoneNumber", {
                  required: "phone number is required",
                })}
                className="w-full pl-10 px-4 py-2 border rounded"
              />
            </div>
            {errors.phoneNumber && (
              <p className=" text-pure-red">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4 pb-4">
          <div className=" flex flex-col w-1/2">
            <div className="w-full relative">
              <label className="block text-black font-bold mb-1">
                {t("Location")}
              </label>
              <MdLocationOn className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
              <input
                type="text"
                name="location"
                {...register("location", {
                  required: "location is required",
                })}
                className="w-full pl-10 px-4 py-2 border rounded"
              />
            </div>
            {errors.location && (
              <p className=" text-pure-red">{errors.location.message}</p>
            )}
          </div>
          <div className="w-1/2 relative">
            <label className="block text-black font-bold mb-1">
              {t("Postal Code")}
            </label>
            <input
              type="text"
              name="postalCode"
              {...register("postal_code", {
                required: "postal code is required",
              })}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.postal_code && (
              <p className=" text-pure-red">{errors.postal_code.message}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4 pb-4">
          <div className=" flex flex-col w-1/2">
            <div className="relative w-full">
              <label className="block text-black font-bold mb-1">
                {t("Sex")}
              </label>
              <select
                name="gender"
                {...register("sex", {
                  required: "select sex",
                })}
                value={selectSex}
                onChange={handleSelectedSex}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="Option">{t("Select Option")}</option>
                <option value="Male">{t("Male")}</option>
                <option value="Female">{t("Female")}</option>
              </select>
            </div>
            {errors.sex && (
              <p className=" text-pure-red">{errors.sex.message}</p>
            )}
          </div>

          <div className=" flex flex-col w-1/2">
            <div className=" w-full relative">
              <label className="block text-black font-bold mb-1">
                {t("Date Of Birth")}
              </label>
              <MdOutlineDateRange className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
              <input
                type="date"
                name="dob"
                {...register("dob", {
                  required: "select the dob",
                })}
                className="w-full pl-10 px-4 py-2 border rounded"
              />
            </div>
            {errors.dob && (
              <p className=" text-pure-red">{errors.dob.message}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4 pb-4">
          <div className="w-1/2 flex flex-col">
            <div className="w-full relative">
              <label className="block text-black font-bold mb-1">
                {t("Year Of Study")}
              </label>
              <div className="border flex items-center rounded px-4 py-2">
                <input
                  type="date"
                  name="start"
                  {...register("studies_start_year", {
                    required: "enter your start and last study year",
                  })}
                  className="w-full appearance-none border-none outline-none"
                />
                <p className="text-black font-bold px-4 ">To</p>
                <input
                  type="date"
                  name="dob"
                  {...register("studies_end_year", {
                    required: "enter your last study year",
                  })}
                  className="w-full  appearance-none outline-none"
                />
              </div>
            </div>
            {errors.studies_start_year && (
              <p className=" text-pure-red">
                {errors.studies_start_year.message}
              </p>
            )}
          </div>
          <div className=" flex flex-col w-1/2">
            <div className="w-full relative">
              <label className="block text-black font-bold mb-1">
                {t("Special Recognition")}
              </label>
              {/* <img
              src="/doctor/download.svg"
              className="absolute top-1/2 right-3 transform mt-3 -translate-y-1/2 text-black"
            /> */}
              <input
                type="text"
                name="special Recoginition"
                {...register("special_recognition", {
                  required: "enter your special recognition",
                })}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            {errors.special_recognition && (
              <p className=" text-pure-red">
                {errors.special_recognition.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-4 pb-4">
          <div className="w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Office And Hospital Address")}
            </label>
            <div className="border flex items-center rounded px-4 py-2">
              <input
                type="text"
                name="address"
                {...register("clinic_hospital_address", {
                  required: "enter your hospital or clinic address",
                })}
                className="w-full appearance-none border-none outline-none"
              />
            </div>
            {errors.clinic_hospital_address && (
              <p className=" text-pure-red">
                {errors.clinic_hospital_address.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-4 pb-4">
          <div className="w-1/2 relative">
            <label className="block text-black font-bold mb-1">
              {t("Specialties")}
            </label>
            <div className=" flex items-center px-0 py-2">
              <select
                name="specialist"
                value={selectSpecialist}
                onChange={handleSpecialistChange}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="Option">Select option</option>
                <option value="Dermatologia">Dermatologia</option>
                <option value="Cardiologia">Cardiologia</option>
                <option value="Psicologia">Psicologia</option>
                <option value="Medicina dello Sport">
                  Medicina dello Sport
                </option>
                <option value="Fisiatria">Fisiatria</option>
                <option value="Diabetologia">Diabetologia</option>
              </select>
            </div>
          </div>
        </div>
        <label htmlFor="dropzone" className="text-xl font-bold text-black">
          {" "}
          {t("Upload Your CV")}
        </label>
        <div className="border-dashed mb-14 rounded-xl bg-light-gray/10 !py-8 border-4 p-8 border-dark-blue  ">
          <div
            {...getRootProps()}
            className=" text-center cursor-pointer flex flex-col items-center justify-center gap-3"
            style={{ height: "150px" }}
          >
            <input
              type="file"
              className="hidden"
              name="file"
              id="dropzone"
              {...getInputProps()}
            />
            <img
              src={`/patient/profile/dnd.svg`}
              className="text-gray-400 text-3xl !mt-8"
            />
            <p className="mt-2 text-lg font-bold">
              {t("Drag and drop files or Browse")}
            </p>
            <p className="text-black/80 mb-8">
              {fileName
                ? fileName
                : "Supported formats: Any image format, pdf, doc, docx, txt"}
            </p>
          </div>
        </div>
        <div
          //   href={/${path}/doctor/profile/anamnesi}
          className="flex float-end w-fit items-end my-5"
        >
          <button
            type="submit"
            className="bg-dark-blue text-white py-2 px-4 rounded"
          >
            {t("Save Change")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorSignUp;
