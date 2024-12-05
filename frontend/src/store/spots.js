import { csrfFetch } from "./csrf";

// Action Types
const GET_SPOTS = "/spots/loadSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const CREATE_SPOT = "/spots/createSpot";
const CREATE_IMAGE = "/spots/createImage";
const UPDATE_SPOT = "/spots/updateSpot";
const DELETE_SPOT = "/spots/deleteSpot";
const DELETE_SPOT_DETAILS = "/spots/deleteSpotDetails";

//action creator
const loadSpots = (spots) => {
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

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot,
  };
};

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
};

const createImage = (data) => {
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
export const getAllSpot = () => async (dispatch) => {
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
    console.log("Fetched spots:", data.Spots);
    const spots = data.Spots;
    dispatch(loadSpots(spots));
    return spots;
  } else {
    const error = await res.json();
    return error;
  }
};

//Access the spot detail by spotId
export const getOneSpot = (spotId) => async (dispatch) => {
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
export const postSpot = (body) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(createSpot(newSpot));
    return newSpot;
  } else {
    const error = await res.json();
    return error;
  }
};

// Edit a spot
export const putSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot;
  } else {
    const error = await res.json();
    return error;
  }
};

// Add Images base on spotId
export const postImage = (imageData) => async (dispatch) => {
  const { spotId, url, preview } = imageData;
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, preview }),
  });

  if (res.ok) {
    const newImage = await res.json();
    dispatch(createImage(newImage));
    return newImage;
  } else {
    const error = await res.json();
    return error;
  }
};

// DELETE A SPOT
export const deletedSpot = (spotId) => async (dispatch) => {
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
    case GET_SPOTS:
      return action.spots.reduce((spots, spot) => {
        spots[spot.id] = spot;
        return spots;
      }, {});

    case GET_SPOT_DETAILS:
      newState[action.payload.id] = action.spot;
      return newState;

    case CREATE_SPOT:
      newState[action.payload.id] = action.spot;
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
