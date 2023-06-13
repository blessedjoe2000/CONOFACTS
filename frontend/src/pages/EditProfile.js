import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { update } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faBackward } from "@fortawesome/free-solid-svg-icons";
import uploadImage from "../components/uploadImage";

function EditProfile() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    ...user,
    dob: user.dob ? new Date(user.dob).toISOString().substr(0, 10) : "",
  });
  const [image, setImage] = useState("");

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage(image);
    const { _id, name, email, username, dob, about, location } = userData;

    const updatedUser = {
      _id,
      ...(name && { name }), // Only include the name field if it's not empty
      ...(email && { email }),
      ...(username && { username }),
      ...(dob && { dob: new Date(dob).toISOString() }),
      ...(about && { about }),
      ...(location && { location }),
      ...(imageUrl && { imageUrl }),
    };

    dispatch(update(updatedUser));
    navigate("/profile");
  };

  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              value={userData.name}
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
              value={userData.email}
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
              value={userData.username}
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
              value={userData.dob}
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
              value={userData.about}
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
              value={userData.location}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="interests">Profile photo:</label>
            <input
              className="form-control"
              type="file"
              id="photo"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="edit-btns">
            <Link to="/profile">
              <button className="btn">
                <FontAwesomeIcon icon={faBackward} />
                back
              </button>
            </Link>
            <button type="submit" className="btn">
              <FontAwesomeIcon icon={faSave} />
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditProfile;
