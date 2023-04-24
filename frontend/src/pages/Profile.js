import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const { name, email, username, dob, about, location, interests, createdAt } =
    useSelector((state) => state?.auth?.user);
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  console.log("user", user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const userInterests = interests?.map((interest) => (
    <li key={interest._id}>{interest.name}</li>
  ));

  const formattedMemberSince = new Date(createdAt).toLocaleDateString();
  const formattedDob = new Date(dob).toLocaleDateString();

  return (
    <>
      {user && (
        <>
          <h2>Profile Information:</h2>
          <div className="profile-container">
            <div>Member since {formattedMemberSince}</div>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
          </div>
          <div className="proile-info">
            <div className="details">
              Name: <span className="details-value">{name}</span>
            </div>
            <div className="details">
              Email: <span className="details">{email}</span>
            </div>
            <div className="details">
              Username: <span className="details-value">{username}</span>
            </div>
            <div className="details">
              DOB:
              <span className="details-value">{formattedDob}</span>
            </div>
            <div className="details">
              About me: <span className="details-value">{about}</span>
            </div>
            <div className="details">
              Location: <span className="details-value">{location}</span>
            </div>
            <div className="details">
              Interests: <span className="details-value">{userInterests}</span>
            </div>
          </div>
        </>
      )}
      <Link to="/editprofile">
        <button className="btn">edit</button>
      </Link>
    </>
  );
}

export default Profile;
