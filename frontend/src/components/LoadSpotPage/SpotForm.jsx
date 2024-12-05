import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putSpot, postSpot, postImage } from "../../store/spots";
import "./SpotForm.css";

const SpotForm = ({ spot, formType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
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
      setImage2(spot.image2 || "");
      setImage3(spot.image3 || "");
      setImage4(spot.image4 || "");
      setImage5(spot.image5 || "");
    }
  }, [spot]);

  const validateForm = () => {
    let error = {};
    if (!country) error.country = "Country is required";
    if (!address) error.address = "Address is required";
    if (!city) error.city = "City is required";
    if (!state) error.state = "State is required";
    if (!description || description.length < 30)
      error.description = "Description needs 30 or more characters";
    if (!price) error.price = "Price is required";
    if (!name) error.name = "Name is required";
    if (formType === "Create a New Spot" && !previewImage)
      error.previewurl = "Preview image is required.";
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    const body = {
      ...spot,
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price: parseFloat(price),
    };

    let newSpot;
    if (formType === "Update Your Spot") {
      newSpot = await dispatch(putSpot(body));
    } else if (formType === "Create a New Spot") {
      newSpot = await dispatch(postSpot(body));
      const listImages = [
        { spotId: newSpot.id, preview: true, url: previewImage },
        { spotId: newSpot.id, preview: false, url: image2 },
        { spotId: newSpot.id, preview: false, url: image3 },
        { spotId: newSpot.id, preview: false, url: image4 },
        { spotId: newSpot.id, preview: false, url: image5 },
      ];
      await Promise.all(listImages.map((image) => dispatch(postImage(image))));
    }

    if (newSpot.errors) {
      setErrors(newSpot.errors);
    } else {
      navigate(`/spots/${newSpot.id}`);
    }
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
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="Country"
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
            {errors.lat && <p>{errors.lat}</p>}

            <label>Longitude</label>
            <input
              type="text"
              value={lng}
              placeholder="Longitude"
              onChange={(e) => setLng(e.target.value)}
            />
            {errors.lng && <p>{errors.lng}</p>}
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
            type="url"
            value={previewImage}
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
          {errors.previewImage && <p>{errors.previewImage}</p>}
          <div className="line"></div>

          <button className="createBtn" type="submit">
            create spot
          </button>
        </form>
      </div>
    </div>
  );
};

export default SpotForm;
