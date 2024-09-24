import React, { useEffect, useState } from "react";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import Pagination from "../../Components/Pagination/Pagination";
import ProductCard from "../../Components/ProductCard/ProductCard";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetch(`https://just-you-get.vercel.app/products?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setproducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [currentPage]);

  if (!products) {
    return <CustomLoader />;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <div className="pt-20 min-h-screen w-fit max-w-7xl mx-auto px-2">
      <div className="grid md:grid-cols-4 lg:grid-cols-4 grid-cols-2 md:gap-6 gap-2 pt-4 mx-auto w-fit mb-8">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product}></ProductCard>
        ))}
      </div>

      <div className="w-full flex justify-end md:px-20 py-5 px-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllProducts;
