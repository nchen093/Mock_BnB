import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { getSpotReviewThunk, deletedReviewThunk } from "../../store/reviews";
import { GoStarFill } from "react-icons/go";
import DeleteReviewModal from "../Modals/DeleteReviewModal/DeleteReviewModal";
import PostReviewModal from "../Modals/PostReviewModal/PostReviewModal";

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
    dispatch(getSpotReviewThunk(spotId)).then(() => setIsLoading(false));
  }, [dispatch, spotId]);

  // Check if there are reviews
  const numComments = reviews?.Reviews?.length > 0;

  // Calculate total stars for the reviews
  const sumStars = numComments
    ? reviews.Reviews.reduce((sum, comment) => sum + comment.stars, 0)
    : 0;

  // Average star rating
  const avgStarRating = numComments
    ? (sumStars / reviews.Reviews.length).toFixed(1)
    : null;

  // Check if the user has already reviewed
  const userReviewed =
    numComments &&
    currentUser &&
    reviews.Reviews.some((review) => review.userId === currentUser.id);

  // Check if the current user is the spot owner
  const userOwner =
    currentUser && selectedSpot && currentUser.id === selectedSpot.ownerId;

  // Open the Post Review Modal
  const openCommentModal = () => {
    setOnModalClose(() => {});
    setModalContent(
      <PostReviewModal
        spotId={spotId}
        onSubmitReview={() => dispatch(getSpotReviewThunk(spotId))}
      />
    );
  };

  // Open the Delete Review Modal
  const handleDeleteClick = (reviewId) => {
    setModalContent(
      <DeleteReviewModal
        onDelete={() => handleReviewDelete(reviewId)}
        onClose={closeModal}
        type="Review"
      />
    );
  };

  // Handle review deletion
  const handleReviewDelete = async (reviewId) => {
    await dispatch(deletedReviewThunk(reviewId));
    closeModal();
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  // Sort reviews before rendering
  const sortedReviews = reviews.Reviews.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div>
      {numComments ? (
        <>
          <h3>
            <GoStarFill style={{ color: "#ffd60a" }} />
            {avgStarRating} . {reviews.Reviews.length}
            {reviews.Reviews.length === 1 ? " Review" : " Reviews"}
          </h3>

          {/* User can post a review if they haven't already, and they aren't the spot owner */}
          {!userReviewed && !userOwner && currentUser && (
            <button onClick={openCommentModal}>Post Your Review</button>
          )}

          <div>
            {sortedReviews.map((review) => {
              const dateComment = new Date(review.updatedAt);

              return (
                <div key={review.id}>
                  <p>
                    {(review.User && review.User.firstName) ||
                      (currentUser && currentUser.firstName)}
                  </p>
                  <span>{dateComment.toLocaleDateString()}</span>
                  <p>{review.comment}</p>
                  <div>
                    {currentUser &&
                      currentUser.id === review.userId &&
                      !userOwner && (
                        <button
                          className="reviewDelbtn"
                          onClick={() => handleDeleteClick(review.id)}
                        >
                          Delete
                        </button>
                      )}
                  </div>
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
