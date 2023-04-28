function Profile() {
  const { name, email, username, dob, about, location, interests, createdAt } =
    JSON.parse(localStorage.getItem("postUser"));

  const userInterests = interests?.map((interest) => (
    <li key={interest._id}>{interest.name}</li>
  ));

  const formattedMemberSince = new Date(createdAt).toLocaleDateString();
  const formattedDob = new Date(dob).toLocaleDateString();

  return (
    <>
      {name && (
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
    </>
  );
}

export default Profile;
