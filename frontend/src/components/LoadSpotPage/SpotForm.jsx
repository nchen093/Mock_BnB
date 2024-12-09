import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putSpotThunk, postSpotThunk, postImageThunk } from "../../store/spots";
import "./SpotForm.css";

const SpotForm = ({ spot, formType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(90);
  const [lng, setLng] = useState(180);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [nonPrviewImg1, setNonPrviewImg1] = useState("");
  const [nonPrviewImg2, setNonPrviewImg2] = useState("");
  const [nonPrviewImg3, setNonPrviewImg3] = useState("");
  const [nonPrviewImg4, setNonPrviewImg4] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (spot) {
      setCountry(spot.country || "");
      setAddress(spot.address || "");
      setCity(spot.city || "");
      setState(spot.state || "");
      setLat(spot.lat || "");
      setLng(spot.lng || "");
      setDescription(spot.description || "");
      setName(spot.name || "");
      setPrice(spot.price || "");
      setPreviewImage(spot.previewImage || "");
      setNonPrviewImg1(spot.nonPrviewImg1 || "");
      setNonPrviewImg2(spot.nonPrviewImg2 || "");
      setNonPrviewImg3(spot.nonPrviewImg3 || "");
      setNonPrviewImg4(spot.nonPrviewImg4 || "");
    }
  }, [spot]);

  const validateForm = () => {
    let error = {};

    if (!country) error.country = "Country is required";
    if (!address) error.address = "Address is required";
    if (!city) error.city = "City is required";
    if (!state) error.state = "State is required";
    if (!lat || lat > 90 || lat < -90)
      error.lat = "Latitude must be within -90 and 90";
    if (!lng || lng > 180 || lng < -180)
      error.lng = "Longitude must be within -180 and 180";
    if (!description || description.length < 30)
      error.description = "Description needs 30 or more characters";
    if (!price) error.price = "Price is required";
    if (!name) error.name = "Name is required";
    if (formType === "Create a New Spot" && !previewImage)
      error.previewImage = "Preview image is required.";

    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (formErrors && Object.values(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});

    // Pre-thunk
    const newSpot = {
      ...spot,
      country,
      address,
      city,
      state,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      description,
      name,
      price: parseFloat(price),
      previewImage,
    };

    let response;
    if (formType === "Update Your Spot") {
      response = await dispatch(putSpotThunk(newSpot));

      console.log("what is this response shown?", response);
    } else if (formType === "Create a New Spot") {
      response = await dispatch(postSpotThunk(newSpot));
      const listImages = [
        { spotId: response.id, preview: true, url: previewImage },
        { spotId: response.id, preview: false, url: nonPrviewImg1 },
        { spotId: response.id, preview: false, url: nonPrviewImg2 },
        { spotId: response.id, preview: false, url: nonPrviewImg3 },
        { spotId: response.id, preview: false, url: nonPrviewImg4 },
      ];
      await Promise.all(
        listImages.map((image) => dispatch(postImageThunk(image)))
      );
    }

    if (response.errors) {
      setErrors(response.errors);
    }

    navigate(`/spots/${response.id}`);
  };

  return (
    <div className="mainContainer">
      <div className="createSpot-form">
        <h1>{formType}</h1>
        <h2>Where&rsquo;s your place located?</h2>
        <p>
          Guests will only get your exact address once they book a reservation.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Country</label>
            <input
              id="spot-country"
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            {errors.country && <p>{errors.country}</p>}
          </div>
          <div>
            <label>Street Address</label>
            <input
              id="spot-address"
              type="text"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && <p>{errors.address}</p>}
          </div>
          <div className="city-state">
            <label>City</label>
            <input
              id="spot-city"
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              required
            />
            {errors.city && <p>{errors.city}</p>}

            <label>State</label>
            <input
              id="spot-state"
              type="text"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              required
            />
            {errors.state && <p>{errors.state}</p>}
          </div>
          <div className="lat-lng">
            <label>Latitude</label>
            <input
              type="text"
              value={lat}
              placeholder="Latitude"
              onChange={(e) => setLat(e.target.value)}
            />

            <label>Longitude</label>
            <input
              type="text"
              value={lng}
              placeholder="Longitude"
              onChange={(e) => setLng(e.target.value)}
            />
          </div>
          <div className="line"></div>
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            style={{ height: "125px", width: "100%" }}
            value={description}
            placeholder="Please write at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <p>{errors.description}</p>}
          <div className="line"></div>
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests attention with a spot title that highlights what makes
            your place special.
          </p>
          <div>
            <input
              type="text"
              value={name}
              placeholder="Name of your spot"
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="line"></div>
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <label>$</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
            required
          />
          {errors.price && <p>{errors.price}</p>}
          <div className="line"></div>

          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            name="previewImage"
            value={previewImage}
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
          {errors.previewImage && <p>{errors.previewImage}</p>}
          <input
            id="nonPreviewImage1"
            name="image1"
            value={nonPrviewImg1}
            placeholder="Image URL"
            onChange={(e) => setNonPrviewImg1(e.target.value)}
          />
          {nonPrviewImg1 && (
            <div className="image_preview">
              <img src={nonPrviewImg1} alt="image" />
            </div>
          )}
          <input
            id="nonPrviewImg2"
            name="nonPrviewImg2"
            value={nonPrviewImg2}
            placeholder="Image URL"
            onChange={(e) => setNonPrviewImg2(e.target.value)}
          />
          {nonPrviewImg2 && (
            <div className="image_preview">
              <img src={nonPrviewImg2} alt="image" />
            </div>
          )}
          <input
            id="nonPrviewImg3"
            name="inonPrviewImg3"
            value={nonPrviewImg3}
            placeholder="Image URL"
            onChange={(e) => setNonPrviewImg3(e.target.value)}
          />
          {nonPrviewImg3 && (
            <div className="image_preview">
              <img src={nonPrviewImg3} alt="image" />
            </div>
          )}
          <input
            id="nonPrviewImg4"
            name="nonPrviewImg4"
            value={nonPrviewImg4}
            placeholder="Image URL"
            onChange={(e) => setNonPrviewImg4(e.target.value)}
          />
          <>
            {nonPrviewImg4 && (
              <div className="image_preview">
                <img src={nonPrviewImg4} alt="image" />
              </div>
            )}
            <div className="line"></div>
            <button className="createBtn" type="submit">
              {formType === "Create a New Spot"
                ? "Create Spot"
                : "Update Your Spot"}
            </button>
          </>
        </form>
      </div>
    </div>
  );
};

export default SpotForm;
