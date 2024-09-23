import React, { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState();
  const location = useLocation();
  const from = location?.state?.pathname || "/";
  const navigate = useNavigate();

  // Google Login
  const hangleGoogle = () => {
    loginWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        const { displayName, photoURL, email } = loggedUser;
        const savedUser = {
          name: displayName,
          photoURL,
          email,
          role: "buyer",
        };

        fetch("https://just-you-get.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savedUser),
        });

        toast.success("Successfully Login!");
        setError("");
        navigate(from);
        // window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <div
        onClick={hangleGoogle}
        className=" flex justify-center w-full bg-white bg-opacity-60 py-2 rounded-full"
      >
        <span className="flex gap-4 w-full justify-center items-center text-gray-500 cursor-pointer">
          <p>Continue with</p>
          <img
            className="w-8 p-[4px] border rounded-full hover:saturate-0 bg-slate-200 cursor-pointer"
            src="https://i.ibb.co/HX7Z8g9/google-logo-png-suite-everything-you-need-know-about-google-newest-0-removebg-preview.png"
            alt=""
          />
        </span>
      </div>

      <Toaster></Toaster>
    </div>
  );
};

export default GoogleLogin;
