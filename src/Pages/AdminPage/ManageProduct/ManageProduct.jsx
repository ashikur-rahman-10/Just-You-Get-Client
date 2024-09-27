import React, { useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAllProducts from "../../../Hooks/UseAllProducts";
import EditProduct from "../EditProduct/EditProduct";

const ManageProduct = () => {
  const [axiosSecure] = UseAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [modalID, setModalID] = useState(null);

  // get all Products
  const { products, productsRefetch } = UseAllProducts();
  // Function to handle product deletion
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

  const handleOpenModal = (_id) => {
    setModalID(_id);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-center font-medium text-lg underline text-green-900">
        All products : {products?.length}
      </h1>
      <div>
        <div className="overflow-x-auto py-8">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  Name <br />
                  Category
                </th>
                <th>
                  Price <br />
                  Discounts
                </th>
                <th>
                  Writer
                  <br />
                  Publications
                </th>
                <th>
                  Quantity <br />
                  Sold
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className=" w-10 h-12 rounded-sm hover:scale-[3] hover:z-20">
                          <img src={p?.thumbnail} alt={p?.productName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-xs">
                          {p?.productName}
                        </div>
                        <div className="text-xs opacity-50">{p?.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-xs">
                    TK.{p?.price}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {p?.discounts}%
                    </span>
                  </td>
                  <td className="text-xs">
                    {p?.writerName}
                    <br />
                    <span className="opacity-60"> {p?.publications}</span>
                  </td>
                  <td>
                    <p className="text-xs">
                      <span className="text-green-600">{p?.quantity}</span>
                      <br />
                      <span className="text-gray-400">{p?.sold}</span>
                    </p>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-col">
                      <button
                        className="cursor-pointer bg-red-500 text-xs font-medium rounded hover:bg-red-700 text-white"
                        onClick={() => handleDeleteProduct(p?._id)}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          handleOpenModal(p._id);
                        }}
                        className="cursor-pointer bg-sky-500 text-xs font-medium rounded hover:bg-sky-700 text-white"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center h-screen bg-gray-500 bg-opacity-40 ">
          <div className="modal-box md:w-11/12 w-full max-w-5xl">
            <form method="dialog">
              {/* Close button */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </form>
            {/* EditProduct component */}
            <EditProduct
              id={modalID}
              setShowModal={setShowModal}
              productsRefetch={productsRefetch}
            ></EditProduct>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
