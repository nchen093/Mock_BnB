// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { postSpot } from "../../store/spots";
// import { getSpotDetail } from "../../store/spotDetails";
// import { useNavigate } from "react-router-dom";

//   // const dispatch = useDispatch();
//   // const navigate = useNavigate();

//   //handle the submission, when the form is submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);

//     const newSpot = {
//       country,
//       address,
//       city,
//       state,
//       lat: lat || undefined,
//       lng: lng || undefined,
//       name,
//       description,
//       price: Number(price),
//     };

//     try {
//         if (spot) {
//         dispatch(putSpot(newSpot, spot.id));
//         dispatch(getSpotDetail(spot.id));
//       } else {
//       const spot = await dispatch(postSpot(newSpot, previewImageUrl));
//       navigate(`spots/${spot.id}`);

//       setCountry("");
//       setAddress("");
//       setCity("");
//       setState("");
//       setLat(undefined);
//       setLng(undefined);
//       setName("");
//       setDescription("");
//       setPrice("");
//       setPreviewImageUrl("");
//     } catch (e) {
//       setErrors({ message: "Something is wrong, please try it later" });
//     }
//   };
