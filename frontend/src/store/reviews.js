import { csrfFetch } from "./csrf";

//Action Types
const GET_Reviews = "/spots/loadReviews";
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

const postReview = (review) => {
  return {
    type: POST_Review,
    review,
  };
};

const removedReview = (reviewId) => {
  return {
    type: DELETE_Review,
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
export const deletedReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const deleteReview = await res.json();
    dispatch(removedReview(deleteReview));
    return deleteReview;
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
      const newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    }
    case DELETE_Review: {
      const newState = { ...state };
      newState[action.deleteReview] = action.deleteReview;
      return newState;
    }

    default:
      return state;
  }
}
