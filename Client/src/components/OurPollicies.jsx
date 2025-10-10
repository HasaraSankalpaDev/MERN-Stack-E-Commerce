import React, { useEffect } from "react";
import { Assets } from "../assets/assets";
import AOS from "aos";
import "aos/dist/aos.css";

const policiesData = [
  {
    icon: Assets.exchange_icon,
    title: "Easy Exchange Policy",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    icon: Assets.quality_icon,
    title: "7 Days Return Policy",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    icon: Assets.support_img,
    title: "Good Customer Support",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
];

const OurPollicies = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-20 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 sm:gap-10 text-center">
        {policiesData.map((policy, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-xs mx-auto p-4 rounded-md"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <img
              src={policy.icon}
              alt={policy.title}
              className="w-12 sm:w-14 mb-4 sm:mb-5"
            />
            <p className="font-semibold text-sm sm:text-base md:text-lg">
              {policy.title}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPollicies;
