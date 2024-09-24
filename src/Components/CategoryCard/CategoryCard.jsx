import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/categories/${category?.cat}`}
      className="relative bg-white rounded-lg shadow-lg w-full max-w-96 overflow-hidden"
      style={{ backgroundColor: category.catColor }}
    >
      <img
        src={category.catImg}
        alt={category.cat}
        className="w-full max-w-96 h-72 object-cover"
      />
      <div
        className="absolute bottom-0 left-0 right-0 bg-opacity-10 p-4 text-center"
        style={{ backgroundColor: category?.catColor, opacity: 0.7 }}
      >
        <h2 className="text-xl font-bold uppercase">{category.cat}</h2>
        <div className="border-t-2 border-gray-400 mt-2"></div>
      </div>
    </Link>
  );
};

export default CategoryCard;
