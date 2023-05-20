import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { register } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";

function RegisterForm() {
  const [selectInterest, setSelectInterest] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true); // State variable for tracking password match status

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
    dob: currentDate,
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

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Check if the age is 15 or above
    const age = calculateAge(dob);
    if (age < 15) {
      toast.error("You must be 15 years or older to register");
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordMatch(false);
      return toast.error("Passwords do not match");
    }

    setPasswordMatch(true); // Reset the password match status

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
      <section className="form-heading">
        <h1 className="page-heading-icon ">
          <FontAwesomeIcon icon={faAddressBook} />
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Name:<span className="required">*</span>
            </label>
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
            <label htmlFor="email">
              Email:<span className="required">*</span>
            </label>
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
            <label htmlFor="password">
              Password:<span className="required">*</span>
            </label>
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
            <label htmlFor="passwordConfirm">
              Confirm password:<span className="required">*</span>
            </label>
            <input
              className="form-control"
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordConfirm}
              placeholder="Confirm your password..."
              onChange={onChange}
              onBlur={() => {
                setPasswordMatch(password === passwordConfirm); // Check password match onBlur event
              }}
            />
            {/* Display password match error message */}
            {!passwordMatch && (
              <p className="password-match-error">Passwords do not match</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username">
              Username:<span className="required">*</span>
            </label>
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
                <div className="checkbox" key={index}>
                  <div className="interest-name">
                    <label htmlFor={`interest-${index}`}>{interest.name}</label>
                  </div>
                  <div className="interest-value">
                    <input
                      type="checkbox"
                      name="interests"
                      value={JSON.stringify(interest)}
                      id={`interest-${index}`}
                      onChange={handleInterest}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group ">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <p>
          Already created an account?
          <Link className="link-to" to="/login">
            {" "}
            click here to login
          </Link>
        </p>
      </section>
    </>
  );
}

export default RegisterForm;
