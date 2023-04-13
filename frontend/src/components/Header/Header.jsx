import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
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

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">CONOFACTS</div>
      </Link>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/">
                <div className="nav-list">
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </div>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="nav-list">
                  <FontAwesomeIcon icon={faMessage} />
                  Message
                </div>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="nav-list">
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </div>
              </Link>
            </li>

            <li>
              <button className="btn-logout" onClick={onLogout}>
                <FontAwesomeIcon icon={faSignOut} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon={faSignIn} />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FontAwesomeIcon icon={faAddressBook} />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
