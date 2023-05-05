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

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetPost());
    dispatch(resetPostUser());

    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">CONOFACTS</div>
      </Link>
      <ul className="navbar-list">
        {user ? (
          <>
            <li className="nav-item">
              <Link className="menu-list" to="/">
                <div className="nav-list">
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="menu-list" to="/">
                <div className="nav-list">
                  <FontAwesomeIcon icon={faMessage} />
                  Message
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="menu-list" to={`/profile`}>
                <div className="nav-list">
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <button className="btn-logout" onClick={onLogout}>
                <FontAwesomeIcon icon={faSignOut} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="menu-list" to="/login">
                <FontAwesomeIcon icon={faSignIn} />
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="menu-list" to="/register">
                <FontAwesomeIcon icon={faAddressBook} />
                Register
              </Link>
            </li>
          </>
        )}
        <div></div>
        <div className="hamburger">
          <span className="mobile-menu"></span>
          <span className="mobile-menu"></span>
          <span className="mobile-menu"></span>
          <span className="mobile-menu"></span>
        </div>
      </ul>
    </header>
  );
}

export default Header;
