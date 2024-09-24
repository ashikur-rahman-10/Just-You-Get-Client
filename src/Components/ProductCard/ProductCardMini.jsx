import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseHandleAddCart from "../../Hooks/UseHandleAddCart";

const ProductCardMini = ({ product }) => {
  const [show, setShow] = useState(false);
  const { price, discounts } = product;
  const discountedPrice = Math.ceil(price - price * (discounts / 100));

  const { handleAddCart } = UseHandleAddCart(product);
  return (
    <div
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
      className="flex relative md:w-52 flex-col items-center text-center border rounded-sm"
    >
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.productName}
          className=" md:w-52 md:h-52 w-full  object-cover"
        />
      </div>

      {/* Product Details */}
      <div className=" flex flex-col items-start w-full md:p-3 p-2">
        <p className="text-xs text-gray-500">{product.category}</p>
        <h2 className="mt-1  font-medium text-sm text-start line-clamp-2 h-10 text-gray-800">
          {product.productName}
        </h2>
        <p className="mt-1 text-sm md:text-base font-medium text-blue-700">
          {discountedPrice}
          <sup>tk</sup>
        </p>
        <p className=" text-gray-400 text-sm">
          <span className="line-through">{price}</span>{" "}
          <span className="text-black text-xs">-{discounts}%</span>
        </p>
      </div>
      {show && (
        <div className="absolute bottom-0 bg-gray-200 bg-opacity-80  z-30 w-full h-full duration-500">
          <div className="flex items-center justify-center w-full h-full flex-col">
            {product.quantity > 0 ? (
              <button
                onClick={handleAddCart}
                className="w-fit px-4 py-1 bg-blue-500 hover:bg-blue-700 z-40 text-white opacity-100 rounded-sm"
              >
                Add to cart
              </button>
            ) : (
              <p className="text-red-500 font-medium">Out of stock</p>
            )}
            <Link
              to={`/products/${product?._id}`}
              className="absolute bottom-0 py-2 bg-blue-500 w-full text-center hover:bg-blue-700 text-white font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardMini;
