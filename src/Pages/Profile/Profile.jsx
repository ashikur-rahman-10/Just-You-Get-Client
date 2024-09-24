import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import locationsData from "../../../public/location.json";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";

const Profile = () => {
  const [axiosSecure] = UseAxiosSecure();
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedPoliceStation, setSelectedPoliceStation] = useState("");
  const { user } = useAuth();
  const [thisUser, setThisUser] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          setThisUser(res.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [user, axiosSecure]);

  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);
    setSelectedDistrict(""); // Reset district when changing division
    setSelectedUpazila(""); // Reset upazila when changing division
    setSelectedPoliceStation(""); // Reset police station when changing division
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedUpazila(""); // Reset upazila when changing district
    setSelectedPoliceStation(""); // Reset police station when changing district
  };

  const handleUpazilaChange = (e) => {
    setSelectedUpazila(e.target.value);
    setSelectedPoliceStation(""); // Reset police station when changing upazila
  };

  const handlePoliceStationChange = (e) => {
    setSelectedPoliceStation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const phone = form.phone.value;
    const street = form.street.value;
    const postCode = form.postCode.value;

    const usersInfo = {
      phone,
      address: {
        division: selectedDivision,
        district: selectedDistrict,
        upazila: selectedUpazila,
        policeStation: selectedPoliceStation,
        street,
        postCode,
      },
    };

    axiosSecure
      .put(`/users/${user?.email}`, usersInfo)
      .then((response) => {
        console.log(response);
        if (response.data.acknowledged) {
          toast.success("Address added successfully");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      })
      .catch((error) => {
        toast.error("An error occurred while updating the user's information.");
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="pt-20">
      <div className="p-4 w-full flex flex-col">
        {/* <div className="w-36 md:w-48 h-36 md:h-48 avatar mx-auto my-10 outline outline-blue-500  rounded-full hover:scale-110">
          <img
            className="w-36 lg:w-48 mask mask-circle rounded-full mx-auto"
            src={thisUser?.photoURL}
            alt=""
          />
        </div> */}

        <div className="w-full flex flex-col justify-center min-h-[70vh] items-center">
          <div>
            <p>
              <span className="text-gray-400">Name:</span> {thisUser?.name}
            </p>
            <p>
              <span className="text-gray-400">Email:</span> {thisUser?.email}
            </p>
            <p>
              <span className="text-gray-400">Phone:</span> {thisUser?.phone}
            </p>
            <p>
              <span className="text-gray-400">Address:</span>{" "}
              {thisUser?.address?.upazila}
            </p>
            <p>
              <span className="text-gray-400">Street/postCode:</span>{" "}
              {thisUser?.address?.postCode}
            </p>
            <p>
              <span className="text-gray-400">Street/Area:</span>{" "}
              {thisUser?.address?.street}
            </p>

            <button
              className="w-fit px-4 py-1 mt-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer text-xs rounded-sm"
              onClick={() => document.getElementById("my_modal_6").showModal()}
            >
              Edit Address
            </button>
          </div>
        </div>
      </div>

      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="phone number"
                defaultValue={thisUser?.phone}
                className="input rounded-lg  input-bordered input-success  focus:outline-none  w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Division:
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedDivision}
                  onChange={handleDivisionChange}
                >
                  <option value="">Select Division</option>
                  {locationsData.divisions.map((division) => (
                    <option key={division.label} value={division.label}>
                      {division.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  District:
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  required
                  disabled={!selectedDivision}
                >
                  <option value="">Select District</option>
                  {selectedDivision &&
                    locationsData.divisions
                      .find((division) => division.label === selectedDivision)
                      ?.districts.map((district) => (
                        <option key={district.label} value={district.label}>
                          {district.label}
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Upazila:
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedUpazila}
                  onChange={handleUpazilaChange}
                  required
                  disabled={!selectedDistrict}
                >
                  <option value="">Select Upazila</option>
                  {selectedDistrict &&
                    locationsData.divisions
                      .find((division) => division.label === selectedDivision)
                      ?.districts.find(
                        (district) => district.label === selectedDistrict
                      )
                      ?.upazilas.map((upazila) => (
                        <option key={upazila.name} value={upazila.name}>
                          {upazila.name}
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Police Station:
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedPoliceStation}
                  onChange={handlePoliceStationChange}
                  required
                  disabled={!selectedUpazila}
                >
                  <option value="">Select Police Station</option>
                  {selectedUpazila &&
                    locationsData.divisions
                      .find((division) => division.label === selectedDivision)
                      ?.districts.find(
                        (district) => district.label === selectedDistrict
                      )
                      ?.upazilas.find(
                        (upazila) => upazila.name === selectedUpazila
                      )
                      ?.police_stations.map((policeStation) => (
                        <option key={policeStation} value={policeStation}>
                          {policeStation}
                        </option>
                      ))}
                </select>
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Post Code</span>
              </label>
              <input
                type="text"
                name="postCode"
                defaultValue={thisUser?.address?.postCode}
                placeholder="House no, building, street, area"
                className="input rounded-lg  input-bordered input-success  focus:outline-none  w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Street/area</span>
              </label>
              <input
                type="text"
                name="street"
                defaultValue={thisUser?.address?.street}
                placeholder="House no, building, street, area"
                className="input rounded-lg  input-bordered input-success  focus:outline-none  w-full"
              />
            </div>

            <div className="w-fit mx-auto mt-4">
              <button
                type="submit"
                className="px-4 py-1 bg-blue-500 rounded-sm cursor-pointer hover:bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <Toaster></Toaster>
    </div>
  );
};

export default Profile;
