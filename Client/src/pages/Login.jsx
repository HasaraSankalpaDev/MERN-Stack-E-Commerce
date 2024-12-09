import React, { useState } from "react";
import "../index.css";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center mb-2 mt-10 gap-2">
        <p className="prata-regular text-3xl">{currentState}</p>
      </div>
      <div className="flex-col w-1/2">
        {currentState === "Login" ? null : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )}
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800 my-4"
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />
        <div className="w-full justify-between flex text-sm mt-[8px]">
          <p className="cursor-pointer">Forgot Your Password?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <div className="w-full flex justify-center items-center">
          <button className="bg-black text-white font-light  px-8 py-2 mt-4 ">
            {currentState === "Login" ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
