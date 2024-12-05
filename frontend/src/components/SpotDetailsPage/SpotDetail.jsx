import { useState } from "react";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GoStarFill } from "react-icons/go";
import "./SpotDetail.css";

export default function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots);
  const spotInfoDetail = spots[spotId];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getOneSpot(spotId)).then(() => setIsLoading(false));
  }, [dispatch, spotId]);

  const handleReserve = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon...");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const previewImage = spotInfoDetail.SpotImages?.find(
    (image) => image.preview
  ).url;
  const nonPreviewImages = spotInfoDetail.SpotImages?.filter(
    (image) => !image.preview
  );

  return (
    <>
      <div id="mainContainer">
        <div id="spotDetail">
          <h1>{spotInfoDetail?.name}</h1>
          <h3>
            {spotInfoDetail?.city}, {spotInfoDetail?.state},{" "}
            {spotInfoDetail?.country}
          </h3>
          <div className="spotImages">
            {previewImage && (
              <img
                className="spotImagesLeftRow"
                src={previewImage}
                alt={spotInfoDetail.description}
              />
            )}
            {nonPreviewImages && (
              <div className="spotImagesRightRow">
                {nonPreviewImages.map((image) => (
                  <img key={image.id} src={image.url} alt={image.name} />
                ))}
              </div>
            )}

            <div className="hostDetails">
              <h3>
                Hosted by {spotInfoDetail?.firstName}
                {spotInfoDetail?.lastName}
              </h3>
              <p>{spotInfoDetail?.description}</p>
            </div>

            <div className="reserveContainer">
              <div>
                <strong className="spot-night">
                  ${spotInfoDetail?.price} night
                </strong>
              </div>

              {spotInfoDetail?.avgStarRating ? (
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
                {(spotInfoDetail?.numReviews?.length || 0) > 1
                  ? `${spotInfoDetail?.numReviews} Reviews`
                  : `${spotInfoDetail?.numReviews} Review`}
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
