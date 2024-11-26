import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem"; // Make sure this is imported

const BestSeller = () => {
  const { Products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (Products && Array.isArray(Products)) {
      const bestProducts = Products.filter((item) => item.bestseller);
      setBestSellers(bestProducts.slice(0, 5));
    }
  }, [Products]);

  return (
    <div>
      <div className="my-10">
        <div className="text-3xl text-center py-8">
          <Title text1={"BEST"} text2={"SELLERS"} />
          <p className="w-3/4 text-xs m-auto sm:text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            dolorum ipsum eius.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSellers.length > 0 ? (
            bestSellers.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No bestsellers available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
