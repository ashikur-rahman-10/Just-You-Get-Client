import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";

const Categories = () => {
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

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="bg-[#d9f3ff] bg-opacity-40 min-h-screen py-10 px-4 w-full pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-fit mx-auto">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;
