import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const slides = [
    {
      title: "Spring Collection 2025",
      subtitle: "NEW ARRIVALS",
      cta: "SHOP NOW",
      img: "./slider-img-01.png",
    },
    {
      title: "Exclusive Designer Wear",
      subtitle: "TRENDING",
      cta: "VIEW COLLECTION",
      img: "./slider-img-02.png",
    },
    {
      title: "Elegant Evening Dresses",
      subtitle: "LIMITED EDITION",
      cta: "SHOP NOW",
      img: "./slider-img-03.png",
    },
  ];

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full h-[600px] mt-5 sm:h-[600px] md:h-[600px] mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between w-full h-full bg-white px-4 sm:px-10 relative">
              {/* Left Text */}
              <div
                className="w-full sm:w-1/2 flex flex-col justify-center items-start py-6 sm:py-20 text-[#414141]"
                data-aos="fade-right"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-12 md:w-16 h-[2px] bg-[#414141]"></div>
                  <p className="font-medium text-sm md:text-base uppercase">
                    {slide.subtitle}
                  </p>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug mb-4">
                  {slide.title}
                </h1>
                <button className="mt-4 px-6 py-2 bg-[#414141] text-white font-semibold rounded hover:bg-black transition-all">
                  {slide.cta}
                </button>
              </div>

              {/* Right Image */}
              <div
                className="w-full sm:w-1/2 flex justify-center items-center px-0 sm:px-10"
                data-aos="fade-left"
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full sm:w-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Add spacing for pagination */}
      <style jsx global>{`
        /* Mobile: add spacing between slides and pagination */
        @media (max-width: 640px) {
          .mySwiper .swiper-pagination {
            bottom: -2rem !important; /* Moves pagination below the slide content */
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
