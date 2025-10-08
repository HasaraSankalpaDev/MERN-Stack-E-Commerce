import React from "react";
import Title from "../components/Title";
import { Assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  const handleWhatsAppClick = () => {
    const message = "Hello! I would like to get in touch with your store.";
    const phoneNumber = "94775525356"; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="text-center pt-8 pb-12 border-t bg-white">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="text-gray-600 mt-4 px-4 max-w-2xl mx-auto text-sm sm:text-base">
          Get in touch with us - we're here to help with any questions or
          concerns
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20">
          {/* Contact Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={
                Assets.contact_img || "https://picsum.photos/600/400?random=60"
              }
              alt="Contact Us"
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Contact Information */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 sm:gap-8">
            {/* Store Information */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-semibold text-xl sm:text-2xl text-gray-800 mb-4">
                Our Store
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">📍</span>
                  <p className="text-sm sm:text-base">
                    No. 123, Galle Road, Colombo 03, Sri Lanka
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">📞</span>
                  <div>
                    <p className="text-sm sm:text-base">Tel: 077 552 5356</p>
                    <p className="text-sm sm:text-base">
                      Email: Hasara@Gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-semibold text-xl sm:text-2xl text-gray-800 mb-4">
                Career At Store
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Learn more about us and our amazing team. We're always looking
                for talented individuals to join our growing family.
              </p>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>💬</span>
                Contact On WhatsApp
              </button>
            </div>

            {/* Additional Contact Methods */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                Other Ways to Reach Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-blue-500">📧</span>
                  <span className="text-sm text-gray-600">Email Support</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-purple-500">💬</span>
                  <span className="text-sm text-gray-600">Live Chat</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-red-500">📞</span>
                  <span className="text-sm text-gray-600">Phone Call</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">🏪</span>
                  <span className="text-sm text-gray-600">Visit Store</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-10 bg-white py-12">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Contact;
