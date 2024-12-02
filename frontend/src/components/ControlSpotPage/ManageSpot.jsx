import { useEffect } from "react";
import { loadSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SpotInfo from "../LandingPage/SpotInfo";

export default function ManageSpot() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));
  //   const owner = useSelector((state) => )

  useEffect(() => {
    dispatch(loadSpots());
  }, [dispatch]);

  return (
    <>
      <h1>Manage Your Spots</h1>
      <Link className="createSpot" to="/spots/new">
        Create a New Spot
      </Link>
      <div id="mainContain">
        <div className="spotGrid">
          {spots.map((spot) => (
            <Link
              key={spot.id}
              to={`/spots/${spot.id}`}
              style={{ textDecoration: "none" }}
            >
              <SpotInfo spot={spot} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
