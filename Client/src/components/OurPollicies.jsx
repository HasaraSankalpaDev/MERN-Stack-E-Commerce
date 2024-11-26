import React from "react";
import { Assets } from "../assets/assets";
const OurPollicies = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img
          src={Assets.exchange_icon}
          alt="exchange_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div>
        <img
          src={Assets.quality_icon}
          alt="quality_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div>
        <img
          src={Assets.support_img}
          alt="support_img"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Good Customer Support</p>
        <p className="text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};

export default OurPollicies;
