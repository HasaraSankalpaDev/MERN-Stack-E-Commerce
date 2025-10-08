import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection") && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-600 px-5 py-2 my-5 mx-3 rounded-sm w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none text-lg bg-inherit"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={Assets.search_icon} alt="search_icon" className="w-4" />
      </div>
      <img
        src={Assets.cross_icon}
        alt="cross_icon"
        className="inline w-4 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default SearchBar;
