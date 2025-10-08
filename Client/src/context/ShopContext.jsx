import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const [Products, setProducts] = useState([]); // fetched from backend
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // Fetch products from backend API
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products"); // replace with your API
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (itemId, size, price) => {
    const itemInfo = Products.find((item) => item._id === itemId);
    if (!itemInfo) return;

    if (!size && itemInfo.sizes?.length > 0) {
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
            let price = 0;
            if (itemInfo.price && typeof itemInfo.price === "number") {
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
        getTotal: getTotalCartItems,
        getCartAmount,
        updateQuantity,
        navigate,
        fetchProducts, // expose fetchProducts in case you want to refresh products
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
