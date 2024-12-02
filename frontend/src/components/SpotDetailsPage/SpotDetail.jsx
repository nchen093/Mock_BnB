import { useParams } from "react-router-dom";
import { getSpotDetail } from "../../store/spotDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GoStarFill } from "react-icons/go";
import "./SpotDetail.css";

export default function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spotDetails = useSelector((state) => state.spotDetails);

  // Fetching spot details
  useEffect(() => {
    dispatch(getSpotDetail(spotId));
  }, [dispatch, spotId]);

  //If spot details are not found
  if (!spotDetails?.id) {
    return (
      <>
        <h1>{!Number(spotId) ? "Spot" : "Resource"} not found</h1>
      </>
    );
  }

  const reserve = (e) => {
    e.preventDefault();
    alert("Feature Coming Soom...");
  };

  // Extracting the preview image and other images
  const previewImageUrl = spotDetails.SpotImages?.find(
    (image) => image.preview
  )?.url;
  const nonPreviewImages = spotDetails.SpotImages.filter(
    (image) => !image.preview
  );

  return (
    <>
      <div id="mainContainer">
        <div id="spotDetail">
          <h1>{spotDetails.name}</h1>
          <h3>
            {spotDetails.city}, {spotDetails.state}, {spotDetails.country}
          </h3>
          <div className="spotImages">
            {previewImageUrl && (
              <img
                className="spotImagesLeftRow"
                src={previewImageUrl}
                alt={spotDetails.description}
              />
            )}
            <div className="spotImagesRightRow">
              {nonPreviewImages.slice(0, 5).map((image, i) => (
                <img
                  src={image.url}
                  alt={`Image ${i + 1} of the spot`}
                  key={i}
                />
              ))}
            </div>

            <div className="hostDetails">
              <h3>
                Hosted by {spotDetails.Owner?.firstName}{" "}
                {spotDetails.Owner?.lastName}
              </h3>
              <p>{spotDetails.description}</p>
            </div>

            <div className="reserveContainer">
              <div>
                <strong className="spot-night">
                  ${spotDetails.price} night
                </strong>
              </div>

              {spotDetails.avgStarRating ? (
                <div className="starRating">
                  <GoStarFill style={{ color: "#ffd60a" }} />
                  {spotDetails.avgStarRating.toFixed(1)}
                </div>
              ) : (
                <div className="starRating">
                  <GoStarFill style={{ color: "#ffd60a" }} /> New
                </div>
              )}

              <div className="dot">.</div>
              <strong className="numReview">
                {spotDetails.numReviews.length > 1
                  ? `${spotDetails.numReviews} Reviews`
                  : `${spotDetails.numReviews} Review`}
              </strong>
              <button className="reserveBtn" onClick={reserve}>
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
