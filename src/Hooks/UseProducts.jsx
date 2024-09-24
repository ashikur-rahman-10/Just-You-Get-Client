import { useEffect, useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseProducts = (page) => {
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [axiosSecure] = UseAxiosSecure();

  // Get products
  const {
    data: objects = {},
    refetch: productsRefetch,
    isError,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?page=${page}`);
      return res.data;
    },
    onError: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (
      objects &&
      objects.totalPages !== undefined &&
      objects.products !== undefined
    ) {
      setTotalPages(objects.totalPages);
      setproducts(objects.products);
    } else {
      setTotalPages(1);
      setproducts([]);
    }
    setLoading(false);
  }, [objects]);

  useEffect(() => {
    setLoading(true);
    productsRefetch();
  }, [page]);

  return { products, totalPages, loading, isError };
};

export default UseProducts;
