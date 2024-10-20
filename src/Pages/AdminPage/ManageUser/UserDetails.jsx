import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import CustomLoader from "../../../Components/CustomLoader/CustomLoader";

const UserDetails = () => {
  const { email } = useParams();
  const [axiosSecure] = UseAxiosSecure();

  // Get user details
  const {
    data: user = {},
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (userLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center mx-auto p-6 pb-16">
      {/* User Details */}
      <div className="flex flex-col items-center pt-20 mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        <img
          src={user?.photoURL}
          alt={user?.name}
          className="w-32 mask mask-circle border rounded-full"
        />
        <div>
          <p className="text-sm">
            <strong>Name:</strong> {user?.name}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> {user?.phone}
          </p>
          <p className="text-sm">
            <strong>NID Number:</strong> {user?.nidNumber}
          </p>
          <p className="text-sm">
            <strong>Address:</strong> {user?.address}
          </p>
          <p className="text-sm">
            <strong>Zipcode:</strong> {user?.zipcode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
