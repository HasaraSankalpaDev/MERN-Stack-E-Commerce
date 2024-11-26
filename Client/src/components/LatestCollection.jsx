import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { Products } = useContext(ShopContext);
  console.log(Products);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(Products.slice(0, 10));
  }, [Products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATESTS"} text2={"COLLECTIONS"} />
        <p className="w-3/4 text-xs m-auto sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet commodi accusantium fugiat eligendi.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map(
          (
            item,
            index // Map over latestProducts instead of Products
          ) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
