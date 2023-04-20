import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { register } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterForm() {
  const [selectInterest, setSelectInterest] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
    dob: "",
    about: "",
    location: "",
    interests: [
      { name: "Sports", value: "sports" },
      { name: "Wildlife", value: "wildlife" },
      { name: "Road Trip", value: "road trip" },
      { name: "Book Club", value: "book club" },
      { name: "Games", value: "games" },
      { name: "Adventure", value: "adventure" },
    ],
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
    interests,
  } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInterest = (e) => {
    const interest = JSON.parse(e.target.value);
    if (e.target.checked) {
      setSelectInterest((prevInterest) => [...prevInterest, interest]);
    } else {
      setSelectInterest((prevInterest) =>
        prevInterest.filter((inter) => inter.value !== interest.value)
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return toast.error("Passwords do not match");
    }
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      username.trim() === ""
    ) {
      toast.error(
        "Please enter all required fields. Name, email, password and username"
      );
    } else {
      const userData = {
        name,
        email,
        password,
        username,
        dob,
        about,
        location,
        interests: selectInterest,
      };

      dispatch(register(userData));
    }
  };

  return (
    <>
      <section className="heading">
        <h1 className="page-heading-icon ">
          <FontAwesomeIcon icon={faAddressBook} />
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
            <label>Interests:</label>
            <div className="interests">
              {interests.map((interest, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={JSON.stringify(interest)}
                    id={`interest-${index}`}
                    onChange={handleInterest}
                  />
                  <label htmlFor={`interest-${index}`}>{interest.name}</label>
                </div>
              ))}
            </div>
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

export default RegisterForm;
