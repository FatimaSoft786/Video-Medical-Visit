import React from "react";
import EmblaCarousel from "./EmblaCarousel";

const testimonials = [
  {
    name: "Syed Arif Qadir",
    title: "Senior Developer",
    image: "/img/user.png",
    testimonial:
      "I have worked with hassan for more than a year, over that period I found him to be an excellent resource. He learned from his seniors and worked well with colleagues. He was critical part of our Java unit and a good person to be around at the office.",
  },
  {
    name: "Usman Aftab",
    title: "Software Engineer",
    image: "/img/user.png",
    testimonial:
      "Hassan is a very dedicated and determined person. He has always put in enough effort on trying to achieve his goals. A good engineer would never let it go and hassan is one of them.",
  },
  {
    name: "John Doe",
    title: "CTO, Company",
    image: "/img/user.png",
    testimonial:
      "This company provided excellent services and I am very happy with the results.",
  },
];

const TestimonialSlider = () => {
  return (
    <div className="flex flex-col gap-12 py-8">
      <h1 className="text-4xl font-bold text-center">Dicono di Noi</h1>
      <EmblaCarousel
        slides={testimonials}
        options={{ loop: true, align: "center", draggable: true }}
      />
    </div>
  );
};

export default TestimonialSlider;
