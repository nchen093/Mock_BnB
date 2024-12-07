import { GoStarFill } from "react-icons/go";

export default function ListSpotInfo({ spot }) {
  return (
    <div className="spotGridItem">
      <img src={spot.previewImage} alt={spot.name} />
      <div className="spotGridItemDescription" style={{ color: "#2b2b2b" }}>
        <strong className="tooltip">{spot.name}</strong>

        <div className="spotGridInfo">
          <div>
            <strong className="cityState">
              {spot.city}, {spot.state}
            </strong>
          </div>

          {spot.avgRating ? (
            <div className="spotGridItemStarRating">
              <GoStarFill style={{ color: "#ffd60a" }} />
              {spot.avgRating.toFixed(1)}
            </div>
          ) : (
            <div className="spotGridItemStarRating">
              <GoStarFill style={{ color: "#ffd60a" }} /> New
            </div>
          )}
        </div>
        <div className="spotGridItemPrice">
          <strong>${spot.price} night</strong>
        </div>
      </div>
    </div>
  );
}
