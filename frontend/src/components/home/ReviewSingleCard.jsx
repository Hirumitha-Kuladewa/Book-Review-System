import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { FaUserCircle, FaStar, FaComment } from "react-icons/fa";
import { BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const ReviewSingleCard = ({ review }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    console.log(`Deleting review with ID: ${review._id}`);
  };

  return (
    <div className="border-2 border-[#00B4D8] rounded-lg px-4 py-4 m-4 bg-[#212121] text-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-x-2 mb-2">
        <PiBookOpenTextLight className="text-cyan-400 text-xl" />
        <h2 className="text-lg font-semibold">{review.title}</h2>
      </div>
      <div className="flex items-center gap-x-2 mb-4">
        <FaUserCircle className="text-cyan-400 text-xl" />
        <h2 className="text-base">{review.author}</h2>
      </div>
      <div className="flex items-center gap-x-2 mb-4">
        <FaComment className="text-cyan-400 text-xl" />
        <h2 className="text-base">{review.reviewText}</h2>
      </div>
      <div className="flex items-center gap-x-2 mb-4">
        <h3 className="text-base">Rating: </h3>
        {review.rating ? (
          <div className="flex items-center gap-x-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-xl ${
                  index < review.rating ? "text-yellow-400" : "text-gray-500"
                }`}
              />
            ))}
          </div>
        ) : (
          <span className="text-gray-500">No Rating</span>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div
          className="text-3xl text-cyan-500 hover:text-cyan-300 cursor-pointer transition-colors duration-300"
          role="button"
          aria-label="Show Review Details"
          onClick={() => setShowModal(true)}
        >
          <BiShow />
        </div>
        <Link to={`/reviews/details/${review._id}`}>
          <BsInfoCircle className="text-2xl text-green-500 hover:text-green-300 transition-colors duration-300" />
        </Link>
        <Link to={`/reviews/edit/${review._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-500 hover:text-yellow-300 transition-colors duration-300" />
        </Link>
        <button
          onClick={handleDelete}
          className="text-2xl text-red-500 hover:text-red-300 transition-colors duration-300"
          aria-label="Delete Review"
        >
          <MdOutlineDelete />
        </button>
      </div>
      {showModal && (
        <ReviewModal review={review} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ReviewSingleCard;
