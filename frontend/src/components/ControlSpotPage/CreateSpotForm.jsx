import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateSpotForm.css";
import { postSpot } from "../../store/spots";

function CreateSpot() {
  // form states
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [nonPreviewImageUrl, setNonPreviewImageUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // error message
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    country: false,
    address: false,
    city: false,
    state: false,
    lat: false,
    lng: false,
    name: false,
    price: false,
    description: false,
    previewImage: false,
    nonPreviewImageUrl: false,
  });

  useEffect(() => {
    const errors = {};

    if (!country) errors.country = "Country is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (description.length < 30)
      errors.description = "Description needs a minimum of 30 characters";
    if (!name) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";
    if (!previewImage) errors.previewImage = "Preview image is required";
    if (!/\.(png|jpg|jpeg)$/i.test(nonPreviewImageUrl))
      errors.nonPreviewImageUrl = "Image URL must end in .png .jpg, or .jpeg";
    setErrors(errors);
  }, [
    country,
    address,
    city,
    description,
    name,
    price,
    previewImage,
    nonPreviewImageUrl,
  ]);

  const handleMessages = (message) => {
    setTouched((preState) => ({ ...preState, [message]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      country: true,
      address: true,
      city: true,
      state: true,
      lat: true,
      lng: true,
      name: true,
      price: true,
      description: true,
      previewImage: true,
      nonPreviewImageUrl: true,
    });

    // Create the form body
    const body = {
      country,
      address,
      city,
      state,
      name,
      description,
      price: parseFloat(price),
      lat,
      lng,
      previewImage,
    };

    try {
      const createdSpot = await dispatch(postSpot(body, previewImage));
      console.log("Created spot response:", createdSpot);
      if (createdSpot) {
        navigate("/HomePage");
        navigate(`/spots/${createdSpot.id}`);
      }
    } catch (error) {
      console.error("Error creating spot:", error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="createSpot-form">
        <h1>Create a new spot</h1>
        <h2>Where&rsquo;s your place located?</h2>
        <p>
          Guest will only get your exact address once they booked a reservation.
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
              onBlur={() => handleMessages("country")}
            />
            {errors.country && touched.country && <p>{errors.country}</p>}
          </div>
          <div>
            <label>Street Address</label>
            <input
              id="spot-address"
              type="text"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => handleMessages("address")}
              required
            />
            {errors.address && touched.address && <p>{errors.address}</p>}
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
              onBlur={() => handleMessages("city")}
            />
            {errors.city && touched.city && <p>{errors.city}</p>}

            <label>State</label>
            <input
              id="spot-state"
              type="text"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              required
            />
            {errors.state && touched.state && <p>{errors.state}</p>}
          </div>
          <div className="lat-lng">
            <label>Latitude</label>
            <input
              type="text"
              value={lat}
              onBlur={() => handleMessages("lat")}
              placeholder="Latitude"
              onChange={(e) => setLat(e.target.value)}
            />
            {errors.lat && touched.lat && <p>{errors.lat}</p>}

            <label>Longitude</label>
            <input
              type="text"
              value={lng}
              onBlur={() => handleMessages("lng")}
              placeholder="Longitude"
              onChange={(e) => setLng(e.target.value)}
            />
            {errors.lng && touched.lng && <p>{errors.lng}</p>}
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
            onBlur={() => handleMessages("description")}
            placeholder="Please write at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && touched.description && (
            <p>{errors.description}</p>
          )}
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
              onBlur={() => handleMessages("name")}
              placeholder="Name of your spot"
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && touched.name && <p>{errors.name}</p>}
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
            onBlur={() => handleMessages("price")}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
            required
          />
          {errors.price && touched.price && <p>{errors.price}</p>}
          <div className="line"></div>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="url"
            value={previewImage}
            onBlur={() => handleMessages("previewImage")}
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
          {errors.previewImage && touched.previewImage && (
            <p>{errors.previewImage}</p>
          )}
          <input
            type="url"
            value={nonPreviewImageUrl}
            onBlur={() => handleMessages("nonPreviewImageUrl")}
            placeholder="Image URL"
            onChange={(e) => setNonPreviewImageUrl(e.target.value)}
          />
          {errors.nonPreviewImageUrl && touched.nonPreviewImageUrl && (
            <p>{errors.nonPreviewImageUrl}</p>
          )}

          <div className="line"></div>
          <button type="submit">Create Spot</button>
        </form>
      </div>
    </div>
  );
}

export default CreateSpot;
