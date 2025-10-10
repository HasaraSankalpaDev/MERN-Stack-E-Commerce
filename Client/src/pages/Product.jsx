import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Product = () => {
  const { productId } = useParams();
  const { Products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const whatsappNumber = "94715378698";
  const businessName = "VIORA";

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const product = Products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image?.[0] || "");
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [Products, productId]);

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:5000/api/reviews/${productId}`)
        .then((res) => setReviews(res.data))
        .catch(() => toast.error("Failed to load reviews"));
    }
  }, [productId]);

  const currentPrice = useMemo(() => {
    if (!productData) return null;
    const priceSource = productData.priceObj || productData.price;
    if (!priceSource) return null;
    if (typeof priceSource === "object") {
      if (selectedSize && priceSource[selectedSize] !== undefined)
        return priceSource[selectedSize];
      return (
        Object.values(priceSource).find((p) => typeof p === "number") || null
      );
    }
    return priceSource;
  }, [productData, selectedSize]);

  const handleSizeChange = (size) => setSelectedSize(size);

  const handleWhatsAppOrder = () => {
    if (!productData) return;
    if (productData.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size before ordering!");
      return;
    }
    const orderMessage = `
🛍️ *NEW ORDER REQUEST* 🛍️
*Product Details:*
🏷️ Product: ${productData.name}
${selectedSize ? `📏 Size: ${selectedSize}` : ""}
🧮 Quantity: ${quantity}
💰 Price: ${currency}${currentPrice * quantity}
${productData.category ? `📂 Category: ${productData.category}` : ""}
${productData.subCategory ? `📁 Subcategory: ${productData.subCategory}` : ""}

*Customer Message:*
Hello ${businessName}! I would like to order this product.

*Order Summary:*
${productData.name} ${
      selectedSize ? `(${selectedSize})` : ""
    } x${quantity} - ${currency}${currentPrice * quantity}

Thank you! 😊
    `.trim();

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        orderMessage
      )}`,
      "_blank"
    );
    toast.success("Opening WhatsApp to place your order!");
  };

  const handleAddReview = async () => {
    if (!newReview.trim()) {
      toast.error("Please write a review!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/reviews", {
        productId,
        name: "You",
        rating: 5,
        comment: newReview,
      });
      setReviews([res.data.review, ...reviews]);
      setNewReview("");
      toast.success("Review added successfully!");
    } catch {
      toast.error("Error adding review");
    }
  };

  if (!productData) return <div className="opacity-0">Loading...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8" data-aos="fade-up">
        {/* Images Section */}
        <div className="flex-1 flex flex-col sm:flex-row lg:flex-row gap-4 overflow-hidden">
          <div
            className="flex flex-row sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto justify-center sm:justify-start"
            data-aos="fade-right"
          >
            {productData.image?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={productData.name}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover cursor-pointer rounded-md border ${
                  img === selectedImage
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div
            className="flex-1 p-2 border border-gray-200 rounded-md flex items-center justify-center"
            data-aos="zoom-in"
          >
            <img
              src={selectedImage}
              alt={productData.name}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-contain rounded-md"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4" data-aos="fade-left">
          <h1 className="text-2xl font-semibold text-gray-800">
            {productData.name}
          </h1>
          <p className="text-2xl font-medium text-gray-800">
            {currency}
            {currentPrice !== null ? currentPrice * quantity : "—"}
          </p>
          <p className="mt-3 text-gray-700">{productData.description}</p>

          {/* Size */}
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

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-4">
            <p className="font-medium text-gray-800">Quantity:</p>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded-md"
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded-md"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3 mt-4">
            <button
              onClick={() => {
                addToCart(productData, quantity, selectedSize || "default");
                toast.success(`${productData.name} added to cart!`);
              }}
              className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              💬 WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12" data-aos="fade-up">
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
      <div className="mt-12" data-aos="fade-up">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
