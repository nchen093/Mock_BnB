import { csrfFetch } from "./csrf";

//Action Types
const GET_Reviews = "/spots/loadReviews";
const GET_USER_REVIEWS = "/spots/loadComments";
const POST_Review = "/spots/createReview";
const DELETE_Review = "/spots/deleteReview";

// action creator
const loadReviews = ({ spotId, comments }) => {
  return {
    type: GET_Reviews,
    spotId,
    comments,
  };
};

const loadUserReviews = ({ userId, comments }) => {
  return {
    type: GET_USER_REVIEWS,
    userId,
    comments,
  };
};

const postReview = (review) => {
  return {
    type: POST_Review,
    review,
  };
};

const removedReview = ({ spotId, reviewId }) => {
  return {
    type: DELETE_Review,
    spotId,
    reviewId,
  };
};

// Thunk
//Get reviews by a spot's id
export const getSpotReviewThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(loadReviews({ spotId, comments }));
    return comments;
  } else {
    const error = await res.json();
    return error;
  }
};

//Get the review base on user's Id
export const getUserSpotReviewThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadUserReviews(reviews));
    return reviews;
  } else {
    const error = await res.json();
    return error;
  }
};

//Create a Review for spot based on the spot's id
export const createReviewThunk = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(postReview(newReview));
    return newReview;
  } else {
    const error = await res.json();
    return error;
  }
};

// Delete Review
export const deletedReviewThunk = (reviewId, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removedReview({ spotId, reviewId }));
  } else {
    const error = await res.json();
    return error;
  }
};

const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_Reviews: {
      const { spotId, comments } = action;
      return {
        ...state,
        [spotId]: comments,
      };
    }
    case POST_Review: {
      const { review } = action;
      const spotId = action.review.spotId;
      return {
        ...state,
        [spotId]: [...(state[spotId] || []), review],
      };
    }
    case DELETE_Review: {
      const { spotId, reviewId } = action;
      return {
        ...state,
        [spotId]: state[spotId].filter((review) => review.id !== reviewId),
      };
    }
    default:
      return state;
  }
}
