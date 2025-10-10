import React, { useEffect } from "react";
import { Assets } from "../assets/assets";
import Title from "../components/Title";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="bg-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Title text1="ABOUT" text2="OUR STORY" />
            <p className="text-gray-600 text-lg sm:text-xl mt-4 max-w-3xl mx-auto">
              Crafting exceptional fashion experiences with quality, style, and
              tradition since our inception
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <img
                src={
                  Assets.about_img || "https://picsum.photos/600/400?random=50"
                }
                alt="Our Store"
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-6" data-aos="fade-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Welcome to Our Fashion Journey
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are passionate about bringing you the finest collection of
                clothing that blends contemporary trends with traditional
                elegance. Our commitment is to provide high-quality,
                comfortable, and stylish apparel for everyone.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Quality Assurance",
                    desc: "Every product is carefully selected and quality-checked",
                  },
                  {
                    title: "Traditional Craftsmanship",
                    desc: "Preserving cultural heritage through authentic designs",
                  },
                  {
                    title: "Modern Trends",
                    desc: "Staying updated with the latest fashion trends",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4"
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-10 sm:py-24 bg-white px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Values
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎯",
              title: "Quality First",
              desc: "Every piece is crafted with attention to detail and made to last.",
            },
            {
              icon: "💝",
              title: "Customer Love",
              desc: "Providing exceptional service and building lasting relationships.",
            },
            {
              icon: "🌱",
              title: "Sustainable Growth",
              desc: "Responsible practices benefiting community and environment.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="py-10 sm:py-10 bg-white px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            What makes us different from others
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🚚",
              title: "Free Shipping",
              desc: "Free delivery on orders over $50",
            },
            {
              icon: "↩️",
              title: "Easy Returns",
              desc: "30-day hassle-free return policy",
            },
            {
              icon: "🔒",
              title: "Secure Payment",
              desc: "Your payment information is safe with us",
            },
            {
              icon: "📞",
              title: "24/7 Support",
              desc: "Round-the-clock customer service",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-lg text-center"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg">{item.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
