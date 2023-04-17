import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const { name, email, username, dob, about, location, interests } =
    useSelector((state) => state.auth.user);

  const formattedDob = new Date(dob).toLocaleDateString();

  return (
    <>
      <h2>Profile</h2>
      <div className="profile-container">
        <div className="proile-info">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Username: {username}</p>
          <p>DOB: {formattedDob}</p>
          <p>About me: {about}</p>
          <p>Location: {location}</p>
          <p>Interests: {interests}</p>
        </div>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
        />
      </div>
      <Link to="/editprofile">
        <button className="btn">edit</button>
      </Link>
    </>
  );
}

export default Profile;
