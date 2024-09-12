import React from "react";
import { Vortex, Watch } from "react-loader-spinner";

const CustomLoader = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex justify-center items-center bg-white">
        render(
        <Watch
          visible={true}
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        )
      </div>
    </div>
  );
};

export default CustomLoader;
