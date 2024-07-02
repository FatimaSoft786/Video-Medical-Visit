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

const EditProfile = () => {
  const path = getPath();
  const { token, user } = getUserSession();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState("/img/user.png");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    postal_code: "",
    dob: "",
    sex: "",
  });

  useEffect(() => {
    if (user && user.user_details) {
      const userDetails = user.user_details;
      setProfileData(userDetails);
      setFormData({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        phone: userDetails.phoneNumber || "",
        location: userDetails.location || "",
        postal_code: userDetails.postal_code || "",
        dob: userDetails.dob
          ? new Date(userDetails.dob).toISOString().split("T")[0]
          : "",
        sex: userDetails.sex || "Male",
      });
      setProfileImg(userDetails.picture_url || "/img/user.png");
    } else {
      console.error("No user details found in session");
    }
    setLoading(false);
  }, []);

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
      patientId: profileData._id,
    };

    try {
      const response = await axios.post(
        "https://video-medical-backend-production.up.railway.app/api/user/editPatientProfile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
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

        if (userDetailsResponse.ok) {
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
    if (confirm("Are you sure you want to delete the image?")) {
      setProfileImg("/img/user.png");

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

        if (response.success === true) {
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
      <Toaster />
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
              Change Photo
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-transparent border border-red-600 text-red-600 rounded"
              onClick={handleDeletePhoto}
            >
              Delete Photo
            </button>
          </div>
        </div>
        <div className="flex space-x-4  max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              First Name
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
          <div className="w-1/2 relative max-sm:w-full">
            <label className="block text-black font-bold mb-1">Last Name</label>
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
        <div className="flex space-x-4  max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2  max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">Email</label>
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
          <div className="w-1/2  max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">Phone</label>
            <MdPhone className="absolute top-1/2 left-3 transform mt-3 -translate-y-1/2 text-black" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full pl-10 px-4 py-2 border rounded"
            />
          </div>
        </div>
        <div className="flex space-x-4  max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2  max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">Location</label>
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
          <div className="w-1/2  max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              Postal Code
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
        <div className="flex space-x-4  max-sm:space-x-0 max-sm:gap-4 mb-1 pb-4 max-sm:flex-col">
          <div className="w-1/2  max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">
              Date of Birth
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
          <div className="w-1/2  max-sm:w-full relative">
            <label className="block text-black font-bold mb-1">Gender</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <br />
        <div className="flex items-center justify-between">
          <Link
            href={`/${path}/patient/profile/anamnesi`}
            className="my-6 bg-light-gray px-4 py-2 rounded active:scale-90 transition-all duration-250 active:opacity-90 hover:bg-black/30"
          >
            Change anamnesi
          </Link>
          <button
            type="submit"
            className="w-fit py-2 px-4 bg-dark-blue text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
