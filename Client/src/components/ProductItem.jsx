import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";

const ProductItem = ({ id, image = [], name, priceObj, sizes = [] }) => {
  const { currency } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);

  // Update selected size when sizes load later
  useEffect(() => {
    if (!selectedSize && sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, selectedSize]);

  // ✅ Dynamically compute price whenever size or priceObj changes
  const currentPrice = useMemo(() => {
    if (!priceObj) return null;

    if (typeof priceObj === "object") {
      // If size-based prices exist
      if (selectedSize && priceObj[selectedSize]) {
        return priceObj[selectedSize];
      }
      // fallback to first price if no size selected
      const firstPrice = Object.values(priceObj)[0];
      return firstPrice;
    }

    // Normal single price
    return priceObj;
  }, [priceObj, selectedSize]);

  return (
    <div className="relative group cursor-pointer bg-white rounded-md shadow-md overflow-hidden">
      <Link to={`/product/${id}`} className="block relative">
        {/* Product Image */}
        <img
          src={image?.[0] || "/placeholder.png"}
          alt={name || "Product"}
          className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Product Info */}
        <div className="p-4 flex flex-col gap-2">
          <p className="text-sm sm:text-base font-medium truncate">{name}</p>

          {/* ✅ Price dynamically changes when size changes */}
          <p className="text-sm sm:text-base font-semibold text-gray-800">
            {currency}
            {currentPrice ? currentPrice : "—"}
          </p>

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div className="flex gap-2 mt-1">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-2 py-1 border rounded text-xs transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(size);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hover Icons */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${id}`}
            className="p-3 bg-white text-black rounded-full shadow hover:bg-gray-100 flex items-center justify-center"
          >
            <AiOutlineEye size={20} />
          </Link>
          <button className="p-3 bg-black text-white rounded-full shadow hover:bg-gray-800 flex items-center justify-center">
            <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
