import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneSpotThunk } from "../../store/spots";
import { getSpotReviewThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";

import StarReview from "./StartReview";
import "./SpotDetail.css";
import ReviewList from "./ReviewSection";

export default function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const spotData = useSelector((state) => state.spots);
  const spots = spotData[spotId];

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    dispatch(getSpotReviewThunk(spotId)).then(() => setIsLoading(false));
  }, [dispatch, spotId]);

  const handleReserve = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon...");
  };

  if (isLoading || !spots) {
    return <div>Loading...</div>;
  }

  const previewImage = spots.SpotImages?.find((image) => image.preview)?.url;
  const nonPreviewImages = spots.SpotImages?.filter((image) => !image.preview);

  return (
    <div id="mainContainer">
      <div id="spotDetail">
        <h1>{spots.name}</h1>
        <h3>
          {spots.city}, {spots.state}, {spots.country}
        </h3>

        {/* Spot Images Section */}
        <div className="spotImages">
          {previewImage && (
            <img
              className="spotImagesLeftRow"
              src={previewImage}
              alt={`Preview of ${spots.name}`}
              loading="lazy"
            />
          )}
          {nonPreviewImages?.length > 0 && (
            <div className="spotImagesRightRow">
              {nonPreviewImages.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={`Image of ${spots.name}`}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        {/* Host Details Section */}
        <div className="hostDetails">
          {spots?.Owner?.firstName && spots?.Owner?.lastName && (
            <h3>
              Hosted by {spots.Owner.firstName} {spots.Owner.lastName}
            </h3>
          )}
          <div className="reserveContainer">
            <div className="description">
              <p>{spots.description}</p>
            </div>
            <div className="spot-night">
              <strong>${spots.price} per night</strong>
              <StarReview spots={spots} />
              <button className="reserveBtn" onClick={handleReserve}>
                Reserve
              </button>
            </div>
          </div>
        </div>
        <div className="spotDetailsLine"></div>
        <ReviewList spotId={spotId} className="review-list" />
      </div>
    </div>
  );
}
