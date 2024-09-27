import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAllProducts from "../../../Hooks/UseAllProducts";

const ManageStocks = () => {
  const [axiosSecure] = UseAxiosSecure();
  const [stockOutProducts, setStockOutProsucts] = useState([]);
  const { products, productsRefetch } = UseAllProducts();

  useEffect(() => {
    const stockOutProducts = products.filter((b) => b.quantity <= 5);
    setStockOutProsucts(stockOutProducts);
  }, [products]);

  const handleRestock = (productId) => {
    Swal.fire({
      title: "Submit Quantity You Want To ADD",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Restock",
      showLoaderOnConfirm: true,
      preConfirm: async (quantity) => {
        const data = { quantity };

        axiosSecure
          .patch(`/products/restock/${productId}`, data)
          .then((response) => {
            if (response.data.acknowledged) {
              productsRefetch();
              Swal.fire({
                icon: "success",
                title: "product Edited Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleDeleteProduct = async (productID) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    // If user confirms deletion
    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/products/${productID}`);
        // If deletion is successful, refetch the products data
        await productsRefetch();
        // Show success message
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        // Show error message
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  return (
    <div className="p-4">
      <div>
        <div className="overflow-x-auto py-8">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  Name <br /> Category
                </th>

                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stockOutProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-12 rounded-sm hover:scale-[3] hover:z-20">
                          <img
                            src={product.thumbnail}
                            alt={product.productName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-xs">
                          {product.productName}
                        </div>
                        <div className="text-xs opacity-50">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <p className="text-xs">
                      <span className="text-green-600">{product.quantity}</span>
                    </p>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-col">
                      <button
                        onClick={() => handleRestock(product._id)}
                        className="cursor-pointer bg-blue-500 text-xs py-1 font-medium rounded hover:bg-sky-700 text-white"
                      >
                        Re-Stock
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product?._id)}
                        className="cursor-pointer bg-red-500 text-xs py-1 font-medium rounded hover:bg-red-700 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStocks;
