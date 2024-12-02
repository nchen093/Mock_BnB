import { csrfFetch } from "./csrf";

//Action type
const GET_SPOT_DETAILS = "spots/getSpotDetails";

// Access to a spot's detail
export const getSpotDetail = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotDetails = await res.json();
    dispatch({ type: GET_SPOT_DETAILS, spotDetails });
  }

  return res;
};

export default function spotDetailsReducer(state = null, action) {
  switch (action.type) {
    case GET_SPOT_DETAILS:
      return action.spotDetails;
    default:
      return state;
  }
}
