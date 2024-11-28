import ReviewSingleCard from "./ReviewSingleCard";

const ReviewsCard = ({ reviews }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6 bg-[#151515]">
      {reviews.map((item) => (
        <ReviewSingleCard key={item._id} review={item} />
      ))}
    </div>
  );
};

export default ReviewsCard;
