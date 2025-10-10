import React, { useEffect } from "react";
import Title from "../components/Title";
import { Assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleWhatsAppClick = () => {
    const message = "Hello! I would like to get in touch with your store.";
    const phoneNumber = "94702000982";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="text-center pt-8 pb-12 border-t bg-white"
        data-aos="fade-down"
      >
        <Title text1="CONTACT" text2="US" />
        <p className="text-gray-600 mt-4 px-4 max-w-2xl mx-auto text-sm sm:text-base">
          Get in touch with us - we're here to help with any questions or
          concerns
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20">
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <img
              src={
                Assets.contact_img || "https://picsum.photos/600/400?random=60"
              }
              alt="Contact Us"
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 sm:gap-8">
            <div
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-left"
            >
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
                    <p className="text-sm sm:text-base">Tel: 070 2000 982</p>
                    <p className="text-sm sm:text-base">
                      Email: Hasara@Gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <h2 className="font-semibold text-xl sm:text-2xl text-gray-800 mb-4">
                Career At Store
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Learn more about us and our amazing team. We're always looking
                for talented individuals to join our growing family.
              </p>

              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>💬</span> Contact On WhatsApp
              </button>
            </div>

            <div
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                Other Ways to Reach Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "📧", text: "Email Support", color: "text-blue-500" },
                  { icon: "💬", text: "Live Chat", color: "text-purple-500" },
                  { icon: "📞", text: "Phone Call", color: "text-red-500" },
                  { icon: "🏪", text: "Visit Store", color: "text-gray-600" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className={`${item.color}`}>{item.icon}</span>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white" data-aos="fade-up">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Contact;
