import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsLetter = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-20 bg-white">
      <div className="text-center max-w-2xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-medium text-gray-800"
          data-aos="fade-up"
        >
          Subscribe Now & Get 20% Discount
        </h2>
        <p
          className="text-gray-400 mt-3 text-sm sm:text-base"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
          voluptatum enim veritatis magni nobis.
        </p>

        <form
          className="mt-6 flex flex-col sm:flex-row items-center w-full sm:w-3/4 mx-auto border rounded-md overflow-hidden"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full sm:flex-1 px-4 py-3 text-gray-700 outline-none"
            required
          />
          <button
            type="submit"
            className="mt-3 sm:mt-0 sm:ml-2 px-6 py-3 bg-black text-white text-sm sm:text-base font-medium"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
