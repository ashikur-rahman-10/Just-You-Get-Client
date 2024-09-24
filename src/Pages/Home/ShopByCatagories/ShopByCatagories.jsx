import React from "react";
import UseAllProducts from "../../../Hooks/UseAllProducts";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import CategoryCard from "../../../Components/CategoryCard/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ShopByCatagories = () => {
  const [axiosSecure] = UseAxiosSecure();

  // Get categories
  const { data: categories = [], refetch: categoriesRefetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/categories`);
      return res.data;
    },
  });

  if (!categories) {
    return <CustomLoader />;
  }

  return (
    <div className="w-full max-w-7xl py-10 mx-auto px-2">
      <div className="w-full flex justify-center">
        <h1 className="text-center text-2xl md:text-4xl font-medium border-b-4 border-orange-600 w-fit text-blue-900">
          Shop by Categories
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-fit mx-auto py-10">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default ShopByCatagories;
