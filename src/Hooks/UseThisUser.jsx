import { useEffect, useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";

const useThisUser = () => {
  const { user } = useAuth();
  //   console.log(user?.email);
  const [axiosSecure] = UseAxiosSecure();
  const [clientLoading, setClientLoading] = useState(true);
  const [client, setClient] = useState([]);

  //   get this user
  const { data: thisUser = [], refetch: thisUserRefetch } = useQuery({
    queryKey: ["thisUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  console.log(thisUser);

  //   useEffect(() => {
  //     if (user) {
  //         const fetchData = async () => {
  //           try {
  //             const res = await axiosSecure.get(`/users/${user?.email}`);
  //             setClient(res.data);
  //             console.log(res.data.client);
  //             setClientLoading(false);
  //           } catch (error) {
  //             console.error("Error fetching user data:", error);
  //           }
  //         };
  //         fetchData();
  //     }
  //   }, []);

  return { client, clientLoading };

  return {};
};

export default useThisUser;
