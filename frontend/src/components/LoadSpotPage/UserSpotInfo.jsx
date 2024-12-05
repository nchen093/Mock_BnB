import { GoStarFill } from "react-icons/go";
import { deletedSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useModal } from "../../context/Modal";
import DeleteSpotModal from "../Modals/DeleteSpotModal/DeleteSpot";

export default function UserSpotInfo({ spot }) {
  const dispatch = useDispatch();
  const { setModalContent, openModal, closeModal } = useModal();

  const deleteSpot = () => {
    dispatch(deletedSpot(spot.id));
    closeModal();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setModalContent(
      <DeleteSpotModal onDelete={deleteSpot} onClose={closeModal} type="Spot" />
    );
    openModal();
  };

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

          <Link to={`/spots/${spot.id}/edit`}>
            <button>Update</button>
          </Link>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </div>
  );
}
