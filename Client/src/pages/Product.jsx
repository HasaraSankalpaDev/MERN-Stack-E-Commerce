import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { Products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState();
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = Products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  // Add to Cart
  const addProductToCart = () => {
    addToCart(productData._id, size);
    toast.success("Product added to cart!");
  };

  useEffect(() => {
    fetchProductData();
  }, [Products, productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity  ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                alt={index}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={image} className="w-full h-auto" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={Assets.star_icon} className="w-4 5" alt="star icons" />
            <img src={Assets.star_icon} className="w-4 5" alt="star icons" />
            <img src={Assets.star_icon} className="w-4 5" alt="star icons" />
            <img src={Assets.star_icon} className="w-4 5" alt="star icons" />
            <img
              src={Assets.star_dull_icon}
              className="w-4 5"
              alt="star icons"
            />
            <p className="pl-2">(123)</p>
          </div>
          <p className="text-3xl mt-5 font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border  py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={addProductToCart}
            className="bg-black text-white px-8 py-3 active:bg-gray-700 text-sm"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 ">
            <p>100% Original Products.</p>
            <p>Cash on Delivery Available.</p>
            <p>Easy Return and Exchange Policy within 7 Days.</p>
          </div>
        </div>
      </div>

      {/* Description adn Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-lg">Description</b>
          <p className="border px-5 py-3 text-lg">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            The judges were also briefed on the science behind the issue at hand
            by the UN's Intergovernmental Panel on Climate Change before the
            hearings began. The advisory opinion the ICJ delivers won’t be
          </p>
          <p>
            The judges were also briefed on the science behind the issue at hand
            by the UN's Intergovernmental Panel on Climate Change before the
            hearings began. The advisory opinion the ICJ delivers won’t be
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
