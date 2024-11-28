import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import ReviewsTable from "../components/home/ReviewsTable";
import ReviewsCard from "../components/home/ReviewsCard";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/reviews")
      .then((response) => {
        setReviews(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load reviews");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 min-h-screen bg-[#212121] text-gray-200">
      <div className="flex justify-center items-center gap-x-4 mb-6">
        <button
          className="px-4 py-2 rounded-lg transition-all duration-300 
          bg-cyan-600 text-white 
          hover:bg-cyan-700 hover:shadow-md 
          focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onClick={() => setShowType("table")}
        >
          Table View
        </button>
        <button
          className="px-4 py-2 rounded-lg transition-all duration-300 
          bg-cyan-600 text-white 
          hover:bg-cyan-700 hover:shadow-md 
          focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onClick={() => setShowType("card")}
        >
          Card View
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">Reviews List</h1>
        <Link
          to="/reviews/create"
          className="transition-all duration-300 
          text-cyan-400 text-4xl 
          hover:text-cyan-600 hover:scale-110"
        >
          <MdOutlineAddBox />
        </Link>
      </div>

      <div className="bg-[#2C2C2C] rounded-2xl p-6 shadow-xl">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            <p>{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-cyan-400">
            <p>No reviews yet</p>
          </div>
        ) : showType === "table" ? (
          <ReviewsTable reviews={reviews} />
        ) : (
          <ReviewsCard reviews={reviews} />
        )}
      </div>
    </div>
  );
};

export default Home;
