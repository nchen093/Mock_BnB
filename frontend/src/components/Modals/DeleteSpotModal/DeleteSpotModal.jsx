import "./DeleteSpot.css";

export default function DeleteSpotModal({ onDelete, onClose, type }) {
  return (
    <div className="confirm-msg">
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to remove this spot from the listings? </h3>
      <button className="deletebtn" onClick={onDelete}>
        Yes (Delete {type})
      </button>
      <button onClick={onClose}>No (Keep {type})</button>
    </div>
  );
}
