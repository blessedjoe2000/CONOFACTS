import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import "./pages.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isPending, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isPending, isSuccess, isError, message, dispatch, navigate]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password");
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1 className="page-heading-icon">
          <FontAwesomeIcon icon={faSignIn} />
          Login
        </h1>
        <p>Please login your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter email..."
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter password..."
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <p>
          Don't have an account?
          <Link to="/register"> click here to register</Link>
        </p>
      </section>
    </>
  );
}

export default Login;
