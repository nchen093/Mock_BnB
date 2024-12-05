// import { csrfFetch } from "./csrf";

// //Action Types
// const GET_Reviews = "/spots/loadReviews";
// const GET_USER_REVIEWS = "/spots/loadComments";
// const POST_Review = "/spots/createReview";
// const DELETE_Review = "/spots/deleteReview";

// // action creator
// const loadReviews = ({ spotId, comments }) => {
//   return {
//     type: GET_Reviews,
//     reviews: { spotId, comments },
//   };
// };

// const loadUserReviews = ({ userId, comments }) => {
//   return {
//     type: GET_USER_REVIEWS,
//     reviews: { userId, comments },
//   };
// };

// const postReview = (payload) => {
//   return {
//     type: POST_Review,
//     payload,
//   };
// };

// const removedReview = ({ userId, spotId }) => {
//   return {
//     type: DELETE_Review,
//     userId,
//     spotId,
//   };
// };

// // Thunk
// //Get all reviews by a spot's id
// export const getSpotReviewThunk = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
//   if (res.ok) {
//     const comments = await res.json();
//     dispatch(loadReviews({ spotId, comments }));
//     return comments;
//   } else {
//     const error = await res.json();
//     return error;
//   }
// };

// //Create a Review for spot based on the spot's id
// export const createReviewThunk = (spotId, review) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//     method: "POST",
//     body: JSON.stringify(review),
//   });

//   if (res.ok) {
//     const newReview = await res.json();
//     dispatch(postReview(newReview));
//     return newReview;
//   } else {
//     const error = await res.json();
//     return error;
//   }
// };

// // Delete Review

// const initialState = {};

// export default function reviewsReducer(state = initialState, action) {
//   switch (action.type) {
//     case GET_Reviews: {
//       const { spotId, reviews } = action.reviews;
//       return {
//         ...state,
//         [spotId]: reviews,
//       };
//     }
//     case POST_Review: {
//       return {
//         ...state,
//         [action.payload.id]:action.payload;
//       }
//     }

//     default:
//       return state;
//   }
// }
