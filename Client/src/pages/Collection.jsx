import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import AOS from "aos";
import "aos/dist/aos.css";

const Collection = () => {
  const { Products, search, showSearch } = useContext(ShopContext);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

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

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const getProductPrice = (product) => {
    if (product.priceObj && typeof product.priceObj === "object") {
      const prices = Object.values(product.priceObj).filter(
        (price) => typeof price === "number"
      );
      return prices.length > 0 ? prices[0] : 0;
    }
    return product.price || 0;
  };

  const applyFilter = () => {
    let productsCopy = [...Products];
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

  const sortProducts = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => getProductPrice(a) - getProductPrice(b));
        break;
      case "high-low":
        fpCopy.sort((a, b) => getProductPrice(b) - getProductPrice(a));
        break;
      case "newest":
        fpCopy.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        break;
      default:
        break;
    }
    setFilterProducts(fpCopy);
  };

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relavent");
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, Products]);
  useEffect(() => {
    if (filterProducts.length > 0) sortProducts();
  }, [sortType]);
  useEffect(() => {
    setFilterProducts(Products);
  }, [Products]);

  return (
    <div className="px-4 pt-10 mb-20">
      <div className="lg:hidden flex flex-col gap-3 mb-6" data-aos="fade-up">
        <Title text1="SRI LANKAN" text2="COLLECTIONS" />
        <div className="flex gap-2">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex-1 flex justify-center items-center gap-2 bg-black text-white px-4 py-3 rounded-md shadow-md hover:bg-gray-900 transition"
          >
            Filters
            <img src={Assets.dropdown_icon} alt="filter" className="h-4" />
          </button>
          {(category.length > 0 || subCategory.length > 0) && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        <aside
          className="hidden lg:block w-72 flex-shrink-0 text-gray-800 rounded-md p-6 space-y-8 shadow-md h-screen sticky top-0 overflow-y-auto bg-white"
          data-aos="fade-right"
        >
          {(category.length > 0 || subCategory.length > 0) && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active filters</span>
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>
          )}
          <FilterPanel
            category={category}
            toggleCategory={toggleCategory}
            subCategory={subCategory}
            toggleSubCategory={toggleSubCategory}
            categories={categories}
            subCategories={subCategories}
          />
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, idx) => (
                <div
                  key={item._id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                >
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    priceObj={item.priceObj || item.price}
                    sizes={item.sizes}
                  />
                </div>
              ))
            ) : (
              <div
                className="col-span-full text-center py-12"
                data-aos="fade-up"
              >
                <p className="text-gray-500 text-lg mb-4">
                  No products found matching your criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {filterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-end"
          data-aos="fade-left"
        >
          <div className="w-80 bg-white h-full p-6 overflow-y-auto shadow-lg relative animate-slideInRight text-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                className="text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setFilterOpen(false)}
              >
                ✕
              </button>
            </div>
            <FilterPanel
              category={category}
              toggleCategory={toggleCategory}
              subCategory={subCategory}
              toggleSubCategory={toggleSubCategory}
              categories={categories}
              subCategories={subCategories}
            />
            <div className="flex gap-3 mt-8">
              <button
                onClick={clearAllFilters}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition"
              >
                Clear All
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-md shadow-md hover:bg-gray-800 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterPanel = ({
  category,
  toggleCategory,
  subCategory,
  toggleSubCategory,
  categories,
  subCategories,
}) => (
  <div className="space-y-8">
    <div>
      <p className="font-semibold mb-4 text-gray-800 text-lg">Categories</p>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <input
              type="checkbox"
              value={cat}
              checked={category.includes(cat)}
              onChange={toggleCategory}
              className="w-4 h-4 accent-black"
            />
            <span className="text-sm font-medium">{cat}</span>
          </label>
        ))}
      </div>
    </div>
    <div>
      <p className="font-semibold mb-4 text-gray-800 text-lg">Product Types</p>
      <div className="space-y-4">
        {Object.entries(subCategories).map(([mainCat, subs]) => (
          <div key={mainCat} className="border-l-2 border-gray-200 pl-4">
            <p className="font-medium text-sm text-gray-600 mb-2">{mainCat}</p>
            <div className="flex flex-wrap gap-2">
              {subs.map((sub) => (
                <label
                  key={sub}
                  className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full border border-gray-300 hover:border-gray-500 transition-colors"
                >
                  <input
                    type="checkbox"
                    value={sub}
                    checked={subCategory.includes(sub)}
                    onChange={toggleSubCategory}
                    className="w-3 h-3 accent-gray-600"
                  />
                  <span className="text-xs">{sub}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Collection;
