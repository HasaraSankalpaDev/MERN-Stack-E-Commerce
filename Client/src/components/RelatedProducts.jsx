import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { Products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (Products.length > 0) {
      let productCopy = Products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );

      setRelatedProducts(productCopy.slice(0, 5));
    }
  }, [Products, category, subCategory]);
  return (
    <div className="my-24">
      <div className="text-3xl text-center py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 my-10">
        {relatedProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            priceObj={item.price} // ✅ fixed prop
            sizes={item.sizes}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
