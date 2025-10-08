import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { Assets } from "../assets/assets";

const Hero = () => {
  const slides = [
    {
      title: "Spring Collection 2025",
      subtitle: "NEW ARRIVALS",
      cta: "SHOP NOW",
      img: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Exclusive Designer Wear",
      subtitle: "TRENDING",
      cta: "VIEW COLLECTION",
      img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Elegant Evening Dresses",
      subtitle: "LIMITED EDITION",
      cta: "SHOP NOW",
      img: "http://localhost:5173/src/assets/p_img2_1.png",
    },
  ];

  return (
    <div className="w-full -mt-6">
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
              <div className="w-full sm:w-1/2 flex flex-col justify-center items-start py-6 sm:py-20 text-[#414141]">
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
              <div className="w-full sm:w-1/2 flex justify-center items-center px-0 sm:px-10">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full sm:w-full object-cover rounded-lg shadow-lg max-h-[400px] sm:max-h-[500px] md:max-h-[400px]"
                />
              </div>

              {/* Pagination bullets spacing for mobile */}
              <style jsx>{`
                @media (max-width: 640px) {
                  .swiper-pagination {
                    margin-top: 1rem !important; /* adds spacing from content */
                  }
                }
              `}</style>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
