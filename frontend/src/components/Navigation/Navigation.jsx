import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { FaAirbnb } from "react-icons/fa";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div id="nav-bar">
        <NavLink className="logo" to="/">
          <FaAirbnb style={{ color: "#74C0FC" }} size={40} />
          mockbnb
        </NavLink>

        <div className="rightHeader">
          {sessionUser && (
            <NavLink className="createSpot" to="/spots/new">
              Create a New Spot
            </NavLink>
          )}
          {isLoaded && (
            <ProfileButton className="profilebtn" user={sessionUser} />
          )}
        </div>
      </div>
      <div className="navBar-line"></div>
    </>
  );
}

export default Navigation;
