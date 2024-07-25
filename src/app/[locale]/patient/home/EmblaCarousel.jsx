"use client";
import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaQuoteRight } from "react-icons/fa";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="embla !w-full">
      <div ref={emblaRef} className="embla__viewport">
        <div className="embla__container flex w-full">
          {slides.map((slide, index) => (
            <div
              className={`embla__slide py-6 flex flex-col items-start justify-center bg-light-gray rounded-lg mx-2 transition-transform duration-300 ${
                index === selectedIndex
                  ? "scale-100 opacity-100"
                  : "scale-40 opacity-50"
              }`}
              key={index}
            >
              <div className="flex flex-row items-start justify-between w-full px-8 max-md:flex-wrap">
                <img
                  className="h-[5rem] w-[5rem] mb-4 relative rounded-full object-cover z-1"
                  loading="lazy"
                  alt=""
                  src={slide.image}
                />
                <FaQuoteRight className="text-3xl rotate-180 transform translate-x-5" />
              </div>
              <div className="flex flex-col items-start pl-8 text-left justify-start gap-3 text-[1rem] font-poppins w-full px-4">
                <b className="relative text-dark-blue leading-[1.25rem] inline-block z-1">
                  {slide.name}
                </b>
                <p className="m-0 text-black relative leading-[1.625rem] font-medium text-left z-1">
                  {slide.testimonial}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
