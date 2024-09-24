import React, { useEffect, useState } from "react";
import logo from "../../assets/logo2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { user, login, loginWithGoogle, resetPassword } = useAuth();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        const loggedUser = result.user;
        toast.success("Successfully Login!");
        setError("");
        navigate(from);
        window.location.reload();
        event.target.reset();
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        window.alert(
          "The email or password you entered is incorrect. Try again."
        );
      });
  };

  const handleNavigate = () => {
    navigate("/register");
    window.location.reload();
  };

  const handleResetPassword = () => {
    document.getElementById("my_modal_5").close();
    const email = window.prompt("Enter your email address:");
    if (email) {
      resetPassword(email)
        .then(() => {
          window.alert(
            "Password reset email sent successfully. Please check your email account."
          );
        })
        .catch((error) => {
          window.alert(`Request failed: ${error.message}`);
        });
    }
  };

  useEffect(() => {
    if (error) {
      window.alert(
        "The email or password you entered is incorrect. Try again."
      );
    }
  }, [error]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/6g0XzN0/146487.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-screen pt-16 bg-blue-600 bg-opacity-50 flex items-center justify-center">
        <div className=" p-8 flex flex-col items-center w-full max-w-sm sm:max-w-md">
          {/* Avatar */}
          <img src={logo} className=" w-52 mb-10" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
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
                    d="M16 11V5a4 4 0 10-8 0v6m12 10H4a2 2 0 01-2-2V11a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
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
              <span
                onClick={() => {
                  setShow(!show);
                }}
                className="text-gray-600 text-xl absolute right-3 top-[10px] cursor-pointer"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
              <input
                type={show ? "text" : "password"}
                required
                name="password"
                placeholder="Password"
                className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            <p className="text-center text-[#454545] text-lg">or</p>
            <GoogleLogin />
          </form>

          {/* Links */}
          <div className="mt-4 text-center">
            <p
              onClick={handleResetPassword}
              className="text-blue-100 hover:underline cursor-pointer"
            >
              Forgot Password?
            </p>
          </div>
          <div className="mt-2 text-center">
            <Link to={"/register"} className="text-blue-100 hover:underline">
              Create new account →
            </Link>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Login;
