import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { AuthContext } from "../../Providers/AuthProviders";
import logo from "../../assets/logo.png";

import UseCart from "../../Hooks/UseCart";
import UseAdmin from "../../Hooks/UseAdmin";

import { FaBox, FaSignOutAlt, FaSmileBeam } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import CustomLoader from "../CustomLoader/CustomLoader.jsx";
import Swal from "sweetalert2";
import { FaMagnifyingGlass } from "react-icons/fa6";
import UseAllProducts from "../../Hooks/UseAllProducts.jsx";

const NavigationBar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [scroll, setScroll] = useState(false);
  const { products } = UseAllProducts();
  const { cart, cartRefetch } = UseCart(user?.email);
  const { admin, usersRefetch } = UseAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user && !user?.emailVerified) {
      Swal.fire({
        icon: "info",
        title: "Please check your email to verify your account.",
        showConfirmButton: false,
        timer: 3000,
      });
      logout()
        .then((result) => {})
        .catch((error) => {});
    }
    cartRefetch();
    usersRefetch();
  }, [user]);

  const handleLogout = () => {
    logout()
      .then((result) => {})
      .catch((error) => {});
  };

  const handleClickLogin = () => {
    navigate("/login", { state: location });
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  let filteredProducts = [];

  if (searchTerm) {
    filteredProducts = products.filter(
      (product) =>
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by Bengali product name
        product.keywords?.toLowerCase().includes(searchTerm.toLowerCase()) // Search by English product name
    );
  }

  if (loading) {
    return <CustomLoader></CustomLoader>;
  }

  return (
    <div className=" w-full  border-b border-info">
      <div className="flex flex-col w-full items-center ">
        <div
          className={`navbar max-h-12 lg:px-20 w-full mx-auto transition-all duration-1000 ${
            scroll
              ? "bg-gradient-to-r from-blue-50 via-blue-200 to-blue-400  shadow-md"
              : "bg-transparent "
          }`}
        >
          <div className="navbar-start">
            <Link to={"/"} className="flex items-center ml-2  md:ml-4">
              <img className="h-10" src={logo} alt="" />
            </Link>
          </div>

          <div
            className={` w-fit text-center ${
              scroll ? "text-white" : "text-info "
            }`}
          >
            <NavLink
              className="font-medium px-3 py-1 rounded-lg hover:bg-slate-200 lg:text-[13px] text-xs "
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className="font-medium px-3 py-1 rounded-lg hover:bg-slate-200 lg:text-[13px] text-xs "
              to={"/all-products"}
            >
              Products
            </NavLink>
            <NavLink
              className="font-medium px-3 py-1 rounded-lg hover:bg-slate-200 lg:text-[13px] text-xs "
              to={"/categories"}
            >
              Categories
            </NavLink>
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="font-medium px-4 py-1 rounded-lg hover:bg-slate-200 lg:text-[16px] text-xs"
            >
              <FaMagnifyingGlass />
            </button>
          </div>

          <div className="navbar-end">
            <div className="dropdown dropdown-end lg:mr-3 mr-1">
              <label tabIndex={0} className="">
                {user && !admin && (
                  <NavLink
                    to={"/cart"}
                    className="indicator relative hover:bg-slate-200 p-4 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#149352]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p className="badge bg-blue-500 text-white absolute left-0 bottom-2">
                      {cart.length}
                    </p>
                  </NavLink>
                )}
              </label>
            </div>
            {!user && (
              <span>
                <p
                  onClick={handleClickLogin}
                  className={` font-medium px-3 py-2 rounded-lg hover:bg-slate-200 lg:text-[13px] text-xs  cursor-pointer  ${
                    scroll ? "text-white" : "text-info "
                  }`}
                >
                  Login
                </p>
              </span>
            )}
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full outline outline-info">
                    <img src={user.photoURL} alt="User Avatar" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact space-y-2 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <NavLink
                      to={`/users/${user?.displayName}`}
                      className="justify-between"
                    >
                      <FaSmileBeam className=" text-2xl text-sky-600"></FaSmileBeam>{" "}
                      <span className="text-sm"> Manage My Account</span>
                    </NavLink>
                  </li>

                  {user && !admin && (
                    <>
                      <li>
                        <NavLink to={"/order-history"}>
                          <FaBox className="text-xl  text-sky-600"></FaBox>{" "}
                          <span className="text-sm">Order History</span>
                        </NavLink>
                      </li>
                    </>
                  )}
                  {user && admin && (
                    <li>
                      <NavLink to={"/dashboard"}>
                        <MdDashboardCustomize className="text-xl  text-sky-600"></MdDashboardCustomize>{" "}
                        <span className="text-sm">Dashboard</span>
                      </NavLink>
                    </li>
                  )}
                  {user && (
                    <li>
                      <a onClick={handleLogout} className="text-red-400">
                        <FaSignOutAlt className="text-xl"></FaSignOutAlt>{" "}
                        <span className="text-xs">Logout</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Main menu */}
      </div>

      {/* Render search results */}
      <div className="relative flex items-center w-full justify-center"></div>

      {/* Search Box Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="py-6 w-full">
            <div className="relative w-90 mx-auto flex items-center justify-center">
              <div className="pr-8">
                <input
                  className="border w-56 border-sky-500 border-r-0 rounded-l-full px-2 pl-4 py-1 text-sm"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="search"
                />
                <button
                  className="border absolute border-sky-500 rounded-r-full px-2 py-[6px] bg-info text-white hover:text-info hover:bg-white duration-300"
                  type="submit"
                >
                  <FaMagnifyingGlass />
                </button>
              </div>
            </div>

            {/* Render Search Result */}
            <div className="pt-4 h-[400px]">
              <ul className=" mx-auto bg-gray-200 max-h-[400px] overflow-y-auto md:-top-9 -top-7 duration-1000">
                {filteredProducts?.map((product) => (
                  <Link
                    onClick={() => {
                      setSearchTerm("");
                    }}
                    to={`/products/${product._id}`}
                    key={product._id}
                  >
                    <li className="border-b border-white py-2 px-2 w-90 hover:bg-slate-50 duration-500">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="w-10 h-10 mr-2"
                            src={product?.thumbnail}
                            alt=""
                          />
                        </div>
                        <div className="text-xs">{product.productName}</div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NavigationBar;
