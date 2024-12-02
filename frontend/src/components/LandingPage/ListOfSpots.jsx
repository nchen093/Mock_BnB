import { useEffect } from "react";
import { loadSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpotInfo from "./SpotInfo";
import "./ListOfSpots.css";

function ListOfSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(loadSpots());
  }, [dispatch]);

  return (
    <>
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

export default ListOfSpots;
