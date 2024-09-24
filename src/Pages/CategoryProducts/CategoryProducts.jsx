import React from "react";
import { useParams } from "react-router-dom";
import UseAllProducts from "../../Hooks/UseAllProducts";
import ProductCard from "../../Components/ProductCard/ProductCard";

const CategoryProducts = () => {
  const { category } = useParams();
  const { products } = UseAllProducts();
  const filteredProducts = products.filter(
    (product) => product?.category == category
  );

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="pt-20">
      <div className="w-full flex justify-center">
        <h1 className="text-center text-2xl md:text-3xl font-medium border-b-4 border-orange-600 w-fit text-blue-900">
          {category}
        </h1>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 py-6 mx-auto w-fit">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      ) : (
        <div className="w-full  min-h-[70vh] flex items-center justify-center text-gray-400">
          <h1>Empty!</h1>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
