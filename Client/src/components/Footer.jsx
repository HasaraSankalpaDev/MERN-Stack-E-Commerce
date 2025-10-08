import React from "react";
import { Assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white py-10 w-full sm:w-[calc(100%+40px)] md:w-[calc(100%+80px)] mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-10 sm:gap-14 text-sm">
          {/* Logo and Description */}
          <div className="sm:flex-1">
            <img
              src={Assets.logo}
              alt="logo"
              className="w-32 cursor-pointer mb-5"
            />
            <p className="text-gray-600 text-sm sm:text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
              sit atque debitis, aliquam eos consequuntur numquam quis molestiae
              dolor fugiat!
            </p>
          </div>

          {/* Company Links */}
          <div className="sm:flex-1">
            <p className="text-lg sm:text-xl font-medium mb-3 sm:mb-5">
              COMPANY
            </p>
            <ul className="flex flex-col gap-1 text-gray-600 text-sm sm:text-base">
              <li className="hover:text-black hover:underline transition-colors cursor-pointer">
                Home
              </li>
              <li className="hover:text-black hover:underline transition-colors cursor-pointer">
                About Us
              </li>
              <li className="hover:text-black hover:underline transition-colors cursor-pointer">
                Delivery
              </li>
              <li className="hover:text-black hover:underline transition-colors cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:flex-1">
            <p className="text-lg sm:text-xl font-medium mb-3 sm:mb-5">
              GET IN TOUCH
            </p>
            <ul className="flex flex-col gap-1 text-gray-600 text-sm sm:text-base">
              <li className="hover:text-black hover:underline transition-colors cursor-pointer">
                +85 8569 856
              </li>
              <li className="hover:text-black hover:underline transition-colors cursor-pointer">
                contact@forever@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <p className="text-center mt-10 text-gray-500 text-xs sm:text-sm">
          &copy; 2024 Bistro. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
