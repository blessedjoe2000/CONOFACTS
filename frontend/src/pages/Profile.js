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
        <div>Member since </div>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
        />
      </div>
      <div className="proile-info">
        <p className="details">
          Name: <span className="details-value">{name}</span>
        </p>
        <p className="details">
          Email: <span className="details">{email}</span>
        </p>
        <p className="details">
          Username: <span className="details-value">{username}</span>
        </p>
        <p className="details">
          DOB: <span className="details-value">{formattedDob}</span>
        </p>
        <p className="details">
          About me: <span className="details-value">{about}</span>
        </p>
        <p className="details">
          Location: <span className="details-value">{location}</span>
        </p>
        <p className="details">
          Interests:
          <span className="details-value">
            {interests.map((interest) => (
              <li key={interest._id}>{interest.name}</li>
            ))}
          </span>
        </p>
      </div>
      <Link to="/editprofile">
        <button className="btn">edit</button>
      </Link>
    </>
  );
}

export default Profile;
