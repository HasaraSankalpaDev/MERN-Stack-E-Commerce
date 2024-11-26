import React from "react";
import { Assets } from "../assets/assets";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-8 mt-40 text-sm">
        <div>
          <img
            src={Assets.logo}
            alt="logo"
            className="w-32 cursor-pointer mb-5"
          />
          <p className="w-full sm:w-2/3  text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
            sit atque debitis, aliquam eos consequuntur numquam quis molestiae
            dolor fugiat!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+85 8569 856</li>
            <li>contact@forever@gmail.com</li>
          </ul>
        </div>
      </div>
      <p className="text-center my-8">
        &copy; 2024 Bistro. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
