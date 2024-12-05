import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import "./SpotDetail.css";

export default function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spotInfoDetail = useSelector((state) => state.spots[spotId]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spotInfoDetail) {
      setIsLoading(false);
    }
  }, [spotInfoDetail]);

  const handleReserve = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon...");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const previewImageUrl = spotInfoDetail.SpotImages?.find(
    (image) => image.preview
  )?.url;
  const nonPreviewImages = spotInfoDetail.SpotImages?.filter(
    (image) => !image.preview
  );

  return (
    <>
      <div id="mainContainer">
        <div id="spotDetail">
          <h1>{spotInfoDetail.name}</h1>
          <h3>
            {spotInfoDetail.city}, {spotInfoDetail.state},{" "}
            {spotInfoDetail.country}
          </h3>
          <div className="spotImages">
            {previewImageUrl && (
              <img
                className="spotImagesLeftRow"
                src={previewImageUrl}
                alt={spotInfoDetail.description}
              />
            )}
            {nonPreviewImages && (
              <div className="spotImagesRightRow">
                <img src={nonPreviewImages} alt="Non-preview image" />
              </div>
            )}

            <div className="hostDetails">
              <h3>
                Hosted by {spotInfoDetail.Owner?.firstName}
                {spotInfoDetail.Owner?.lastName}
              </h3>
              <p>{spotInfoDetail.description}</p>
            </div>

            <div className="reserveContainer">
              <div>
                <strong className="spot-night">
                  ${spotInfoDetail.price} night
                </strong>
              </div>

              {spotInfoDetail.avgStarRating ? (
                <div className="starRating">
                  <GoStarFill style={{ color: "#ffd60a" }} />
                  {spotInfoDetail.avgStarRating.toFixed(1)}
                </div>
              ) : (
                <div className="starRating">
                  <GoStarFill style={{ color: "#ffd60a" }} /> New
                </div>
              )}

              <div className="dot">.</div>
              <strong className="numReview">
                {(spotInfoDetail.numReviews?.length || 0) > 1
                  ? `${spotInfoDetail.numReviews?.length} Reviews`
                  : `${spotInfoDetail.numReviews?.length} Review`}
              </strong>
              <button className="reserveBtn" onClick={handleReserve}>
                Reserve
              </button>
            </div>
          </div>
          <div className="spotDetailsLine"></div>
        </div>
      </div>
    </>
  );
}
