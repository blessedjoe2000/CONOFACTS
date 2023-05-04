import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

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

  return (
    <>
      <section className="form-heading">
        <h1 className="form-heading-icon">
          <FontAwesomeIcon icon={faSignIn} /> Login
        </h1>
        <p className="form-subheading">Please login your account</p>
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
          <Link className="link-to" to="/register">
            {" "}
            click here to register
          </Link>
        </p>
      </section>
    </>
  );
}

export default LoginForm;
