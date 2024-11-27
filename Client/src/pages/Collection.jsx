import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const { Products, search, showSearch } = useContext(ShopContext);
  const [filter, setFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // Category Logic
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Sub Category Logic
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Filter Logic
  const applyFilter = () => {
    let productsCopy = Products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // Product Sort Logic
  const sortProducts = (field) => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row pt-10 gap-1 sm:gap-10 border-t">
      {/* Filter Section */}
      <div className="min-w-60">
        <p
          onClick={() => setFilter(!filter)}
          className="my-2 flex items-center text-xl cursor-pointer gap-2"
        >
          FILTERS
        </p>
        <img
          src={Assets.dropdown_icon}
          alt="dropdown_icon"
          className={`h-3 sm:hidden ${filter ? "rotate-90" : ""}`}
        />
        {/* Category Filter */}
        <div
          className={`border border-gray-400 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden "
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              {" "}
              <input
                type="checkbox"
                className="w-4"
                value={`Men`}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              {" "}
              <input
                type="checkbox"
                className="w-4"
                value={`Women`}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              {" "}
              <input
                type="checkbox"
                className="w-4"
                value={`Kids`}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* Sub Category */}
        <div
          className={`border border-gray-400 pl-5 py-3 my-6 ${
            filter ? "" : "hidden "
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              {" "}
              <input
                type="checkbox"
                className="w-4"
                value={`Topwear`}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              {" "}
              <input
                type="checkbox"
                className="w-4"
                value={`Bottomwear`}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              {" "}
              <input
                type="checkbox"
                className="w-4"
                value={`Winterwear`}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-sm sm:text-2xl  mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            className="border-2 border-gray-500 text-sm py-2 px-2"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
