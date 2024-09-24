import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/UseAuth";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [axiosSecure] = UseAxiosSecure();

  const navigate = useNavigate();

  // get catagories
  const { data: cats = [], refetch: catagoriesRefetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/categories`);
      setLoading(false);
      return res.data;
    },
  });

  // Add New categories
  const handleAddNewCategory = (event) => {
    event.preventDefault();

    const newCategoryValue = event.target.newCategory.value;

    fetch("https://just-you-get.vercel.app/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cat: newCategoryValue }), // Corrected the object key here
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          catagoriesRefetch();
          toast.success("Successfully Added");
        }
      });

    setShowModal1(false); // Close modal after adding category
  };
  // Handle Form input
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    const {
      productName,
      category,
      price,
      discounts,
      quantity,
      code,
      keywords,
      colors,
    } = data;

    const imageFiles = data.images;
    const imageUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData();
      formData.append("image", imageFiles[i]);

      const res = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });

      const imgResponse = await res.json();
      if (imgResponse.success) {
        imageUrls.push(imgResponse.data.display_url);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to upload image. Please try again.",
          timer: 3000,
        });
        setIsSubmitting(false);
        return;
      }

      setUploadProgress(((i + 1) / imageFiles.length) * 100);
    }

    // Handle images upload
    const thumbnailFormData = new FormData();
    thumbnailFormData.append("image", data.thumbnail[0]);

    const thumbnailRes = await fetch(imageHostingUrl, {
      method: "POST",
      body: thumbnailFormData,
    });

    const thumbnailResponse = await thumbnailRes.json();
    let thumbnailUrl = "";
    if (thumbnailResponse.success) {
      thumbnailUrl = thumbnailResponse.data.display_url;
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to upload thumbnail plan. Please try again.",
        timer: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    // const { name, email, photoURL } = thisUser;

    const addedProduct = {
      productName,
      price: parseInt(price),
      thumbnail: thumbnailUrl,
      quantity: parseInt(quantity),
      images: imageUrls,
      discounts,
      addedBy: user.displayName,
      sold: 0,
      category,
      code,
      keywords,
      colors,
    };

    try {
      const response = await fetch("https://just-you-get.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedProduct),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/all-products");
        reset();
      } else {
        const errorResponse = await response.json();
        console.error("Server response:", errorResponse);
        throw new Error("Failed to add Product. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 3000,
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (isSubmitting) {
    return (
      <div className="fixed z-50 bg-white -top-4 min-h-screen w-full flex items-center justify-center mt-4 px-10">
        <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full "
            style={{ width: `${uploadProgress}%` }}
          ></div>

          <h1 className="text-center text-lg pt-2">
            Uploading {uploadProgress}%
          </h1>
        </div>
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
    <div className="flex flex-col w-full items-center md:pt-8">
      <h1 className="text-center py-8 text-2xl">Add a Product to your shop</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-fit  rounded-lg shadow-md flex flex-col justify-center items-center p-8 mb-8 text-xs"
      >
        <div className="flex md:flex-row md:gap-4 flex-col">
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575dc] font-medium">
                Product Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              {...register("productName", { required: true })}
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
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
                  className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                >
                  <option>Select a category</option>
                  {cats.map((c) => (
                    <option key={c._id} value={c.cat}>
                      {c.cat}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowModal1(true)}
                  className="absolute inset-y-0 right-0 px-4 py-1  bg-blue-500 text-white "
                >
                  New
                </button>
              </div>
            )}
            {errors.c && (
              <span className="text-red-500">Category is required</span>
            )}
          </div>
        </div>

        <div className="flex md:flex-row md:gap-4 flex-col">
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">Price</span>
            </label>
            <input
              type="number"
              placeholder="price"
              {...register("price")}
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
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
              {...register("discounts", { required: true })}
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
            />
          </div>
        </div>

        <div className="flex md:flex-row md:gap-4 flex-col">
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">
                Thumbnail
              </span>
            </label>
            <input
              type="file"
              {...register("thumbnail", { required: true })}
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">
                Quantity
              </span>
            </label>
            <input
              type="number"
              placeholder="quantity"
              {...register("quantity", { required: true })}
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
            />
          </div>
        </div>
        <div className="flex md:flex-row md:gap-4 flex-col">
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">
                Images(choose multiple)
              </span>
            </label>
            <input
              type="file"
              {...register("images")}
              multiple
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">
                Color Options (separated by comma , )
              </span>
            </label>
            <input
              type="text"
              placeholder="colors"
              {...register("colors")}
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
            />
          </div>
        </div>
        <div className="flex md:flex-row md:gap-4 flex-col">
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">Code</span>
            </label>
            <input
              type="text"
              placeholder="code"
              {...register("code")}
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-xs text-[#757575] font-medium ">
                Keywords
              </span>
            </label>
            <textarea
              type="text"
              placeholder="keywords"
              {...register("keywords")}
              className="border border-info rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
            />
          </div>
        </div>

        <input
          type="submit"
          value={"Save"}
          className="border border-info py-1 px-3 mt-4 rounded-xl cursor-pointer hover:scale-110 duration-300 hover:bg-info hover:text-white hover:border-warning"
        />
      </form>

      {/* Modal */}
      {showModal1 && (
        <form
          onSubmit={handleAddNewCategory}
          className="fixed z-30 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
        >
          <div className="bg-white p-4 rounded-md flex gap-3 flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-2">Add New Category</h2>
            <input
              type="text"
              name="newCategory"
              className="border border-gray-300 rounded-md p-2 mb-2  w-72"
              placeholder="Enter category name"
            />
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal1(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {showModal2 && (
        <form
          onSubmit={handleAddNewPublication}
          className="fixed z-30 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
        >
          <div className="bg-white p-4 rounded-md flex gap-3 flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-2">Add New Publication</h2>
            <input
              type="text"
              name="newPublication"
              className="border border-gray-300 rounded-md p-2 mb-2  w-72"
              placeholder="Enter publicaton name"
            />
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal2(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      {showModal3 && (
        <form
          onSubmit={handleAddNewWriter}
          className="fixed z-30 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
        >
          <div className="bg-white p-4 rounded-md flex gap-3 flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-2">Add New Writer</h2>
            <input
              type="text"
              name="newWriter"
              className="border border-gray-300 rounded-md p-2 mb-2  w-72"
              placeholder="Enter Writers name"
            />
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal3(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      <Toaster></Toaster>
    </div>
  );
};

export default AddProduct;
