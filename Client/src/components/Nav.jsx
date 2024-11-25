import React, { useState } from "react";
import { Assets } from "../assets/assets";
import { Link, Links, NavLink } from "react-router-dom";
const Nav = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex items-center justify-between py-8 ont-medium">
      <img src={Assets.logo} alt="logo" className="w-36" />

      <ul className="hidden sm:flex gap-5 text-base text-gray-800 ">
        <NavLink
          to="/"
          className="flex items-center flex-col gap-1 font-medium"
        >
          <p>HOME</p>
          <hr className="w-2/4  border-none h-[2px] rounded-full bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex items-center flex-col gap-1 font-[500]"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4  border-none h-[2px] rounded-full bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex items-center flex-col gap-1 font-[500]"
        >
          <p>ABOUT US</p>
          <hr className="w-2/4  border-none h-[2px] rounded-full bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex items-center flex-col gap-1 font-[500]"
        >
          <p>CONTACT US</p>
          <hr className="w-2/4  border-none h-[2px] rounded-full bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-5 pr-5">
        <img
          src={Assets.search_icon}
          alt="search_icon"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            src={Assets.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">LogOut</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img
            src={Assets.cart_icon}
            alt="cart_icon"
            className="w-5 min-w-5 cursor-pointer"
          />
          <p className="absolute right-[-5px] bottom-[-5px] text-center w-4 leading-4 bg-black text-white text-[10px] aspect-square rounded-full">
            10
          </p>
        </Link>
        <img
          src={Assets.menu_icon}
          alt="menu_icon"
          onClick={() => setVisible(true)}
          className="w-5 min-w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* SideBar for Small Devices */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700">
          <div className="flex items-center gap-4 p-3">
            <img
              src={Assets.dropdown_icon}
              alt="dropdown_icon"
              onClick={() => setVisible(false)}
              className="w-5 h-5 rotate-180 cursor-pointer sm:hidden"
            />
            <p>Back</p>
          </div>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/about"
          >
            ABOUT US
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/contact"
          >
            CONTACT US
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
