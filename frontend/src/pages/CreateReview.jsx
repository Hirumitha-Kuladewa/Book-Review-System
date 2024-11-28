import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateReview = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveReview = () => {
    if (
      !title.trim() ||
      !author.trim() ||
      !reviewText.trim() ||
      rating === null
    ) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      return;
    }

    const data = {
      title,
      author,
      reviewText,
      rating,
    };
    setLoading(true);
    axios
      .post("http://localhost:3000/reviews", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error creating review", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="p-4 min-h-screen bg-[#212121] text-gray-200">
      <BackButton />
      <h1 className="text-3xl my-6 text-center text-cyan-400 font-bold">
        Create Review
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
                placeholder="Enter book title"
                className="w-full px-4 py-2 bg-[#212121] text-gray-200 border-2 border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
            </div>
            <div className="my-4">
              <label className="text-xl block mb-2 text-cyan-400">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter book author"
                className="w-full px-4 py-2 bg-[#212121] text-gray-200 border-2 border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
            </div>
            <div className="my-4">
              <label className="text-xl block mb-2 text-cyan-400">
                Review text
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Enter review text"
                rows="5"
                className="w-full px-4 py-2 bg-[#212121] text-gray-200 border-2 border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
            </div>
            <div className="my-4">
              <label className="text-xl block mb-2 text-cyan-400">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button
              className="w-full p-3 mt-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onClick={handleSaveReview}
            >
              Create Review
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateReview;
