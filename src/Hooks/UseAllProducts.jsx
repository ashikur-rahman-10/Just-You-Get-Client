import React from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseAllProducts = () => {
  const [axiosSecure] = UseAxiosSecure();
  // get products
  const { data: products = [], refetch: productsRefetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);
      return res.data;
    },
  });
  return { products, productsRefetch };
};

export default UseAllProducts;
