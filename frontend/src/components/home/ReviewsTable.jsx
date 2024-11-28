import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const ReviewsTable = ({ reviews }) => {
  return (
    <div className="bg-[#2C2C2C] rounded-2xl p-6 mx-auto shadow-xl w-full max-w-[800px]">
      <h2 className="text-2xl text-cyan-400 font-semibold mb-4 text-center">
        Table View
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1E1E1E] text-cyan-400">
            <th className="py-2 px-4 border border-cyan-700 rounded-md">No</th>
            <th className="py-2 px-4 border border-cyan-700 rounded-md">
              Title
            </th>
            <th className="py-2 px-4 border border-cyan-700 rounded-md hidden md:table-cell">
              Author
            </th>
            <th className="py-2 px-4 border border-cyan-700 rounded-md hidden md:table-cell">
              Review Text
            </th>
            <th className="py-2 px-4 border border-cyan-700 rounded-md">
              Rating
            </th>
            <th className="py-2 px-4 border border-cyan-700 rounded-md">
              Operations
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr
              key={review._id}
              className={`text-gray-200 ${
                index % 2 === 0 ? "bg-[#2C2C2C]" : "bg-[#212121]"
              } hover:bg-[#3A3A3A] transition-all duration-300`}
            >
              <td className="py-2 px-4 border border-cyan-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="py-2 px-4 border border-cyan-700 rounded-md text-center">
                {review.title}
              </td>
              <td className="py-2 px-4 border border-cyan-700 rounded-md text-center hidden md:table-cell">
                {review.author}
              </td>
              <td className="py-2 px-4 border border-cyan-700 rounded-md text-center hidden md:table-cell">
                {review.reviewText}
              </td>
              <td className="py-2 px-4 border border-cyan-700 rounded-md text-center">
                {review.rating ? (
                  <span className="text-yellow-400">{review.rating}</span>
                ) : (
                  <span className="text-gray-500">No Rating</span>
                )}
              </td>
              <td className="py-2 px-4 border border-cyan-700 rounded-md text-center">
                <div className="flex justify-center gap-4">
                  <Link
                    key={`details-${review._id}`}
                    to={`/reviews/details/${review._id}`}
                  >
                    <BsInfoCircle className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300" />
                  </Link>
                  <Link
                    key={`edit-${review._id}`}
                    to={`/reviews/edit/${review._id}`}
                  >
                    <AiOutlineEdit className="text-2xl text-yellow-400 hover:text-yellow-500 transition-all duration-300" />
                  </Link>
                  <Link
                    key={`delete-${review._id}`}
                    to={`/reviews/delete/${review._id}`}
                  >
                    <MdOutlineDelete className="text-2xl text-red-400 hover:text-red-500 transition-all duration-300" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTable;
