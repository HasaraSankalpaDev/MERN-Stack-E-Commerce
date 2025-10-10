import React, { useContext, useState } from "react";
import { Assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Nav = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getTotal } = useContext(ShopContext); // Fixed typo: getTotal

  const navItems = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];

  const handleSearchClick = () => {
    setShowSearch(true); // Show the search bar
    navigate("/collection"); // Go to collection page
  };

  return (
    <div className="flex items-center justify-between shadow-bottom shadow-lg py-4 px-5 sm:px-10 bg-white border-b-2 relative">
      {/* Logo */}
      <Link to="/">
        <img src={Assets.logo} alt="logo" className="w-32 sm:w-36" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-8 text-base font-medium">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={
              item === "HOME" ? "/" : `/${item.toLowerCase().replace(" ", "")}`
            }
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 relative group text-gray-600 ${
                isActive ? "text-gray-900 font-[500]" : ""
              }`
            }
          >
            <p className="text-base">{item}</p>
            <span className="block h-[2px] w-0 bg-gray-800 rounded-full group-hover:w-1/2 transition-all"></span>
          </NavLink>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        <img
          src={Assets.search_icon}
          alt="search_icon"
          className="w-5 cursor-pointer"
          onClick={handleSearchClick}
        />
        {/* Profile */}
        {/* <div className="relative group">
          <Link to="/login">
            <img
              src={Assets.profile_icon}
              alt="profile_icon"
              className="w-5 cursor-pointer"
            />
          </Link>
          <div className="hidden group-hover:flex absolute right-0 top-full mt-2 flex-col w-36 bg-slate-100 text-gray-700 rounded shadow-lg py-2">
            {["My Profile", "Orders", "LogOut"].map((text, i) => (
              <p key={i} className="px-4 py-1 hover:text-black cursor-pointer">
                {text}
              </p>
            ))}
          </div>
        </div> */}

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={Assets.cart_icon}
            alt="cart_icon"
            className="w-5 cursor-pointer"
          />
          <span className="absolute -right-2 -bottom-2 text-[10px] w-4 h-4 flex items-center justify-center bg-black text-white rounded-full">
            {getTotal()}
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          src={Assets.menu_icon}
          alt="menu_icon"
          className="w-6 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform transform ${
          visible ? "translate-x-0" : "translate-x-full"
        } w-3/4 max-w-xs sm:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <p className="text-lg font-medium">Menu</p>
          <img
            src={Assets.dropdown_icon}
            alt="close_icon"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setVisible(false)}
          />
        </div>

        <nav className="flex flex-col mt-4">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={
                item === "HOME"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "")}`
              }
              className={({ isActive }) =>
                `py-3 px-6 border-b text-gray-600 font-medium ${
                  isActive ? "text-gray-800" : ""
                }`
              }
              onClick={() => setVisible(false)}
            >
              {item}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
