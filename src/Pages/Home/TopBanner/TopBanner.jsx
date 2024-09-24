import React from "react";
import banner from "../../../assets/bannerImg2.png";

const TopBanner = () => {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center bg-gradient-to-r from-blue-50 via-blue-200 to-blue-400 ">
      <div className="w-full lg:px-28 px-10 flex flex-col-reverse md:flex-row justify-between items-center">
        <div className="w-full flex items-center h-full justify-center">
          <div className=" md:space-y-10 space-y-6 py-10">
            <h1 className="lg:text-7xl text-4xl md:text-5xl font-medium w-[full] ">
              The Best Way to Make Someone Happy...
            </h1>
            <h2 className="md:max-w-[550px] text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
              explicabo ducimus necessitatibus ipsam suscipit magni veritatis,
              expedita sit dignissimos quam.
            </h2>
          </div>
        </div>
        <div className="w-full flex items-center h-full md:justify-end justify-center">
          <img className="md:w-96 w-72 " src={banner} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
