import React from "react";
import UseAllProducts from "../../../Hooks/UseAllProducts";
import ProductCard from "../../../Components/ProductCard/ProductCard";

const NewArrivals = () => {
  const { products, productsRefetch } = UseAllProducts();

  // Sort products by postedIn date in descending order
  const sortedProducts = products?.sort((a, b) => {
    return new Date(b.postedIn) - new Date(a.postedIn); // Sort by date descending
  });

  const sliced = sortedProducts.slice(0, 4);

  return (
    <div className="w-full max-w-7xl py-10 mx-auto px-2">
      <div className="w-full flex justify-center">
        <h1 className="text-center text-3xl md:text-4xl font-medium border-b-4 border-orange-600 w-fit text-blue-900">
          New Arrivals
        </h1>
      </div>
      <div className="grid md:grid-cols-4 lg:grid-cols-4 grid-cols-2 md:gap-6 gap-2 py-10 mx-auto w-fit">
        {sliced?.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
