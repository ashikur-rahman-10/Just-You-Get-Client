import React from "react";
import logo from "../../assets/logo2.png";
import { Link } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";

const Register = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/6g0XzN0/146487.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-screen bg-blue-600 bg-opacity-50 flex items-center justify-center">
        <div className="p-8 flex flex-col items-center w-full max-w-sm sm:max-w-md">
          {/* Logo */}
          <img src={logo} className="w-52 mb-10" />

          {/* Form */}
          <form className="w-full space-y-4">
            {/* Username Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V5a4 4 0 10-8 0v6m12 10H4a2 2 0 01-2-2V11a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12H8m0 0l-2-2m2 2l2 2m-2-2h8m4 0v2a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2m2 2V5a2 2 0 112 0v2m-2-2v12"
                  ></path>
                </svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm0 0v2m-6 4h12v-2a6 6 0 00-12 0v2z"
                  ></path>
                </svg>
              </span>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm0 0v2m-6 4h12v-2a6 6 0 00-12 0v2z"
                  ></path>
                </svg>
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
            <p className="text-center text-[#454545] text-lg">or</p>
            <GoogleLogin />
          </form>

          {/* Links */}
          <div className="mt-4 text-center">
            <Link to={"/login"} className="text-blue-100 hover:underline">
              Already have an account? Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
