import React from "react";
import TopBanner from "../TopBanner/TopBanner";
import NewArrivals from "../NewArrivals/NewArrivals";
import ShopByCatagories from "../ShopByCatagories/ShopByCatagories";

const Home = () => {
  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <div className="pt-16">
      <TopBanner />
      <NewArrivals />
      <ShopByCatagories />
    </div>
  );
};

export default Home;
