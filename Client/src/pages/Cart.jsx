import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoTrashBin } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const Cart = () => {
  const {
    cartItems,
    Products,
    updateQuantity,
    getCartAmount,
    currency,
    removeFromCart,
    clearCart,
  } = useContext(ShopContext);

  const [cartArray, setCartArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Build cart array from context
  useEffect(() => {
    const buildCartArray = () => {
      const tempArray = [];

      for (const productId in cartItems) {
        const product = Products.find((p) => p._id === productId);
        if (!product) continue;

        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            let price = 0;
            if (product.price && typeof product.price === "number") {
              price = product.price;
            } else if (product.price && product.price[size]) {
              price = product.price[size];
            } else if (product.priceObj && product.priceObj[size]) {
              price = product.priceObj[size];
            } else if (typeof product.price === "object") {
              const firstSize = Object.keys(product.price)[0];
              price = product.price[firstSize];
            }

            tempArray.push({
              ...product,
              _id: productId,
              quantity,
              size,
              itemPrice: price,
              totalPrice: price * quantity,
            });
          }
        }
      }
      return tempArray;
    };

    const timer = setTimeout(() => {
      setCartArray(buildCartArray());
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [cartItems, Products]);

  // Handle WhatsApp Checkout
  const handleCheckout = () => {
    if (!cartArray.length) return;

    const whatsappNumber = "94715378698"; // Replace with your WhatsApp number
    let message = `🛒 *New Order from VIORA Store*\n\n`;

    cartArray.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* (ID: ${item._id})\n`;
      message += `   Size: ${item.size}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ${currency}${item.itemPrice}\n`;
      message += `   Total: ${currency}${item.totalPrice}\n\n`;
    });

    message += `*🧾 Grand Total:* ${currency}${getCartAmount()}\n`;
    message += `\n📍 Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <p>Loading cart items...</p>
      </div>
    );
  }

  if (!cartArray.length) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
        Your Cart
      </h2>

      {cartArray.map((item, idx) => (
        <div
          key={`${item._id}-${item.size}-${idx}`}
          className="flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-200 p-4 rounded-lg mb-4 bg-white shadow-sm"
        >
          {/* Product Image */}
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <img
              src={item.image?.[0] || "/placeholder-image.jpg"}
              alt={item.name}
              className="w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-medium text-lg text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mb-1">
              Size: <span className="font-bold">{item.size}</span>
            </p>
            <p className="text-gray-800 font-medium mb-2">
              Price: {currency}
              {item.itemPrice || 0}
            </p>

            {/* Quantity */}
            <div className="flex justify-center sm:justify-start items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(
                    item._id,
                    item.size,
                    Math.max(1, item.quantity - 1)
                  )
                }
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  if (newQuantity >= 1)
                    updateQuantity(item._id, item.size, newQuantity);
                }}
                className="w-16 border border-gray-300 text-center py-1 rounded-md"
              />
              <button
                onClick={() =>
                  updateQuantity(item._id, item.size, item.quantity + 1)
                }
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Total and Remove */}
          <div className="text-center sm:text-right w-full sm:w-auto">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Total: {currency}
              {(item.itemPrice || 0) * item.quantity}
            </p>
            <button
              onClick={() => removeFromCart(item._id, item.size)}
              className="text-sm text-red-600 hover:text-red-800 underline flex items-center justify-center gap-1"
            >
              <IoTrashBin /> Remove
            </button>
          </div>
        </div>
      ))}

      {/* Cart Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-xl font-semibold text-gray-800">
            Total Amount:
          </span>
          <span className="text-xl font-semibold text-gray-800">
            {currency}
            {getCartAmount()}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-medium"
        >
          <FaWhatsapp className="text-xl" />
          Proceed to Checkout via WhatsApp
        </button>

        <button
          onClick={clearCart}
          className="w-full mt-3 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition font-medium"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
