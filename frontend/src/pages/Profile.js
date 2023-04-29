import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
function Profile() {
  const {
    _id,
    name,
    email,
    username,
    dob,
    about,
    location,
    interests,
    createdAt,
  } = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInterests = interests?.map((interest) => (
    <li key={interest._id}>{interest.name}</li>
  ));

  const formattedMemberSince = new Date(createdAt).toLocaleDateString();
  const formattedDob = new Date(dob).toLocaleDateString();

  const handleDelete = (_id) => {
    dispatch(deleteUser(_id));
    toast.success("user delete successfully");
    navigate("/login");
  };

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

          <div className="profile-btn">
            <Link to="/editprofile">
              <button className="btn">
                <FontAwesomeIcon icon={faEdit} />
                edit
              </button>
            </Link>
            <button className="btn" onClick={() => handleDelete(_id)}>
              <FontAwesomeIcon icon={faRemove} />
              delete
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
