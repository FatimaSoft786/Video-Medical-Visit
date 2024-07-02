"use client";
import getPath from "@/utils/path";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdOutlineDateRange,
  MdPerson,
  MdPersonOutline,
} from "react-icons/md";
import { createUserSession, getUserSession } from "@/utils/session";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa";
import { useTranslations } from "next-intl";
const EditProfile = () => {
  const path = getPath();
  const { token, user } = getUserSession();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cvUrl, setCvUrl] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [profileImg, setProfileImg] = useState("/img/user.png");
  const t = useTranslations("DoctorProfile");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    specialist: "",
    postal_code: "",
    dob: "",
    sex: "",
    studies_end_year: "",
    studies_start_year: "",
    clinic_hospital_address: "",
    special_recognition: "",
  });

  useEffect(() => {
    if (user && user.user_details) {
      const userDetails = user.user_details;
      setProfileData(userDetails);
      setFormData({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        phoneNumber: userDetails.phoneNumber || "",
        specialist: userDetails.specialist || "",
        postal_code: userDetails.postal_code || "",
        dob:
          typeof userDetails.dob === "number"
            ? new Date(userDetails.dob).toISOString().split("T")[0]
            : userDetails.dob,
        sex: userDetails.sex || "",
        location: userDetails.location || "",
        studies_start_year: userDetails.studies_start_year || "",
        studies_end_year: userDetails.studies_end_year || "",
        clinic_hospital_address: userDetails.clinic_hospital_address || "",
        special_recognition: userDetails.special_recognition || " ",
      });
      setProfileImg(userDetails.picture_url || "/img/user.png");
    } else {
      console.error("No user details found in session");
    }
    setLoading(false);
  }, []);

  const handleSignature = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("signature", file);
    formData.append("doctorId", user.user_details._id);

    try {
      const response = await axios.post(
        "https://video-medical-backend-production.up.railway.app/api/user/uploadSignature",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Signature uploaded successfully!");
        const userDetails = response.data;
        createUserSession(token, userDetails);
        setSignatureUrl(userDetails.user_details.signature_url);
        setProfileData(userDetails);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading signature:", error);
      toast.error("Error uploading signature");
    }
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfileImg(URL.createObjectURL(file));

    const formDataImg = new FormData();
    if (file) {
      formDataImg.append("Id", user.user_details._id);
      formDataImg.append("profile", file);
      console.log(formDataImg);
    }
    try {
      const response = await axios.post(
        "https://video-medical-backend-production.up.railway.app/api/user/uploadProfilePicture",
        formDataImg,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formDataImg);
      if (response.data.success) {
        toast.success("Profile picture updated successfully!");
        const userDetailsResponse = await fetch(
          "https://video-medical-backend-production.up.railway.app/api/user/userDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userDetailsResponse.ok) {
          const userDetails = await userDetailsResponse.json();
          createUserSession(token, userDetails);
          setProfileData(userDetails);
        }
      } else {
        toast.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Error uploading profile picture");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      doctorId: user.user_details._id,
    };

    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/user/editDoctorProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        toast.success("Profile updated successfully!");

        const userDetailsResponse = await fetch(
          "https://video-medical-backend-production.up.railway.app/api/user/userDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(userDetailsResponse);
        if (userDetailsResponse) {
          const userDetails = await userDetailsResponse.json();
          createUserSession(token, userDetails);
          setProfileData(userDetails);
        }
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const handleDeletePhoto = async () => {
    setProfileImg("");
    if (user.user_details.pic_public_id === "") {
      toast.error("No User Image Found");
    } else {
      try {
        const response = await fetch(
          "https://video-medical-backend-production.up.railway.app/api/user/deletePicture",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_id: user.user_details.pic_public_id,
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            toast.success("Profile picture deleted successfully!");

            const userDetailsResponse = await fetch(
              "https://video-medical-backend-production.up.railway.app/api/user/userDetails",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (userDetailsResponse.ok) {
              const userDetails = await userDetailsResponse.json();
              createUserSession(token, userDetails);
              setProfileData(userDetails);
            } else {
              toast.error("Failed to fetch user details");
            }
          } else {
            toast.error("Failed to delete profile picture");
          }
        } else {
          toast.error("Failed to delete profile picture");
        }
      } catch (error) {
        console.error("Error deleting profile picture:", error);
        toast.error("Error deleting profile picture");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 my-8">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center justify-start gap-12">
            <div className="rounded-full bg-gray-300 h-36 w-36"></div>
            <div className="flex flex-col gap-4">
              <div className="h-10 bg-gray-300 w-32 rounded"></div>
              <div className="h-10 bg-gray-300 w-32 rounded"></div>
            </div>
          </div>
          <div className="flex space-x-4  max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4">
            <div className="w-1/2  max-sm:w-full h-12 bg-gray-300 rounded"></div>
            <div className="w-1/2  max-sm:w-full h-12 bg-gray-300 rounded"></div>
          </div>
          <div className="flex space-x-4  max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4">
            <div className="w-1/2  max-sm:w-full h-12 bg-gray-300 rounded"></div>
            <div className="w-1/2  max-sm:w-full h-12 bg-gray-300 rounded"></div>
          </div>
          <div className="flex space-x-4  max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4">
            <div className="w-1/2  max-sm:w-full h-12 bg-gray-300 rounded"></div>
            <div className="w-1/2  max-sm:w-full h-12 bg-gray-300 rounded"></div>
          </div>
          <div className="flex space-x-4  max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4">
            <div className="w-1/2  max-sm:w-full h-12 bg-gray-300 rounded"></div>
            <div className="w-1/2  max-sm:w-full h-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 my-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex max-sm:flex-col flex-wrap max-sm:mb-4 items-center justify-start gap-4 md:gap-12">
          <div className="relative mb-8 max-sm:mb-4">
            <Image
              src={
                user.user_details.picture_url
                  ? user.user_details.picture_url
                  : user.user_details.default_picture_url
              }
              alt="Profile"
              radius="full"
              className="size-36 border-2 p-1 rounded-full object-cover"
            />
            <input type="file" className="hidden" {...getInputProps()} />
          </div>
          <div className="flex flex-col gap-4 max-sm:mb-4">
            <button
              type="button"
              className="px-6 py-2 bg-dark-blue text-white rounded"
              onClick={() =>
                document.querySelector("input[type='file']").click()
              }
            >
              {t("Change Photo")}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-transparent border border-red-600 text-red-600 rounded"
              onClick={handleDeletePhoto}
            >
              {t("Delete Photo")}
            </button>
          </div>
        </div>

        <div className="flex space-x-4 max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          {/* First Name Input */}
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("FirstName")}
            </label>
            <MdPerson className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full pl-10 px-4 py-2 border rounded"
            />
          </div>
          {/* Last Name Input */}
          <div className="w-1/2 relative max-sm:w-full">
            <label className="block text-black font-bold mb-1">
              {t("LastName")}
            </label>
            <MdPersonOutline className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full pl-10 px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div className="flex space-x-4 max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Email Address")}
            </label>
            <MdEmail className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 px-4 py-2 border rounded"
            />
          </div>
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("PhoneNumber")}
            </label>
            <MdPhone className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full pl-10 px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div className="flex space-x-4 max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Location")}
            </label>
            <MdLocationOn className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full pl-10 px-4 py-2 border rounded"
            />
          </div>
          {/* Postal Code Input */}
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Postal Code")}
            </label>
            <MdLocationOn className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full pl-10 px-4 py-2 border rounded"
            />
          </div>
        </div>
        <div className="flex space-x-4 max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Specialties")}
            </label>
            <input
              type="text"
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Special Recognition")}
            </label>
            <input
              type="text"
              name="special_recognition"
              value={formData.special_recognition}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
        <div className="flex space-x-4 max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Year Of Study")}
            </label>
            <input
              type="text"
              name="studies_start_year"
              value={formData.studies_start_year}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Year Of Study")}
            </label>
            <input
              type="text"
              name="studies_end_year"
              value={formData.studies_end_year}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div className="flex space-x-4 max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Dob")}
            </label>
            <MdOutlineDateRange className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full pl-10 px-4 py-2 border rounded"
            />
          </div>
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Sex")}
            </label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Male">{t("Male")}</option>
              <option value="Female">{t("Female")}</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4 max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              {t("Office And Hospital Address")}
            </label>
            <input
              type="text"
              name="clinic_hospital_address"
              value={formData.clinic_hospital_address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        <br />

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="w-fit py-2 px-4 bg-dark-blue text-white rounded"
          >
            {t("Save Change")}
          </button>
        </div>
        <hr />
        <div className="flex space-x-4 max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          {/* <div className="flex flex-col w-1/2">
            <label className="font-bold text-lg text-primary-color">
              Digital Signature
            </label>
            <img
              className="size-24 object-cover"
              src={
                profileData.signature_url
                  ? profileData.signature_url
                  : signatureUrl
              }
              alt="signature"
            />
            <div className="flex relative mt-1">
              <input
                type="file"
                onChange={handleSignature}
                className="w-full py-2 cursor-pointer h-full absolute opacity-0 border rounded px-2"
              />
              <button className="w-fit cursor-pointer py-2 px-4 bg-dark-blue text-white rounded">
                Change{" "}
              </button>
            </div>
          </div> */}
          {/* <div className="flex flex-col w-1/2">
            <label className="font-bold text-lg text-primary-color">Cv</label>
            <Link
              href={user.user_details.doctor_cv_url}
              target="_blank"
              className="flex flex-col gap-2"
            >
              {" "}
              <FaFilePdf className="size-20 object-cover" src="" />{" "}
              <span className="w-fit cursor-pointer py-2 px-4 bg-dark-blue text-white rounded">
                {t("View now")}
              </span>
            </Link>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
