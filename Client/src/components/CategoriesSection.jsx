import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Assets } from "../assets/assets";
import Title from "./Title";
import AOS from "aos";
import "aos/dist/aos.css";

const categoriesData = [
  {
    id: "men",
    name: "Men's Fashion",
    image: Assets.men_category,
    description: "Stylish & Comfortable",
    bgGradient: "from-blue-500 to-blue-700",
  },
  {
    id: "women",
    name: "Women's Fashion",
    image: Assets.women_category,
    description: "Elegant & Trendy",
    bgGradient: "from-pink-500 to-pink-700",
  },
  {
    id: "kids",
    name: "Kids Collection",
    image: Assets.kids_category,
    description: "Fun & Colorful",
    bgGradient: "from-green-500 to-green-700",
  },
  {
    id: "trend",
    name: "Trending Now",
    image: Assets.trend_category,
    description: "Hot & Popular",
    bgGradient: "from-purple-500 to-purple-700",
  },
];

const CategoriesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-20 bg-white">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
        <Title text1={"Shop By"} text2={"Category"} />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {categoriesData.map((category, index) => (
          <Link
            key={category.id}
            to={`/collection/`}
            className="group relative overflow-hidden rounded-md shadow-md hover:shadow-xl transition-all duration-500"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Image Container */}
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop";
                }}
              />

              {/* Overlay Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${category.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              ></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-bold text-sm sm:text-lg mb-1">
                {category.name}
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm mb-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  Shop Now →
                </span>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div
        className="text-center mt-12"
        data-aos="fade-up"
        data-aos-delay={400}
      >
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-all duration-300 hover:scale-105"
        >
          <span>View All Collections</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default CategoriesSection;
