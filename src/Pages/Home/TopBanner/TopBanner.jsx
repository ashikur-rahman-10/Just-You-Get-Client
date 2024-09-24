import React from "react";
import banner from "../../../assets/bannerImg2.png";

const TopBanner = () => {
  return (
    <div className="w-full lg:min-h-[100vh] flex items-center justify-center bg-gradient-to-r from-blue-50 via-blue-200 to-blue-400 ">
      <div className="w-full px-28 flex justify-between items-center">
        <div className="w-full flex items-center h-full justify-center">
          <div className=" space-y-10">
            <h1 className="text-7xl font-medium w-[full] ">
              The Best Way to Make Someone Happy...
            </h1>
            <h2 className="max-w-[550px] text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
              explicabo ducimus necessitatibus ipsam suscipit magni veritatis,
              expedita sit dignissimos quam.
            </h2>
          </div>
        </div>
        <div className="w-full flex items-center h-full justify-end">
          <img className="max-w-96" src={banner} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
