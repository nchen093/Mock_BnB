import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import ListSpotInfo from "./ListSpotInfo";
import "./ListOfSpots.css";

const ListOfSpots = () => {
  const dispatch = useDispatch();
  const spotData = useSelector((state) => state.spots);
  const spots = Object.values(spotData).filter((spot) => spot !== undefined);

  useEffect(() => {
    dispatch(getAllSpots());
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
              <ListSpotInfo spot={spot} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListOfSpots;
