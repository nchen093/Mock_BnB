import { csrfFetch } from "./csrf";

// GET ALL SPOTS
const GET_SPOTS = "/spots/loadSpots";

export const loadSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  const data = await res.json();
  const spots = data.Spots;
  dispatch({ type: GET_SPOTS, spots });
  return res;
};

//CREATE A SPOT
const CREATE_SPOT = "/spots/createSpot";
export const postSpot = (newSpot, url) => async (dispatch) => {
  newSpot.lat = 80;
  newSpot.lng = -80;

  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(newSpot),
  });

  const createdSpot = await res.json();

  await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
    method: "POST",
    body: JSON.stringify({ url, preview: true }),
  });

  dispatch({ type: CREATE_SPOT, spot: createdSpot });
  return createdSpot;
};

// Edit a spot
// export const putSpot = (body, spotId) => async () => {
//   const res = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "PUT",
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// };

// DELTE a spot
// export const deleteSpot = (spotId) => async () => {
//   const res = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "DELETE",
//   });

//   return await res.json();
// };

// export const deleteSpotImage = (spotId, imageId) => async () => {
//   const res = await csrfFetch(`/api/${spotId}/spot-images/${imageId}`, {
//     method: "DELETE",
//   });

//   return await res.json();
// };

// export default function spotsReducer(state = {}, action) {
//   switch (action.type) {
//     case "GET_SPOT":
//       return action.spots.reduce((spots, spot) => {
//         spots[spot.id] = spot;
//         return spots;
//       }, {});

const initialState = {};

export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SPOTS:
      return action.spots.reduce((spots, spot) => {
        spots[spot.id] = spot;
        return spots;
      }, {});
    case CREATE_SPOT:
      return {
        ...state,
        [action.spot.id]: action.spot,
      };

    default:
      return state;
  }
}
