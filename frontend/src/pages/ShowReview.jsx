import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { FaStar } from "react-icons/fa";

const ShowReview = () => {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/reviews/${id}`)
      .then((response) => {
        setReview(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4 min-h-screen bg-[#212121] text-gray-200">
      <BackButton />
      <h1 className="text-4xl font-bold text-cyan-400 text-center my-6 drop-shadow-lg">
        Review Details
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center bg-[#2C2C2C] shadow-2xl rounded-3xl w-11/12 md:w-2/3 lg:w-1/2 mx-auto p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          {[
            { icon: "fas fa-id-badge", label: "ID", value: review._id },
            { icon: "fas fa-book", label: "Title", value: review.title },
            { icon: "fas fa-user", label: "Author", value: review.author },
            {
              icon: "fas fa-calendar-alt",
              label: "Review text",
              value: review.reviewText,
            },
            {
              icon: "fas fa-clock",
              label: "Created At",
              value: review.createdAt
                ? new Date(review.createdAt).toLocaleString()
                : "N/A",
            },
            {
              icon: "fas fa-sync-alt",
              label: "Updated At",
              value: review.updatedAt
                ? new Date(review.updatedAt).toLocaleString()
                : "N/A",
            },
          ].map((detail, index) => (
            <div
              key={detail.label}
              className="my-2 flex items-center w-full p-3 rounded-lg transition-colors duration-200 hover:bg-cyan-900 hover:bg-opacity-20"
            >
              <span className="text-lg font-semibold text-cyan-400 w-1/3 flex items-center">
                <i className={`${detail.icon} mr-2`}></i> {detail.label}:
              </span>
              <span className="ml-4 text-lg text-gray-300 w-2/3">
                {detail.value || "N/A"}
              </span>
            </div>
          ))}

          <div className="flex items-center gap-x-2 mt-4">
            <h3 className="text-lg font-semibold text-cyan-400">Rating:</h3>
            {review.rating ? (
              <div className="flex items-center gap-x-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-xl ${
                      index < review.rating
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
            ) : (
              <span className="text-gray-500">No Rating</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowReview;
