// import { useEffect } from "react";
// import { userSpots } from "../../store/spots";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import UserSpotInfo from "./UserSpotInfo";

// export default function ManageSpot() {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.session.user);
//   const spotsData = useSelector((state) => state.spots);
//   const spots = Object.values(spotsData);
//   const currentUserSpot = spots.filter(
//     (spot) => spot?.ownerId === currentUser?.id
//   );

//   useEffect(() => {
//     if (currentUser?.id) {
//       dispatch(userSpots());
//     }
//   }, [dispatch, currentUser]);

//   return (
//     <>
//       <h1>Manage Your Spots</h1>
//       <button>
//         <Link className="createSpot" to="/spots/new">
//           Create a New Spot
//         </Link>
//       </button>
//       <div id="mainContain">
//         <div className="spotGrid">
//           {currentUserSpot?.map((spot) => (
//             <Link
//               key={spot.id}
//               to={`/spots/${spot.id}`}
//               style={{ textDecoration: "none" }}
//             >
//               <UserSpotInfo spot={spot} />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
