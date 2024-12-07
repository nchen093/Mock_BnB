import "./DeleteReview.css";

export default function DeleteReviewModal({ onDelete, onClose, type }) {
  return (
    <div className="delete-msg">
      <h1>Confirm Delete</h1>
      <em>Ar your sure you want to delete this review?</em>
      <button className="delete-review" onClick={onDelete}>
        Yes(Delete {type})
      </button>
      <button onClick={onClose}>No (Keep {type})</button>
    </div>
  );
}
