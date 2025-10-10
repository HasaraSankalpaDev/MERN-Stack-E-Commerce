import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import AOS from "aos";
import "aos/dist/aos.css";

const LatestCollection = () => {
  const { Products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(Products.slice(0, 8));
  }, [Products]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
  }, [latestProducts]);

  return (
    <section className="my-10 px-4 sm:px-6 lg:px-10 mt-14">
      {/* Section Title */}
      <div className="text-center py-8" data-aos="fade-up">
        <Title text1={"LATESTS"} text2={"COLLECTIONS"} />
        <p className="max-w-xl mx-auto mt-2 text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals. Carefully curated fashion products for
          every style.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-6">
        {latestProducts.map((item, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <ProductItem
              id={item._id}
              name={item.name}
              image={item.image}
              priceObj={item.price}
              sizes={item.sizes}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
