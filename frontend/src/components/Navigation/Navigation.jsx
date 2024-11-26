import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaAirbnb } from "react-icons/fa";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <ul className="nav-bar">
        <li>
          <NavLink to="/">
            <FaAirbnb style={{ color: "#74C0FC" }} size={40} />
            mockbnb
          </NavLink>
        </li>
        {isLoaded && (
          <li className="userIcon">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </>
  );
}

export default Navigation;
