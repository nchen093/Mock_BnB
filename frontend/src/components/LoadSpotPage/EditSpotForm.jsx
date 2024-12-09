import SpotForm from "./SpotForm";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";

const EditSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);

  //collect the history data that you create a spot
  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  return <SpotForm spot={spot} formType="Update Your Spot" />;
};

export default EditSpotForm;
