import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = [
  "Men",
  "Women",
  "Kids",
  "Trend",
  "Gifts",
  "T-Shirts",
  "Shoes",
  "Bags",
  "Traditional",
  "Casual",
  "Accessories",
];

const subCategories = {
  Men: ["Shirts", "Trousers", "Sarongs", "Office Wear", "Casual Wear"],
  Women: ["Dresses", "Blouses", "Sarees", "Salwar Kameez", "Casual Wear"],
  Kids: ["Boys", "Girls", "Infants", "School Uniforms"],
  Traditional: ["Sarees", "Sarongs", "Osariya", "National Dress"],
  Shoes: ["Leather Shoes", "Sandals", "Slippers", "Sports Shoes"],
  Bags: ["Handbags", "Backpacks", "Laptop Bags", "Traditional Bags"],
  "T-Shirts": ["Polo T-Shirts", "Round Neck", "V-Neck", "Graphic Tees"],
  Gifts: ["Birthday", "Anniversary", "Festival", "Corporate"],
  Accessories: [
    "Jewellery",
    "Watches",
    "Belts",
    "Hats",
    "Traditional Jewellery",
  ],
};

const ProductForm = ({ fetchProducts, editProduct, clearEdit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sizes, setSizes] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [id, setId] = useState(null);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  // Load data for editing
  useEffect(() => {
    if (editProduct) {
      setId(editProduct._id);
      setName(editProduct.name);
      setDescription(editProduct.description);
      setCategory(editProduct.category);
      setSubCategory(editProduct.subCategory);
      setSizes(editProduct.sizes.join(", "));
      setPrice(Object.values(editProduct.price).join(", "));
      setImageUrls(editProduct.image.join(", "));
      setBestseller(editProduct.bestseller);
      setAvailableSubCategories(subCategories[editProduct.category] || []);
    }
  }, [editProduct]);

  // Update subcategories when category changes
  useEffect(() => {
    setAvailableSubCategories(subCategories[category] || []);
    if (!subCategories[category]?.includes(subCategory)) {
      setSubCategory(""); // reset if current subCategory is invalid
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sizesArr = sizes.split(",").map((s) => s.trim());
    const priceArr = price.split(",").map((p) => Number(p.trim()));
    const priceObj = {};
    sizesArr.forEach((s, i) => (priceObj[s] = priceArr[i]));
    const images = imageUrls.split(",").map((url) => url.trim());

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/products/${id}`, {
          name,
          description,
          category,
          subCategory,
          sizes: sizesArr,
          price: priceObj,
          image: images,
          bestseller,
        });
        alert("Product updated!");
        clearEdit();
      } else {
        await axios.post("http://localhost:5000/api/products", {
          name,
          description,
          category,
          subCategory,
          sizes: sizesArr,
          price: priceObj,
          image: images,
          bestseller,
        });
        alert("Product added!");
      }
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      alert("Error saving product");
    }
  };

  const resetForm = () => {
    setId(null);
    setName("");
    setDescription("");
    setCategory("");
    setSubCategory("");
    setSizes("");
    setPrice("");
    setImageUrls("");
    setBestseller(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-3 p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold">
        {id ? "Edit Product" : "Add Product"}
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* SubCategory Select */}
      <select
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        disabled={!availableSubCategories.length}
      >
        <option value="">Select SubCategory</option>
        {availableSubCategories.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      <input
        placeholder="Sizes (comma separated)"
        value={sizes}
        onChange={(e) => setSizes(e.target.value)}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        placeholder="Prices (comma separated)"
        value={price}
        required
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        placeholder="Image URLs (comma separated)"
        value={imageUrls}
        required
        onChange={(e) => setImageUrls(e.target.value)}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        Bestseller
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
        >
          {id ? "Update Product" : "Add Product"}
        </button>
        {id && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
