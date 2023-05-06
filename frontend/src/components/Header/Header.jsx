import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
import { resetPost } from "../../features/post/postSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMessage,
  faHome,
  faSignIn,
  faSignOut,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { resetPostUser } from "../../features/postUser/postUserSlice";
import { useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetPost());
    dispatch(resetPostUser());

    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">CONOFACTS</div>
      </Link>
      <ul className={`navbar-list ${menuOpen ? "active" : ""}`}>
        {user ? (
          <>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="menu-list" to="/">
                <div className="nav-list">
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </div>
              </Link>
            </li>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="menu-list" to="/">
                <div className="nav-list">
                  <FontAwesomeIcon icon={faMessage} />
                  Message
                </div>
              </Link>
            </li>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="menu-list" to={`/profile`}>
                <div className="nav-list">
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </div>
              </Link>
            </li>

            <li className="nav-item" onClick={toggleMenu}>
              <button className="btn-logout" onClick={onLogout}>
                <FontAwesomeIcon icon={faSignOut} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="menu-list" to="/login" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faSignIn} />
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="menu-list" to="/register" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faAddressBook} />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="mobile-menu"></span>
        <span className="mobile-menu"></span>
        <span className="mobile-menu"></span>
      </div>
    </header>
  );
}

export default Header;
