import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cart } from "./pages/Cart";
const App = () => {
  return (
    <div className="px-s sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Nav />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
