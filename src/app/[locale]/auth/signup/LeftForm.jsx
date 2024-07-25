"use client";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const LeftForm = () => {
  const [show, setShow] = useState(false);
  return (
    <form
      className={`m-0 flex flex-col items-center pl-20 h-[85.5vh] justify-center gap-2 max-w-full`}
    >
      <div className="self-stretch flex flex-row items-center justify-center py-[0rem] px-[1.25rem]">
        <Image
          className="h-[6.375rem] w-[6.375rem] relative rounded-81xl object-cover"
          loading="lazy"
          alt=""
          src="/svg/logo.svg"
        />
      </div>
      <b className="relative text-[2rem] leading-[2.5rem] font-bold text-neutral-800 text-center max-md:text-[1.625rem] max-md:leading-[2rem] max-sm:text-[1.188rem] max-sm:leading-[1.5rem]">
        Welcome!
      </b>

      <div className="self-stretch relative leading-[1.5rem] font-medium f text-neutral-600 text-center">
        Inserisci i tuoi dati per accedere alla piattaforma.
      </div>
      <div className="flex flex-col mt-y w-3/4 my-2">
        <div className="flex flex-col py-2 gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="px-2 py-3 border rounded-[10px] "
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-2 py-2 w-full">
          <label htmlFor="mblNumber">Mobile Number</label>
          <div className="flex rounded-[10px]">
            <select className="px-2 border-y border-l rounded-l-[10px]">
              <option value="+92">+92</option>
              <option value="+92">+92</option>
            </select>
            <input
              className="py-3 border-y border-r rounded-r-[10px] px-2 w-full"
              type="number"
              name="mblNumber"
              id="mblNumber"
              placeholder="343-6683-499"
            />
          </div>
        </div>
        <div className="flex flex-col py-2 gap-2">
          <label htmlFor="password">Password</label>
          <div className="relative w-full">
            <input
              className="px-2 py-3 border rounded-[10px] w-full transition-all"
              type={show ? "text" : "password"}
              name="password"
              id="password"
            />
            <img
              onClick={() => setShow(!show)}
              src="/svg/login/Eye.svg"
              className="absolute size-5 right-4 top-4 cursor-pointer transition-all"
            />
          </div>
        </div>
        <div className="flex py-2 justify-between">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="border accent-dark-blue size-4 rounded-[10px] "
              name="check"
              id="check"
            />
            <label htmlFor="check">Remember me</label>
          </div>
          <Link href="/login/forget">Forgot Password?</Link>
        </div>
        <button className="w-full bg-[#022c49] py-3 text-center text-white">Login</button>
      </div>
    </form>
  );
};

export default LeftForm;
