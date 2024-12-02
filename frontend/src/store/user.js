import { csrfFetch } from "./csrf";

// GET all spots by current user
const GET_SPOTS_USER = "/user/spots/loadUserSpots";

export const loadUserSpot = () => async (dispatch) => {
  const res = await csrfFetch("/api/user/spots");

  const data = await res.json();
  dispatch({
    type: GET_SPOTS_USER,
    spots: data.spots,
  });
};
