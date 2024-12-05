import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import ListOfSpots from "./components/LandingPage/ListOfSpots";
// import SpotDetail from "./components/SpotDetailsPage/SpotDetail";
import CreateSpotForm from "./components/LoadSpotPage/CreateSpotForm";
import EditSpotForm from "./components/LoadSpotPage/EditSpotForm";
import ManageSpot from "./components/LoadSpotPage/ManageSpot";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ListOfSpots />,
      },
      // {
      //   path: "/spots/:spotId",
      //   element: <SpotDetail />,
      // },
      {
        path: "/spots/new",
        element: <CreateSpotForm />,
      },
      {
        path: "/user/spots",
        element: <ManageSpot />,
      },

      {
        path: "/spots/:spotId/edit",
        element: <EditSpotForm />,
      },
      {
        path: "*",
        element: <h1>Page Not Found</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
