import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { Products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(Products.slice(0, 8));
  }, [Products]);

  return (
    <section className="my-10 px-4 sm:px-6 lg:px-10 mt-14">
      {/* Section Title */}
      <div className="text-center py-8">
        <Title text1={"LATESTS"} text2={"COLLECTIONS"} />
        <p className="max-w-xl mx-auto mt-2 text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals. Carefully curated fashion products for
          every style.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            priceObj={item.price} // send full object
            sizes={item.sizes} // send available sizes
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
