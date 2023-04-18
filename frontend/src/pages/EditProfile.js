import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../features/auth/authSlice";

function EditProfile() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(user);

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    const { _id, name, email, username, dob, about, location, interests } =
      userData;
    console.log(_id, name, email, username, dob, about, location, interests);
    e.preventDefault();
    const updatedUser = {
      _id,
      ...(name && { name }), // Only include the name field if it's not empty
      ...(email && { email }), // Only include the email field if it's not empty
      ...(username && { username }), // Only include the username field if it's not empty
      ...(dob && { dob: new Date(dob).toISOString() }), // Only include the dob field if it's not empty
      ...(about && { about }), // Only include the about field if it's not empty
      ...(location && { location }), // Only include the location field if it's not empty
      ...(interests && { interests }), // Only include the interests field if it's not empty
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
            <label htmlFor="interests">Interests:</label>
            <select
              id="interest"
              value={userData.interests}
              onChange={onChange}
            >
              <option value="">Select an interest</option>
              {userData.interests &&
                userData.interests.map((interest) => (
                  <option key={interest._id} value={interest.name}>
                    {interest.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditProfile;
