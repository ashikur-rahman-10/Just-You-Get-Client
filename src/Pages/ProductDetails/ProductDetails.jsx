import React from "react";
import { Link, useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { FaPen, FaRuler } from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import UseAdmin from "../../Hooks/UseAdmin";
import UseHandleAddCart from "../../Hooks/UseHandleAddCart";
import UseAllProducts from "../../Hooks/UseAllProducts";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductCardMini from "../../Components/ProductCard/ProductCardMini";

const ProductDetails = () => {
  const { id } = useParams();
  const { admin } = UseAdmin();
  const { products } = UseAllProducts();
  const [axiosSecure] = UseAxiosSecure();

  // Get product data
  const { data: product = {}, refetch: productRefetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { handleAddCart } = UseHandleAddCart(product);

  const { images = [], _id, discounts, price, sold, code } = product;

  const discountPrice = price - price * (discounts / 100);
  const roundPrice = Math.ceil(discountPrice);

  // Filter products that match the current product's code
  const filtered = products.filter((p) => p.code == code);

  // Create an array of variant products excluding the current product
  let Variants = products.filter((p) => p.code == code && p._id !== _id);

  if (!product) {
    return <CustomLoader />;
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="w-full flex lg:flex-row flex-col py-4 relative pt-16">
      <div className="lg:w-4/6 mx-auto flex flex-col md:flex-row">
        <div className="w-full h-fit md:w-full mx-auto relative">
          <div className="product-details h-[500px] w-full">
            {images.length > 0 ? (
              <Carousel autoPlay={true}>
                {images.map((thumbnail, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      className="mg:max-h-96 max-h-96 rounded-md mask mask-square"
                      src={thumbnail}
                      alt={`Slide ${index}`}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}
          </div>

          {product?.discounts > 0 && (
            <div className="absolute z-10 bg-blue-600 w-20 h-20 rounded-es-badge flex items-center justify-center -bottom-0 -right-0 text-white text-2xl font-bold">
              <p className="leading-none">
                <span className="m-0 leading-none">{product?.discounts}%</span>
                <br />
                <span className="leading-none">Off</span>
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex items-center p-4 md:min-h-96">
          <div className="space-y-4">
            <p className="text-2xl font-medium text-[#757575]">
              {product?.productName}
            </p>
            <p>
              Category:{" "}
              <Link
                to={`/categories/${product.category}`}
                className="cursor-pointer hover:underline"
              >
                {product?.category}
              </Link>
            </p>
            <div className="flex gap-2 text-xl font-medium items-center">
              {product?.discounts > 0 && (
                <p className="line-through text-red-500">TK.{product?.price}</p>
              )}
              <p className="text-blue-500">TK.{roundPrice}</p>
              {discounts > 0 && (
                <p className="text-xs">You save {discounts}%</p>
              )}
            </div>
            {sold > 0 && (
              <p className="text-xs text-warning font-medium">Sold: {sold}</p>
            )}
            <button
              onClick={handleAddCart}
              className="w-fit px-4 py-1 my-4 bg-blue-600 hover:bg-blue-700 z-40 text-white opacity-100 rounded-sm"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <hr className="m-4 lg:hidden" />

      <div className="lg:w-2/6 w-full lg:min-h-[100vh] lg:border-l">
        <h1 className="text-center text-blue-600 py-4">Other Color Variants</h1>

        <div className="grid  top-16 md:grid-cols-4   grid-cols-2 md:gap-6 lg:grid-cols-2 gap-4 p-2 mx-auto w-fit">
          {Variants.map((variant) => (
            <ProductCardMini
              key={variant?._id}
              product={variant}
            ></ProductCardMini>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
