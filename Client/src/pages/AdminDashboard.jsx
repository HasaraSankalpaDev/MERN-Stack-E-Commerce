import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { AiOutlineCheck } from "react-icons/ai";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (prod) => {
    setEditProduct(prod);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
  };

  const clearEdit = () => setEditProduct(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const getFirstPrice = (priceObj) => {
    const firstKey = Object.keys(priceObj)[0];
    return `${priceObj[firstKey]} LKR`;
  };

  const filteredProducts = products.filter(
    (prod) =>
      prod.name.toLowerCase().includes(search.toLowerCase()) ||
      prod.category.toLowerCase().includes(search.toLowerCase()) ||
      prod.subCategory.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Fashion Store Admin
      </h1>

      <ProductForm
        fetchProducts={fetchProducts}
        editProduct={editProduct}
        clearEdit={clearEdit}
      />

      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <p className="text-gray-800 font-semibold text-lg">
          Total Products: {filteredProducts.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left font-medium">Name</th>
              <th className="p-4 text-left font-medium">Category</th>
              <th className="p-4 text-left font-medium">SubCategory</th>
              <th className="p-4 text-left font-medium">Sizes</th>
              <th className="p-4 text-left font-medium">Price</th>
              <th className="p-4 text-left font-medium">Images</th>
              <th className="p-4 text-center font-medium">Bestseller</th>
              <th className="p-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => (
              <tr
                key={prod._id}
                className="border-b hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="p-4 text-gray-800 font-medium">{prod.name}</td>
                <td className="p-4 text-gray-600">{prod.category}</td>
                <td className="p-4 text-gray-600">{prod.subCategory}</td>
                <td className="p-4 text-gray-600">{prod.sizes.join(", ")}</td>
                <td className="p-4 text-gray-900 font-semibold">
                  {getFirstPrice(prod.price)}
                </td>
                <td className="p-4 flex gap-3">
                  {prod.image.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="product"
                      className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                    />
                  ))}
                </td>
                <td className="p-4 text-center">
                  {prod.bestseller && (
                    <AiOutlineCheck className="text-green-500 w-6 h-6 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => startEdit(prod)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 shadow transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(prod._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-gray-500 font-medium"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
