import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpot } from "../../store/spots";
import SpotInfo from "./SpotInfo";
import "./ListOfSpots.css";

const ListOfSpots = () => {
  const dispatch = useDispatch();
  const spotData = useSelector((state) => state.spots);
  const spots = Object.values(spotData).filter((spot) => spot !== undefined);

  useEffect(() => {
    dispatch(getAllSpot());
  }, [dispatch]);

  console.log(spotData);

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
};

export default ListOfSpots;
