import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
    dob: "",
    about: "",
    location: "",
  });

  const {
    name,
    email,
    password,
    passwordConfirm,
    username,
    dob,
    about,
    location,
  } = formData;

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
      navigate("/interest");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
        username,
        dob,
        about,
        location,
      };

      dispatch(register(userData));
    }

    if (isPending) {
      return <Spinner />;
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Enter name..."
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="passwordConfirm">Confirm password:</label>
            <input
              className="form-control"
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordConfirm}
              placeholder="Confirm your password..."
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={username}
              placeholder="Enter username..."
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">DOB:</label>
            <input
              className="form-control"
              type="date"
              name="dob"
              id="dob"
              value={dob}
              placeholder="Enter DOB..."
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="about">About:</label>
            <input
              className="form-control"
              type="text"
              name="about"
              id="about"
              value={about}
              placeholder="About yourself..."
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              className="form-control"
              type="text"
              name="location"
              id="location"
              value={location}
              placeholder="Enter location..."
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
          Already created an account?
          <Link to="/login"> click here to login</Link>
        </p>
      </section>
    </>
  );
}

export default Register;
