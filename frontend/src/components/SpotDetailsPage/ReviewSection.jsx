import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { getSpotReviewThunk, deletedReviewThunk } from "../../store/reviews";
import { GoStarFill } from "react-icons/go";
import DeleteReviewModal from "../Modals/DeleteReviewModal/DeleteReviewModal";
import PostReviewModal from "../Modals/PostReviewModal/postReviewModal";

export default function ReviewList({ spotId }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { setModalContent, setOnModalClose, closeModal } = useModal();

  const reviewData = useSelector((state) => state.reviews);
  const reviews = reviewData[spotId];

  const spotData = useSelector((state) => state.spots);
  const selectedSpot = spotData[spotId];

  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSpotReviewThunk(spotId)).then(setIsLoading(false));
  }, [dispatch, spotId]);

  // has comment
  const numComments = reviews && reviews?.Reviews?.length > 0;

  // the total stars that has comment
  const sumStars = numComments
    ? reviews.Reviews.reduce((sum, comment) => sum + comment.stars, 0)
    : 0;

  // the avg star
  const avgStarRating = numComments
    ? (sumStars / reviews.Reviews.length).toFixed(1)
    : null;

  // hasReviewed
  const userReviewed =
    numComments &&
    currentUser &&
    reviews.Reviews.find((review) => review.userId === currentUser.id);

  // is the spot owner
  const userOwner =
    currentUser && selectedSpot && currentUser?.id === selectedSpot?.ownerId;

  const openCommentModal = () => {
    setOnModalClose(() => {});
    setModalContent(
      <PostReviewModal
        spotId={spotId}
        onSubmitReview={() => dispatch(getSpotReviewThunk(spotId))}
      />
    );
  };

  const handleDeleteClick = (reviewId) => {
    setModalContent(
      <DeleteReviewModal
        onDelete={() => handleDeleteBtn(reviewId, spotId)}
        onClose={closeModal}
        type="Review"
      />
    );
  };

  const handleDeleteBtn = async (reviewId, spotId) => {
    await dispatch(deletedReviewThunk(reviewId, spotId));
    closeModal();
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      {numComments ? (
        <>
          <h3>
            <GoStarFill style={{ color: "#ffd60a" }} />
            {avgStarRating} . {reviews.Reviews.length}
            {reviews.Reviews.length === 1 ? "Review" : "Reviews"}
          </h3>

          {/* you are not the owner and you did not comment */}
          {!userReviewed && !userOwner && currentUser && (
            <button onClick={openCommentModal}>Post Your Review</button>
          )}

          <div>
            {reviews.Reviews.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            ).map((review) => {
              const dateComment = new Date(review.updatedAt);

              return (
                <div key={review.id}>
                  <p>
                    {(review.User && review.User.firstName) ||
                      (currentUser && currentUser.firstName)}
                  </p>
                  <span>{dateComment.toLocaleDateString()}</span>
                  {currentUser &&
                    currentUser.id === review.userId &&
                    !userOwner}
                  <p>{review.comment}</p>
                  {currentUser &&
                    currentUser.id === review.userId &&
                    !userOwner && (
                      <button onClick={() => handleDeleteClick(review.id)}>
                        Delete
                      </button>
                    )}
                </div>
              );
            })}
          </div>
        </>
      ) : currentUser && !userOwner ? (
        <>
          <h2>
            <GoStarFill style={{ color: "#ffd60a" }} />
            New
          </h2>
          <p>Be the first to post a review!</p>
          <button onClick={openCommentModal}>Post your Review</button>
        </>
      ) : (
        <h3>
          <GoStarFill style={{ color: "#ffd60a" }} />
          New
        </h3>
      )}
    </div>
  );
}
