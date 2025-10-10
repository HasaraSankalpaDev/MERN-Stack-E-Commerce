import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import AOS from "aos";
import "aos/dist/aos.css";

const BestSeller = () => {
  const { Products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (Products && Array.isArray(Products)) {
      const bestProducts = Products.filter((item) => item.bestseller);
      setBestSellers(bestProducts.slice(0, 8));
    }
  }, [Products]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
  }, [bestSellers]);

  return (
    <section className="my-10 px-4 sm:px-6 lg:px-10 mt-14">
      {/* Section Title */}
      <div className="text-center py-8" data-aos="fade-up">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="max-w-xl mx-auto mt-2 text-xs sm:text-sm md:text-base text-gray-600">
          Discover our most popular fashion items loved by our customers.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-5">
        {bestSellers.length > 0 ? (
          bestSellers.map((item, index) => (
            <div key={item._id} data-aos="fade-up" data-aos-delay={index * 100}>
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                priceObj={item.price}
                sizes={item.sizes}
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No bestsellers available.
          </p>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
