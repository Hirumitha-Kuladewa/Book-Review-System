import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ review, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-[#1C1C1C] text-gray-200 rounded-xl p-6 flex flex-col relative shadow-2xl"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300"
          onClick={onClose}
        />
        <div className="flex justify-start items-center gap-x-2 mt-4">
          <PiBookOpenTextLight className="text-cyan-500 text-3xl" />
          <h2 className="text-xl font-semibold">{review.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2 mt-4">
          <BiUserCircle className="text-cyan-500 text-3xl" />
          <h2 className="text-lg">{review.author}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2 mt-4">
          <BiUserCircle className="text-cyan-500 text-3xl" />
          <h2 className="text-lg">{review.reviewText}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2 mt-4">
          <h2 className="text-lg">Rating: </h2>
          {review.rating != null ? (
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
      </div>
    </div>
  );
};

export default ReviewModal;
