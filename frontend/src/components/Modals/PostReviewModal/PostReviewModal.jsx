import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createReviewThunk } from "../../../store/reviews";
import StarRating from "../StarRating/StarRating";
import "./PostReview.css";

export default function PostReviewModal({ spotId, onSubmitReview }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [comment, setComment] = useState("");
  const [stars, setStar] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { comment, stars };
    await dispatch(createReviewThunk(spotId, newReview));
    if (onSubmitReview) {
      onSubmitReview();
    }
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="review-container">
        <h1>How was your stay?</h1>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your review here..."
          style={{ minWidth: "300px", minHeight: "200px" }}
        />
        <div className="star-rating">
          <StarRating rating={stars} setRating={setStar} /> Stars
          <button
            className="sub-review"
            type="submit"
            disabled={comment.length < 10 || stars === 0}
          >
            Sumbit Your Review
          </button>
        </div>
      </div>
    </form>
  );
}
