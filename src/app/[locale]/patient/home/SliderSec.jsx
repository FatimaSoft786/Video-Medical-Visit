"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderSection = () => {
  const slides = [
    { src: "/patient/home/slide1.svg", alt: "Doctor 1" },
    { src: "/patient/home/slide1.svg", alt: "Doctor 2" },
    { src: "/patient/home/slide1.svg", alt: "Doctor 3" },
    { src: "/patient/home/slide1.svg", alt: "Doctor 4" },
    { src: "/patient/home/slide1.svg", alt: "Doctor 5" },
  ];

  return (
    <div className="w-full relative">
      <div className="container py-20 relative px-6 md:px-12 mx-auto flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[60%] text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-dark-blue">
            Dedicati alla tua Salute e incontra i migliori Professionisti
          </h2>
          <div className="relative text-gray-700 max-md:hidden h-auto bg-contain bg-no-repeat text-center flex items-center w-full md:w-[80%] my-5 text-sm font-semibold rounded-4xl rounded-tr-none overflow-hidden">
            <p className="relative z-10 p-6 rounded-4xl bg-transparent rounded-tr-none md:pr-20">
              Nel nostro team, ogni medico è selezionato per la sua eccellenza
              professionale e dedizione al paziente. Siamo pronti ad ascoltare
              con attenzione per offrire una diagnosi accurata e trattamenti
              personalizzati, garantendoti l'accesso immediato a consulenze
              mediche di qualità, dove e quando ne hai bisogno. Affidati alla
              nostra esperienza per prenderti cura della tua salute in modo
              innovativo e conveniente!
            </p>
          </div>
          <div className="text-white w-full md:w-[80%] flex justify-center pt-2">
            <button className="w-fit py-3 px-9  bg-dark-blue rounded-3xl">
              Consulta i nostri Specialisti
            </button>
          </div>
        </div>
        <div className="w-full md:w-[40%] flex flex-col justify-end h-auto">
          <div className="w-full flex justify-end h-96 rounded-r-3xl rounded-l-[300px] overflow-hidden bg-white shadow-xl p-4 relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              loop
              pagination={{ clickable: true, el: ".custom-pagination" }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              className="w-full h-full overflow-hidden relative"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full rounded-lg h-full object-cover self-center border-rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-prev absolute top-1/2 z-20 left-6 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md cursor-pointer">
              <IoIosArrowBack className="w-6 h-6 text-dark-blue z-10" />
            </div>
            <div className="custom-next absolute top-1/2 z-20 right-6 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md cursor-pointer">
              <IoIosArrowForward className="w-6 h-6 text-dark-blue z-10" />
            </div>
          </div>
          <div className="custom-pagination !absolute bottom-12 z-10 !right-8"></div>
        </div>
        
      </div>
    </div>
  );
};

export default SliderSection;
