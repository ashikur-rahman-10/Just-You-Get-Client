import React, { useEffect, useState } from "react";
import UseThisUser from "../../Hooks/UseThisUser";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [axiosSecure] = UseAxiosSecure();
  const [items, setItem] = useState([]);
  const { client, clientLoading } = UseThisUser();
  const address = `${client?.address?.division},${client?.address?.district}, ${client?.address?.upazila}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientLoading) {
      const storedData = localStorage.getItem("orderItem");
      const orderItem = JSON.parse(storedData);
      setItem(orderItem?.items);

      if (!client.address) {
        // Show warning and prompt user to add address
        Swal.fire({
          title: "",
          text: "You have to add an address to place the order",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Step Forward",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace(`/users/${client?.name}`);
          }
        });
      }
    }
  }, [client, clientLoading]);

  const orderDetails = { items, client, deliveryCost: 70 };

  const initiatePayment = () => {
    if (client.address) {
      const response = axiosSecure
        .post("/orders", orderDetails)
        .then((response) => {
          window.location.replace(`${response.data.url}`);
        })
        .catch((error) => {
          toast.error(
            "An error occurred while updating the user's information."
          );
        });
    } else {
      toast.error("Add Address first");
    }
  };

  // Calculate total price from the items array
  const totalPrice = items.reduce(
    (total, item) => total + item.discountedPrice * item.itemCount,
    0
  );

  if (clientLoading) {
    return <CustomLoader></CustomLoader>;
  }

  return (
    <div className="px-4 font-mono max-w-xl mx-auto w-full  ">
      <div className="flex flex-col ">
        <p className="text-center py-8 text-gray-400 underline">Your Items:</p>

        <div className="overflow-x-auto max-w-lg w-full mx-auto flex">
          <table className="table w-full mx-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th> Qty</th>
                {/* <th>Item Count</th> */}
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr>
                  <td>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={i?.thumbnail} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{i?.bookName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{i?.itemCount}pcs</td>
                  <td>{i?.discountedPrice * i?.itemCount}tk</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-end  md:pr-16 pr-6 text-sm">
          <p>Products Price: {totalPrice}tk </p>
          <p className="border-b border-gray-400">Delivery Cost: + 70tk</p>
          <p>SubTotal: = {70 + totalPrice}</p>
        </div>

        <div className=" pl-6">
          <p className="py-2 text-xl">Delivered To:</p>
          <div>
            <p>Receiver Name: {client?.name}</p>
            <p className="">Email: {client?.email}</p>
            <p>Phone: {client?.phone}</p>
            <p>Address : {address}</p>
            <p>Post Code : {client.address?.postCode}</p>
            <p>Street/area: {client?.address?.street}</p>
          </div>
        </div>

        <div className="flex flex-col items-end my-8  pr-10 ">
          {client.address ? (
            <button
              onClick={initiatePayment}
              className="bg-orange-500 text-white font-semibold font-mono rounded-sm px-5 py-3 hover:bg-orange-600 hover:shadow-md "
            >
              Pay Now
            </button>
          ) : (
            <button
              disabled
              className="bg-orange-500 saturate-0 text-white font-semibold font-mono rounded-sm px-5 py-3hover:shadow-md "
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default OrderConfirmation;
