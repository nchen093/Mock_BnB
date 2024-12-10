import { csrfFetch } from "./csrf";

// Action Types
const GET_SPOTS = "/spots/loadSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const POST_SPOT = "/spots/createSpot";
const CREATE_IMAGE = "/spots/createImage";
const UPDATE_SPOT = "/spots/updateSpot";
const DELETE_SPOT = "/spots/deleteSpot";
const DELETE_SPOT_DETAILS = "/spots/deleteSpotDetails";

//action creator
export const loadSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

const loadOneSpotDetail = (spot) => {
  return {
    type: GET_SPOT_DETAILS,
    payload: spot,
  };
};
// action
const postSpot = (payload) => {
  return {
    type: POST_SPOT,
    payload,
  };
};

const updatedSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
};

const createdImage = (data) => {
  return {
    type: CREATE_IMAGE,
    payload: data,
  };
};

const removeSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId,
  };
};

//Thunk
export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  const data = await res.json();
  const spots = data.Spots;
  dispatch(loadSpots(spots));
  return spots;
};

//Manage a spot under a certain user
export const userSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/user/spots");

  if (res.ok) {
    const data = await res.json();

    const spots = data.Spots;
    dispatch(loadSpots(spots)); // communicate with redux
    return data;
  } else {
    const error = await res.json();
    return error;
  }
};

//Access the spot detail by spotId
export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotDetails = await res.json();
    dispatch(loadOneSpotDetail(spotDetails));
    return spotDetails;
  } else {
    const error = await res.json();
    return error;
  }
};

//CREATE A SPOT
export const postSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const newSpot = await res.json(); // Javascript can read
    dispatch(postSpot(newSpot));
    return newSpot;
  } else {
    const error = await res.json();
    return error;
  }
};

// Edit a spot
export const putSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const editSpot = await res.json();
    dispatch(updatedSpot(editSpot));
    return editSpot;
  } else {
    const error = await res.json();
    return error;
  }
};

// Add Images base on spotId
export const postImageThunk = (image) => async (dispatch) => {
  const { spotId, url, preview } = image;
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify({ url, preview }),
  });

  if (res.ok) {
    const newImage = await res.json();
    dispatch(createdImage(newImage));
    return newImage;
  } else {
    const error = await res.json();
    return error;
  }
};

// DELETE A SPOT
export const deletedSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeSpot(spotId));
  } else {
    const error = await res.json();
    return error;
  }
};

export const deleteSpotDetails = () => ({ type: DELETE_SPOT_DETAILS });

const initialState = {};

export default function spotsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_SPOTS: {
      const newState = {};
      action.spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    }

    case GET_SPOT_DETAILS:
      newState[action.payload.id] = action.payload;
      return newState;

    case POST_SPOT:
      newState[action.payload.id] = action.payload;
      return newState;

    case UPDATE_SPOT:
      newState[action.payload.id] = action.payload;
      return newState;

    case CREATE_IMAGE:
      newState[action.payload.id] = action.payload;
      return newState;

    case DELETE_SPOT:
      delete newState[action.payload];
      return newState;

    case DELETE_SPOT_DETAILS:
      return initialState;

    default:
      return state;
  }
}
