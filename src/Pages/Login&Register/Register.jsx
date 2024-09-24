import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, updateUser, logout, verification, user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [creating, setCreating] = useState(false);
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    const { name, email, password } = data;
    setCreating(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const res = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });
      const imgResponse = await res.json();
      if (imgResponse.success) {
        const imgUrl = imgResponse.data.display_url;
        const savedUser = {
          name,
          email,
          photoURL: imgUrl,
          role: "buyer",
        };

        try {
          const result = await createUser(email, password);
          const loggedUser = result.user;

          // Check if user is authenticated
          if (loggedUser) {
            await updateUser(name, imgUrl);
            await verification(loggedUser);

            // Send savedUser to your server
            const response = await fetch(
              "https://just-you-get.vercel.app/users",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(savedUser),
              }
            );

            if (response.ok) {
              Swal.fire({
                icon: "success",
                title:
                  "User Created Successfully. Please check your email to verify your account.",
                showConfirmButton: false,
                timer: 3000,
              });
              await logout();
              navigate("/login");
            } else {
              throw new Error("Failed to save user data to the server.");
            }
          } else {
            throw new Error("User is not authenticated.");
          }
        } catch (verificationError) {
          console.error(
            "Verification email failed to send:",
            verificationError
          );
          setError("Verification email failed to send.");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        text: error,
        timer: 3000,
      });
    }
  }, [error]);

  if (creating && !error) {
    return (
      <div className="fixed top-0 z-40 bg-white w-full min-h-screen flex flex-col gap-4 items-center justify-center">
        <progress className="progress w-56"></progress>
        <p className="text-gray-400">Please Wait...</p>
      </div>
    );
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/6g0XzN0/146487.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full pt-16 h-screen bg-blue-600 bg-opacity-50 flex items-center justify-center">
        <div className="p-8 flex flex-col items-center w-full max-w-sm sm:max-w-md">
          {/* Logo */}
          <img src={logo} className="w-52 mb-10" alt="Logo" />

          {/* Form */}
          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Input */}
            <div className="relative">
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
                  {...register("name", {
                    required: "Full name is required",
                  })}
                  placeholder="Full Name"
                  className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email"
                  className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* File Input */}
            <div className="relative">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-gray-400" />
                </span>
                <input
                  type="file"
                  {...register("image", {
                    required: "Profile picture is required",
                  })}
                  className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  placeholder="Password"
                  className="w-full px-10 py-2 bg-white bg-opacity-80 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />{" "}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
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
