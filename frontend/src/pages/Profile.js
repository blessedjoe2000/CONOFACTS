import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const {
    name,
    email,
    username,
    dob,
    about,
    location,
    interests,
    memberSince,
  } = useSelector((state) => state?.auth?.user);
  const user = useSelector((state) => state?.auth?.user?.updatedUser);

  const userInterests = user?.interests?.map((interest) => interest.name);
  const interestsList = interests?.map((interest) => (
    <li key={interest._id}>{interest.name}</li>
  ));

  const formattedMemberSince = new Date(memberSince).toLocaleDateString();
  const formattedDob = new Date(dob).toLocaleDateString();

  return (
    <>
      <h2>Profile</h2>
      <div className="profile-container">
        <div>Member since {formattedMemberSince}</div>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
        />
      </div>
      <div className="proile-info">
        <div className="details">
          Name: <input className="details-value" defaultValue={name} />
        </div>
        <div className="details">
          Email: <input className="details" defaultValue={email} />
        </div>
        <div className="details">
          Username: <input className="details-value" defaultValue={username} />
        </div>
        <div className="details">
          DOB: <input className="details-value" defaultValue={formattedDob} />
        </div>
        <div className="details">
          About me: <input className="details-value" defaultValue={about} />
        </div>
        <div className="details">
          Location: <input className="details-value" defaultValue={location} />
        </div>
        <div className="details">
          Interests:
          <input className="details-value" defaultValue={interestsList} />
        </div>
      </div>
      <Link to="/editprofile">
        <button className="btn">edit</button>
      </Link>
      {user && (
        <>
          <h3>Updated Profile Information:</h3>
          <div className="profile-container">
            <div>Member since </div>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
          </div>
          <div className="proile-info">
            <div className="details">
              Name: <span className="details-value">{user.name}</span>
            </div>
            <div className="details">
              Email: <span className="details">{user.email}</span>
            </div>
            <div className="details">
              Username: <span className="details-value">{user.username}</span>
            </div>
            <div className="details">
              {/* DOB: <input className="details-value" defaultValue={formattedDob} /> */}
            </div>
            <div className="details">
              About me: <span className="details-value">{user.about}</span>
            </div>
            <div className="details">
              Location: <span className="details-value">{user.location}</span>
            </div>
            <div className="details">
              Interests:{" "}
              <span className="details-value">{userInterests.join(", ")}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
