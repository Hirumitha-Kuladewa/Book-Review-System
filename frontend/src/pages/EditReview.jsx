import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditReview = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/reviews/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setReviewText(response.data.reviewText);
        setTitle(response.data.title);
        setRating(response.data.rating || 0);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error fetching review details", { variant: "error" });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditReview = () => {
    if (!title || !author || !reviewText || rating === 0) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      return;
    }

    const data = { title, author, reviewText, rating };
    setLoading(true);
    axios
      .put(`http://localhost:3000/reviews/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error editing review", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4 min-h-screen bg-[#212121] text-gray-200">
      <BackButton />
      <h1 className="text-3xl my-6 text-center text-cyan-400 font-bold">
        Edit Review
      </h1>

      <div className="flex flex-col bg-[#2C2C2C] rounded-2xl w-full max-w-[600px] p-8 mx-auto shadow-xl">
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="my-4">
              <label className="text-xl block mb-2 text-cyan-400">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-[#212121] text-gray-200 border-2 border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
            </div>
            <div className="my-4">
              <label className="text-xl block mb-2 text-cyan-400">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 bg-[#212121] text-gray-200 border-2 border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
            </div>
            <div className="my-4">
              <label className="text-xl block mb-2 text-cyan-400">
                Review Text
              </label>
              <input
                type="text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-2 bg-[#212121] text-gray-200 border-2 border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
            </div>
            <div className="my-4">
              <label className="text-xl block mb-2 text-cyan-400">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setRating(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 cursor-pointer ${
                      rating >= star ? "text-yellow-400" : "text-gray-400"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9" />
                  </svg>
                ))}
              </div>
            </div>
            <button
              className="w-full p-3 mt-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onClick={handleEditReview}
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditReview;
