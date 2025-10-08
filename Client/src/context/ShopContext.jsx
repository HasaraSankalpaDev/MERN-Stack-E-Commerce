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
  const navigate = useNavigate();

  const addToCart = (itemId, size, price) => {
    if (
      !size &&
      Products.find((item) => item._id === itemId)?.sizes?.length > 0
    ) {
      toast.error("Select Item Size");
      return;
    }

    let cartData = structuredClone(cartItems);

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
    toast.success("Added to Cart");
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    }
  };

  const getCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const itemInfo = Products.find((product) => product._id === itemId);

      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            // Handle both priceObj and price formats
            let price = 0;
            if (itemInfo.priceObj && itemInfo.priceObj[size]) {
              price = itemInfo.priceObj[size];
            } else if (itemInfo.price && typeof itemInfo.price === "number") {
              price = itemInfo.price;
            } else if (itemInfo.price && itemInfo.price[size]) {
              price = itemInfo.price[size];
            }

            total += price * cartItems[itemId][size];
          }
        }
      }
    }

    return total;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }
    return total;
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  return (
    <ShopContext.Provider
      value={{
        Products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getTotal: getTotalCartItems, // Returns total number of items in cart
        getCartAmount, // Returns total monetary amount
        updateQuantity,
        navigate,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
