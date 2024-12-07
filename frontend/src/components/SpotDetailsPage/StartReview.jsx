import { GoStarFill } from "react-icons/go";

export default function StarReview({ spots }) {
  return (
    <div className="spot-rating">
      {spots.numReviews === 1 ? (
        <strong>
          <GoStarFill style={{ color: "#ffd60a" }} />
          {spots.avgStarRating.toFixed(1)} .{spots.numReviews} Review
        </strong>
      ) : spots.numReviews > 1 ? (
        <strong>
          <GoStarFill style={{ color: "#ffd60a" }} />
          {spots.avgStarRating.toFixed(1)} .{spots.numReviews} Reviews
        </strong>
      ) : (
        <>
          <GoStarFill style={{ color: "#ffd60a" }} />
          New
        </>
      )}
    </div>
  );
}
