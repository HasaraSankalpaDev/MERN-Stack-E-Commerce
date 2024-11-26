import React from "react";

const NewsLetter = () => {
  return (
    <div className="text-center my-10">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe Now & Get 20% Discount
      </p>
      <p className="text-gray-400 mt-3 text-lg">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
        voluptatum enim veritatis magni nobis.
      </p>
      <form className="w-full sm:w-1/2 flex items-center mx-auto my-6 pl-3 border">
        <input
          type="email"
          placeholder="Enter Email Address"
          className="w-full sm:flex-1 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-4 px-10 text-xs "
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
