import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EditProduct = ({ id, productsRefetch, setShowModal }) => {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [product, setProduct] = useState([]);
  const [axiosSecure] = UseAxiosSecure();

  useEffect(() => {
    fetch(`https://just-you-get.vercel.app/products/${id}`)
      .then((res) => res.json()) // Parse the JSON response
      .then((data) => {
        setProduct(data); // Update the state with the fetched data
      });
  }, [id]);

  // get catagories
  const { data: cats = [], refetch: catagoriesRefetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/categories`);
      setLoading(false);
      return res.data;
    },
  });

  // Handle Form input
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: product?.productName || "",
      price: product?.price || "",
      quantity: product?.quantity || "",
      discounts: product?.discounts || "",
      category: product?.category || "",
      keywords: product?.keywords || "",
      code: product?.code || "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        productName: product?.productName || "",
        price: product?.price || "",
        quantity: product?.quantity || "",
        discounts: product?.discounts || "",
        category: product?.category || "",
        keywords: product?.keywords || "",
        code: product?.code || "",
      });
    }
  }, [product, reset]);

  const onSubmit = (data, event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const {
      productName,
      category,
      price,
      discounts,
      quantity,
      keywords,
      code,
    } = data;

    const editedproduct = {
      productName,
      price: parseInt(price),
      quantity: parseInt(quantity),
      discounts,
      category,
      keywords,
      code,
    };

    // Update form data with the latest values from the input fields
    Object.keys(data).forEach((key) => {
      setValue(key, data[key]);
    });

    axiosSecure.patch(`/products/${id}`, data).then((response) => {
      if (response.data.acknowledged) {
        productsRefetch();
        setShowModal(false);
        Swal.fire({
          icon: "success",
          title: "product Edited Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="">
      <h1 className="text-center pt-4 md:pt-8 text-2xl">
        {product?.productName}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-fit mx-auto rounded-lg md:p-10 flex flex-col justify-center items-center p- mb-8 text-xs"
      >
        <div className="flex  md:gap-4 flex-col md:flex-row">
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575dc] font-medium">
                Product name
              </span>
            </label>
            <input
              type="text"
              placeholder="product name"
              {...register("productName", { required: true })}
              className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-80"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575dc] font-medium">
                Category
              </span>
            </label>
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <div className="relative">
                <select
                  {...register("category", {
                    required: true,
                  })}
                  className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-80"
                >
                  <option>Select a category</option>
                  {cats.map((c) => (
                    <option key={c._id} value={c.cat}>
                      {c.cat}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {errors.c && <span className="text-red-500"></span>}
          </div>
        </div>

        <div className="flex  md:gap-4 flex-col md:flex-row">
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">Price</span>
            </label>
            <input
              type="number"
              placeholder="price"
              {...register("price", {
                required: true,
              })}
              className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-80"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">
                Discounts
              </span>
            </label>
            <input
              type="number"
              placeholder="discounts"
              {...register("discounts", {
                required: true,
              })}
              className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-80"
            />
          </div>
        </div>

        <div className="flex  md:gap-4 flex-col md:flex-row">
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">Code</span>
            </label>
            <input
              type="text"
              placeholder="code"
              {...register("code", {
                required: true,
              })}
              className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-80"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">
                Quantity
              </span>
            </label>
            <input
              type="text"
              placeholder="quantity"
              {...register("quantity", {
                required: true,
              })}
              className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-80"
            />
          </div>
        </div>

        <div>
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">
                Keywords
              </span>
            </label>
            <textarea
              type="text"
              placeholder="keywords"
              {...register("keywords", {
                required: true,
              })}
              className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-80"
            />
          </div>
        </div>

        <input
          type="submit"
          value={"Save"}
          className="border border-success py-1 px-3 mt-4 rounded-xl cursor-pointer hover:scale-110 duration-300 hover:bg-success hover:text-white hover:border-warning"
        />
      </form>
    </div>
  );
};

export default EditProduct;
