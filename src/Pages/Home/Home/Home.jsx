import React from "react";
import TopBanner from "../TopBanner/TopBanner";

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
    </div>
  );
};

export default Home;
