import React from "react";
import { Assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Title text1="ABOUT" text2="OUR STORY" />
            <p className="text-gray-600 text-lg sm:text-xl mt-4 max-w-3xl mx-auto">
              Crafting exceptional fashion experiences with quality, style, and
              tradition since our inception
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="order-2 lg:order-1">
              <img
                src={
                  Assets.about_img || "https://picsum.photos/600/400?random=50"
                }
                alt="Our Store"
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2 space-y-6">
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
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Quality Assurance
                    </h3>
                    <p className="text-gray-600">
                      Every product is carefully selected and quality-checked
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Traditional Craftsmanship
                    </h3>
                    <p className="text-gray-600">
                      Preserving cultural heritage through authentic designs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Modern Trends
                    </h3>
                    <p className="text-gray-600">
                      Staying updated with the latest fashion trends
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 sm:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Quality First
              </h3>
              <p className="text-gray-600">
                We never compromise on quality. Every piece in our collection is
                crafted with attention to detail and made to last.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Customer Love
              </h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're committed to providing
                exceptional service and building lasting relationships.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Sustainable Growth
              </h3>
              <p className="text-gray-600">
                We believe in responsible business practices that benefit our
                community and environment while growing sustainably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 sm:py-10 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What makes us different from others
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg">🚚</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600 text-sm">
                Free delivery on orders over $50
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg">↩️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">
                30-day hassle-free return policy
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600 text-sm">
                Your payment information is safe with us
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg">📞</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock customer service
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
