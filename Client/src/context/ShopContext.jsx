import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "Rs.";
  const delivery_fee = 10;

  const [Products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      try {
        setCartItems(JSON.parse(savedCartItems));
      } catch (error) {
        console.error("Error parsing saved cart items:", error);
        localStorage.removeItem("cartItems");
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (item, quantity = 1, size = "default") => {
    const itemId = item._id ? item._id : item;
    const itemInfo = Products.find((product) => product._id === itemId);

    if (!itemInfo) {
      toast.error("Product not found");
      return;
    }

    if (itemInfo.sizes?.length > 0 && !size) {
      toast.error("Select Item Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += quantity;
      } else {
        cartData[itemId][size] = quantity;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = quantity;
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

  // Clear cart function (optional - if you need it)
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
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
            } else if (itemInfo.priceObj && itemInfo.priceObj[size]) {
              price = itemInfo.priceObj[size];
            }
            total += price * cartItems[itemId][size];
          }
        }
      }
    }

    return total;
  };
  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      // If no sizes left for that item, remove item entirely
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);
      localStorage.setItem("cartItems", JSON.stringify(cartData));
      toast.info("Item removed from cart");
    }
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
        clearCart,
        navigate,
        removeFromCart,
        fetchProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
