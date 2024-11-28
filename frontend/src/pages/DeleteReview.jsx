import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteReview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  if (!id) {
    enqueueSnackbar("Invalid review ID", { variant: "error" });
    navigate("/");
    return null;
  }

  const handleDeleteReview = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/reviews/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting review", { variant: "error" });
        console.error("Error deleting review:", error);
      });
  };

  return (
    <div className="p-4 min-h-screen bg-[#212121] text-gray-200">
      <BackButton />
      <h1 className="text-3xl my-6 text-center text-cyan-400 font-bold">
        Delete Review
      </h1>

      <div className="flex flex-col items-center bg-[#2C2C2C] rounded-2xl w-full max-w-[600px] p-8 mx-auto shadow-xl">
        {loading ? (
          <div className="flex justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <h3 className="text-2xl text-center mb-6 text-gray-300">
              Are you sure you want to delete this review?
            </h3>

            <div className="flex space-x-4 w-full">
              <button
                className="flex-1 p-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleDeleteReview}
              >
                Yes, Delete it
              </button>
              <button
                className="flex-1 p-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteReview;
