"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import getPath from "@/utils/path";
import RightSilder from "@/app/components/RightSilder";
import { toast } from "react-hot-toast";
import { createUserSession, clearUserSession } from "@/utils/session";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations("Login");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const path = getPath();

  clearUserSession();

  const validateForm = () => {
    const errors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Inserisci un indirizzo email valido";
    }
    if (!password) {
      errors.password = "nserisci la tua password";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTimeout(() => {
        setErrors({});
      }, 4000);
      return;
    }
    try {
      const response = await fetch(
        `https://video-medical-backend-production.up.railway.app/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(`${t("Login Successful")}`);
          const { accessToken, role, account_approved } = data;
          if (!account_approved) {
            router.push(`/${path}/auth/emailverify`);
            return;
          }
          const userDetailsResponse = await fetch(
            `https://video-medical-backend-production.up.railway.app/api/user/userDetails`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (userDetailsResponse.ok) {
            const userDetails = await userDetailsResponse.json();
            createUserSession(accessToken, userDetails);

            switch (role) {
              case "Patient":
                router.push(`/${path}/patient`);
                break;
              case "Doctor":
                router.push(`/${path}/doctor`);
                break;
              case "Admin":
                router.push(`/${path}/admin`);
                break;
              default:
                toast.error(`${t("Unknown role")}`);
            }
          } else {
            toast.error(`${t("Failed to fetch user details.")}`);
          }
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error(`${t("Failed to log in.Please check your credentials.")}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        `${t("An error occurred while trying to log in. Please try again.")}`
      );
    }
  };

  useEffect(() => {
    document.title = `${t("title")} | Medical Appointment`;
  }, [t]);
  return (
    <div className="flex flex-wrap min-h-screen">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center max-md:w-full">
        <form
          className="w-full max-w-md flex flex-col justify-center h-[88.5vh] relative"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center justify-center pb-4  transition-all duration-300">
            <Image src={`/svg/logo.svg`} size={56} className=" w-fit" />
          </div>
          <h2 className="text-3xl text-center font-bold mb-1">
            {t("Welcome")}
          </h2>
          <p className="mb-8 text-center">
            {t("Enter you details to acess the platform")}
          </p>
          <input
            type="email"
            placeholder={t("Email")}
            className="w-full p-3 mb-4 border rounded-lg"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 py-2 transition-all duration-300">
              {errors.email}
            </p>
          )}
          <div className="flex relative">
            <input
              type={show ? "text" : "password"}
              placeholder={t("Password")}
              name="password"
              className="w-full p-3 mb-4 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaEye
              onClick={() => setShow(!show)}
              className="absolute cursor-pointer right-4 m-auto top-4"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 py-2  transition-all duration-300">
              {errors.password}
            </p>
          )}
          <div className="flex justify-end items-center mb-4">
            <Link
              href={`/${path}/auth/forgetPassword`}
              className="text-dark-blue"
            >
              {t("Forgot Password?")}
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-dark-blue text-white p-3 rounded"
          >
            {t("Login")}
          </button>
          <div className="text-center mx-auto mt-4 flex flex-col">
            <Link href={`/${path}/auth/signup`} className="group gap-2">
              {t("Don't have an account?")}{" "}
              <span className="font-bold group-hover:underline">
                {t("Sign up")}
              </span>
            </Link>
            <Link
              href={`/${path}/auth/signup/doctor`}
              className="text-center my-4 hover:opacity-80"
            >
              {t("Don't have an account as doctor?")} <b>{t("Sign up")}</b>
            </Link>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2 h-screen max-md:hidden">
        <RightSilder />
      </div>
    </div>
  );
};

export default LoginPage;
