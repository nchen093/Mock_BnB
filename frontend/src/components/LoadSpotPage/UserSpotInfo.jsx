import { GoStarFill } from "react-icons/go";
import { deletedSpotThunk } from "../../store/spots";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useModal } from "../../context/Modal";
import DeleteSpotModal from "../Modals/DeleteSpotModal/DeleteSpotModal";

export default function UserSpotInfo({ spot }) {
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();

  const deleteSpot = () => {
    dispatch(deletedSpotThunk(spot.id));
    closeModal();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setModalContent(
      <DeleteSpotModal onDelete={deleteSpot} onClose={closeModal} type="Spot" />
    );
  };

  return (
    <div className="spotGridItem">
      <img loading="lazy" src={spot.previewImage} alt={spot.name} />
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

          <div>
            <Link to={`/spots/${spot.id}/edit`} className="updateButton">
              Update
            </Link>
          </div>

          <div>
            <button type="button" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
