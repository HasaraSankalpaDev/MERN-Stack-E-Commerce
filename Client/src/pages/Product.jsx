import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { Products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);

  // WhatsApp Business number - replace with your actual number
  const whatsappNumber = "1234567890"; // Example: 919876543210 for Indian number
  const businessName = "Your Store Name"; // Replace with your business name

  // Load product data
  useEffect(() => {
    const product = Products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image?.[0] || "");
      setReviews([
        { name: "Alice", rating: 5, comment: "Great product!" },
        { name: "Bob", rating: 4, comment: "Good quality." },
      ]);

      // Initialize selected size
      if (product.sizes?.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [Products, productId]);

  // ✅ Dynamically compute price - same logic as ProductItem
  const currentPrice = useMemo(() => {
    if (!productData) return null;

    const priceSource = productData.priceObj || productData.price;

    if (!priceSource) return null;

    if (typeof priceSource === "object") {
      // If size-based prices exist
      if (selectedSize && priceSource[selectedSize] !== undefined) {
        return priceSource[selectedSize];
      }
      // fallback to first price if no size selected
      const firstPrice = Object.values(priceSource).find(
        (p) => typeof p === "number"
      );
      return firstPrice || null;
    }

    // Normal single price
    return priceSource;
  }, [productData, selectedSize]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const addProductToCart = () => {
    if (!productData) return;

    // Check if size selection is required but not selected
    if (productData.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    addToCart(productData._id, selectedSize, currentPrice);
    toast.success(
      `Added to cart: ${productData.name} (${
        selectedSize || "Default"
      }) - ${currency}${currentPrice}`
    );
  };

  const handleWhatsAppOrder = () => {
    if (!productData) return;

    // Check if size selection is required but not selected
    if (productData.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size before ordering!");
      return;
    }

    // Create order message
    const orderMessage = `
🛍️ *NEW ORDER REQUEST* 🛍️

*Product Details:*
🏷️ Product: ${productData.name}
${selectedSize ? `📏 Size: ${selectedSize}` : ""}
💰 Price: ${currency}${currentPrice}
${productData.category ? `📂 Category: ${productData.category}` : ""}
${productData.subCategory ? `📁 Subcategory: ${productData.subCategory}` : ""}

*Customer Message:*
Hello ${businessName}! I would like to order this product. Please let me know the next steps for completing my order.

*Order Summary:*
${productData.name} ${
      selectedSize ? `(${selectedSize})` : ""
    } - ${currency}${currentPrice}

Thank you! 😊
    `.trim();

    // Encode message for URL
    const encodedMessage = encodeURIComponent(orderMessage);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Show success message
    toast.success("Opening WhatsApp to place your order!");
  };

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    setReviews([...reviews, { name: "You", rating: 5, comment: newReview }]);
    setNewReview("");
    toast.success("Review added!");
  };

  if (!productData) return <div className="opacity-0">Loading...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex-1 flex gap-4">
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto">
            {productData.image?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={productData.name}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border ${
                  img === selectedImage
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="flex-1 p-2 border border-gray-200 rounded-md">
            <img
              src={selectedImage}
              alt={productData.name}
              className="w-full object-contain rounded-md"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {productData.name}
          </h1>

          {/* Price - Now properly displaying the computed price */}
          <p className="text-2xl font-medium text-gray-800">
            {currency}
            {currentPrice !== null ? currentPrice : "—"}
          </p>

          <p className="mt-3 text-gray-700">{productData.description}</p>

          {/* WhatsApp Order Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.721 2.006-1.413.248-.691.248-1.284.173-1.413-.074-.134-.273-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">
                  Order via WhatsApp
                </h3>
                <p className="text-green-600 text-sm">
                  Get quick order confirmation and support through WhatsApp
                  Business
                </p>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          {productData.sizes?.length > 0 && (
            <div className="flex flex-col gap-2 mt-4">
              <p className="font-medium text-gray-800">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSizeChange(s)}
                    className={`px-4 py-2 rounded-md border text-sm ${
                      s === selectedSize
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Add to Cart Button */}
            {/* <button
              onClick={addProductToCart}
              className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </button> */}

            {/* WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.721 2.006-1.413.248-.691.248-1.284.173-1.413-.074-.134-.273-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order on WhatsApp
            </button>
          </div>

          {/* WhatsApp Benefits */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h4 className="font-medium text-blue-800 mb-2">
              Why order via WhatsApp?
            </h4>
            <ul className="text-blue-600 text-sm space-y-1">
              <li>• Instant order confirmation</li>
              <li>• Quick customer support</li>
              <li>• Easy payment guidance</li>
              <li>• Fast order tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reviews</h2>
        <div className="flex flex-col gap-4">
          {reviews.length ? (
            reviews.map((rev, idx) => (
              <div
                key={idx}
                className="border rounded-md p-4 bg-white text-gray-800"
              >
                <p className="font-medium">{rev.name}</p>
                <div className="flex items-center gap-1 mt-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                  ))}
                </div>
                <p className="mt-1">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}

          {/* Add Review */}
          <div className="mt-4 flex flex-col gap-2">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write a review..."
              className="border border-gray-300 rounded-md p-2 w-full resize-none text-gray-800"
              rows={3}
            />
            <button
              onClick={handleAddReview}
              className="self-start bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
