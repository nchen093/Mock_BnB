import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../Modals/LoginFormModal/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal/SignupFormModal";
import { AiOutlineMenu } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profilebtn" onClick={toggleMenu}>
        <AiOutlineMenu />
        <FaUserCircle />
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="dropdown">
              <div className="menu-item">
                <li>Hello, {user.firstName}🎄</li>
                <li> {user.username}</li>
                <li>{user.email}</li>
                <li>
                  <button
                    style={{
                      borderRadius: "12px",
                      border: "1px solid #ccc",
                      backgroundColor: "#74c0fc",
                      color: "black",
                      width: "100%",
                    }}
                    onClick={logout}
                  >
                    <CiLogout />
                    Log Out
                  </button>
                </li>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown">
              <li className="menu-item">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li className="menu-item">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
