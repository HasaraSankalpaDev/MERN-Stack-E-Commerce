import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

export const Cart = () => {
  const { Products, currency, cartItems, updateQuantity, Navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tmpData = [];

    for (const productId in cartItems) {
      const productSizes = cartItems[productId];
      for (const size in productSizes) {
        if (productSizes[size]) {
          tmpData.push({
            _id: productId,
            size: size,
            quantity: productSizes[size],
          });
        }
      }
    }
    setCartData(tmpData);
  }, [cartItems]);

  return (
    <div className="border-t pt-10">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = Products.find(
            (product) => product._id === item._id
          );

          return (
            <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-center gap-6">
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div>
                  <p className="text-lg  font-medium">{productData.name}</p>
                  <div className="flex items-center mt-2 gap-5">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <div className="px-3 py-1 border bg-slate-50">
                      {item.size}{" "}
                    </div>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border max-w-20 px-1 py-1"
                onChange={(e) =>
                  e.target.value === "" || e.target.value === 0
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
              />
              <img
                src={Assets.bin_icon}
                alt={Assets.bin_icon}
                className="w-5 cursor-pointer"
                onChange={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full">
          <CartTotal />
          <button
            className="my-8 px-8 py-3 text-sm bg-black text-white"
            onClick={() => Navigate("/place-order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};
