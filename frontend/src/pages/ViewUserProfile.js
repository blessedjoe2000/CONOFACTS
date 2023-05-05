import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

function Profile() {
  const user = useSelector((state) => state?.postUser?.postUser);

  if (!user) {
    // return a loading indicator or handle the absence of user data in some other way
    return <Spinner />;
  }

  const { name, email, username, dob, about, location, interests, createdAt } =
    user;

  const userInterests = interests?.map((interest) => (
    <li key={interest._id}>{interest.name}</li>
  ));

  const formattedMemberSince = new Date(createdAt).toLocaleDateString();
  const formattedDob = new Date(dob).toLocaleDateString();

  return (
    <>
      <div className="profile-body">
        {name && (
          <>
            <h2 className="profile-heading">Profile Information:</h2>
            <div className="profile-container">
              <div>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="avatar"
                />
              </div>
              <div>
                Member since:{" "}
                <div className="profile-details-value">
                  {formattedMemberSince}
                </div>{" "}
              </div>
            </div>
            <div className="profile-info">
              <div className="profile-details-containter">
                <div className="profile-details">Name:</div>
                <div className="profile-details-value">{name}</div>
              </div>
              <div className="profile-details-containter">
                <div className="profile-details">Email:</div>
                <div className="profile-details-value">{email}</div>
              </div>
              <div className="profile-details-containter">
                <div className="profile-details">Username:</div>
                <div className="profile-details-value">{username}</div>
              </div>
              <div className="profile-details-containter">
                <div className="profile-details">DOB:</div>
                <div className="profile-details-value">{formattedDob}</div>
              </div>
              <div className="profile-details-containter">
                <div className="profile-details">About me:</div>
                <div className="profile-details-value">{about}</div>
              </div>
              <div className="profile-details-containter">
                <div className="profile-details">Location:</div>
                <div className="profile-details-value">{location}</div>
              </div>
              <div className="profile-details-containter">
                <div className="profile-details">Interests:</div>
                <div className="profile-details-value">{userInterests}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
