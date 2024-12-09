import React from "react";
import Title from "../components/Title";
import { Assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"CONTACT"} text2={"US"} />{" "}
      </div>
      <div className="my-20 flex flex-col justify-center md:flex-row gap-10">
        <img
          src={Assets.contact_img}
          alt="Contact"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold  text-xl text-gray-600">Our Store</p>
          <p className="text-gray-600">
            No. 123, Galle Road, Colombo 03, Sri Lanka
          </p>
          <p className="text-gray-600">
            Tell : 077 552 5356 <br /> Email : Hasara@Gmail.com
          </p>
          <p className="font-semibold  text-xl text-gray-600">
            Career At Store
          </p>
          <p>Learn More About We and Out Team</p>
          <button className="border border-black px-8 py-2 hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <div className="mt-10">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Contact;
