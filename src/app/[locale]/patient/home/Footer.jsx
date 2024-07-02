"use client";
import getPath from "@/utils/path";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const path = getPath();
  //   year
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#00528A] px-8 py-10 flex flex-col text-white text-sm">
      <div className="flex max-md:flex-col">
        <div className="flex flex-col max-md:w-full max-md:justify-center max-md:text-center max-md:items-center gap-4 w-[20%]">
          <Image
            src="/svg/logo.svg"
            className="size-20"
            alt="Logo"
            radius="full"
          />
          <p className="mb-6 text-xs">
            Medical Video Visit è un marchio di proprietà di HCLINC SRL, Via
            Polveriera n.49 95030 Mascalucia (CT), Aut. San. n.40676/DP del
            27/01/2021 rilasciata dall’Azienda Sanitaria Provinciale di Catania.
          </p>
          <div className="flex gap-3 py-6">
            <Link href="https://www.facebook.com" target="_blank">
            <FaFacebook size={20} />
            </Link>
            <Link href="https://twitter.com" target="_blank">
            <FaTwitter size={20} />
            </Link>
            <Link href="https://www.linkedin.com" target="_blank">
            <FaLinkedin size={20} />
            </Link>
          </div>
        </div>
        <div className="flex justify-evenly max-md:flex-col max-md:text-center max-md:w-full pl-24 max-md:pl-0 w-[80%] gap-2">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">Pages</h1>
            <Link href={`/${path}/patient/terms`}>Terms & Condition</Link>
            <Link href={`/${path}/patient/privacy`}>Privacy Policy</Link>
          </div>
          <div className="flex flex-col text-lg gap-4">
            <h1 className="font-bold text-sm">Book Now</h1>
            <Link className="text-sm" href={`/${path}/patient/appointment`}>
              Appointment
            </Link>
          </div>
          <div className="flex flex-col gap-4 text-lg">
            <h1 className="font-bold">Contact Us</h1>
            <Link href={`/${path}/patient/terms`} className="text-sm">
              Via Polveriera,49, 95030 Mascalucia (CT)
            </Link>
            <Link target="_blank" href="tel:+393516966904" className="text-sm">
              +39 3516966904
            </Link>
            <Link
              target="_blank"
              href="mailto:info@medicalvideovisit.com"
              className="text-sm"
            >
              info@medicalvideovisit.com
            </Link>
          </div>
        </div>
      </div>
      <hr className="px-8 my-4" />
      <div className="text-center pt-5">
        Copyright@{year}{" "}
        <span className="font-bold pl-2">Medical Video Visit</span>
      </div>
    </footer>
  );
};

export default Footer;
