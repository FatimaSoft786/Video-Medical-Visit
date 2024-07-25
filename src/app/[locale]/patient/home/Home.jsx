"use client";
import React from "react";
import MedicalSection from "../components/MedicalSection";
import SliderSection from "./SliderSec";
import Footer from "./Footer";
import TestimonialsSlider from "./Testimonials";
import { Image } from "@nextui-org/react";
const GridIcon = [
  {
    icon: "/patient/home/gridicon1.svg",
    title: "Psicologia",
  },
  {
    icon: "/patient/home/gridicon2.svg",
    title: "Dermatologia",
  },
  {
    icon: "/patient/home/gridicon3.svg",
    title: "Pediatria",
  },
  {
    icon: "/patient/home/gridicon4.svg",
    title: "Odontoiatria",
  },
  {
    icon: "/patient/home/gridicon5.svg",
    title: "Medicina del lavoro",
  },
  {
    icon: "/patient/home/gridicon6.svg",
    title: "Medicina dello Sport",
  },
  {
    icon: "/patient/home/gridicon7.svg",
    title: "Oftalmologia",
  },
];

const Home = () => {
  return (
    <div className="overflow-hidden">
      <title>Home | A Doctor's Appointment</title>
      <MedicalSection />
      <div className="flex py-12 container gap-6 mx-auto px-12 flex-col items-center justify-center">
        <h1 className="text-4xl max-sm:text-2xl mb-12 font-bold text-center text-dark-blue">
          Cerca il tuo Medico per Specializzazione
        </h1>
        <div className="grid grid-cols-4 max-sm:grid-cols-3 place-content-center gap-10 max-lg:gap-8 max-md:gap-4 max-sm:gap-0 items-center justify-center flex-row">
          {GridIcon.map((icon) => (
            <div
              id="home-grid-icons"
              className="flex flex-shrink flex-col flex-wrap items-center justify-center gap-2 max-sm:gap-4 mb-2"
            >
              <div className="p-4 bg-dark-blue rounded-full">
                <img src={icon.icon} className="size-12 max-sm:size-6" />
              </div>
              <h1 className="text-lg max-sm:text-sm max-sm:px-2">
                {icon.title}
              </h1>
            </div>
          ))}
        </div>
        <h1 className="text-4xl max-sm:text-2xl mt-4 mb-12 font-bold text-center text-dark-blue">
          La nostra Piattaforma
        </h1>
        <div className="grid-cols-3 max-md:px-6 max-md:grid-cols-1 max-lg:grid-cols-2 grid place-content-between px-16 gap-8 py-8">
          <div className="h-fit bg-[#BDD2E1] rounded-3xl p-3 w-full py-6  flex flex-col items-center justify-between">
            <Image src="/patient/home/card1.svg" className="size-48  pt-12" />
            <div className="flex-col text-center flex mt-8 gap-2">
              <h1 className="text-xl font-bold">Monitoraggio costante</h1>
              <p className="">
                Attraverso le tue app, la nostra piattaforma ti garantirà un
                controllo continuo della tua salute, con cure personalizzate,
                professionalità e la grande passione dei nostri Specilisti.
              </p>
            </div>
          </div>
          <div className="h-fit bg-dark-blue text-white rounded-3xl p-3 w-full py-6  flex flex-col items-center justify-between">
            <Image src="/patient/home/card2.svg" className="size-48  pt-12" />
            <div className="flex-col text-center flex mt-8 gap-2">
              <h1 className="text-xl font-bold">Cure a portata di click</h1>
              <p className="">
                Con la telemedicina, il consulto medico arriva dove sei tu.
                Dimentica viaggi e attese: ora l'assistenza sanitaria è
                immediata e diretta, ovunque tu sia.
              </p>
            </div>
          </div>
          <div className="h-fit bg-[#BDD2E1]  rounded-3xl p-3 w-full py-6 max-md:py-2 flex flex-col items-center justify-between">
            <Image src="/patient/home/card3.svg" className="size-48 pt-12" />
            <div className="flex-col text-center flex mt-8 gap-2">
              <h1 className="text-xl font-bold">Addio alle sale d’Attesa</h1>
              <p className="">
                Prenota una visita, parla con il medico e ottieni tutte le
                risposte che cerchi. Risparmia tempo prezioso e costi ulteriori,
                godendoti l'assistenza sanitaria dal comfort di casa tua.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#BDD2E1]">
        <SliderSection />
      </div>
      <div className="text-center py-16 flex flex-col gap-4">
        <h2 className="font-bold text-3xl font-mono">
          Come Funziona la nostra Piattaforma?
        </h2>
        <h1 className="font-bold text-4xl">
          Tutto ciò di cui hai bisogno è a portata di click!
        </h1>
        <div className="flex w-full h-[80vh] justify-evenly max-lg:mt-6">
          <div className="flex w-1/2 justify-center max-sm:hidden">
            <img src="/patient/home/sideleft.svg" className="w-fit" />
          </div>
          <div className="flex items-center justify-center flex-col w-1/2 max-sm:w-full mt-8 px-8">
            <div classNamr="flex gap-2 flex-col  gap-4 items-start justify-start">
              <img src="/patient/home/siderighticon.svg" className="w-18 " />
              <h1 className="text-2xl font-bold mt-2 text-left">
                Prenota il tuo Appuntamento in 3 semplici passi{" "}
              </h1>
              <div className=" flex flex-col gap-4 py-5 pr-12 text-left">
                <div className="flex gap-3">
                  <img src="/patient/home/tick.svg" className="w-6" />
                  <p className="text-light-gray">
                    Seleziona lo Specialista che preferisci ricercando per nome
                    o specializzazone
                  </p>
                </div>
                <div className="flex gap-3">
                  <img src="/patient/home/tick.svg" className="w-6" />
                  <p className="text-light-gray">
                    Consulta la sua Agenda e scegli l’appuntamento che più si
                    adatta alle tue esigenze
                  </p>
                </div>
                <div className="flex gap-3">
                  <img src="/patient/home/tick.svg" className="w-6" />
                  <p className="text-light-gray">
                    Paga con un click e attendi il giorno del Consulto!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialsSlider />
      <Footer />
    </div>
  );
};

export default Home;
