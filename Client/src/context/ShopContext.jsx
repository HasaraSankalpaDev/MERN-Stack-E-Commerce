import React, { createContext, useEffect, useState } from "react";
import { Products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const Navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Item Size");
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const getToatal = () => {
    let total = 0;
    for (let item in cartItems) {
      for (let size in cartItems[item]) {
        total += cartItems[item][size];
      }
    }
    return total;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let total = 0;

    for (const items in cartItems) {
      const itemInfo = Products.find((product) => product._id === items);

      if (itemInfo) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            total += itemInfo.price * cartItems[items][item];
          }
        }
      }
    }

    return total;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const value = {
    Products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getToatal,
    updateQuantity,
    getCartAmount,
    Navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
