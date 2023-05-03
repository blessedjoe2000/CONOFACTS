import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "../features/auth/authSlice";
import { deleteUserPosts } from "../features/post/postSlice";
import { toast } from "react-toastify";
import Modal from "react-modal";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state?.auth);

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
  } = user;

  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const openModal = (id) => {
    setShowModal(true);
    setUserToDelete(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const userInterests = interests?.map((interest) => (
    <li key={interest._id}>{interest.name}</li>
  ));

  const formattedMemberSince = new Date(createdAt).toLocaleDateString();
  const formattedDob = new Date(dob).toLocaleDateString();

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await dispatch(deleteUserPosts(userToDelete)).unwrap();
        await dispatch(deleteUser(userToDelete)).unwrap();
        toast.success("user and posts deleted successfully");
        closeModal();
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
            <button className="btn" onClick={() => openModal(_id)}>
              <FontAwesomeIcon icon={faRemove} />
              delete
            </button>
          </div>
          <Modal isOpen={showModal} onRequestClose={closeModal}>
            <button onClick={closeModal}>X</button>
            <h2>Confirm delete</h2>
            <p>Are you sure you want to delete profile?</p>
            <button onClick={closeModal}>cancel</button>

            <button onClick={handleDelete}>delete</button>
          </Modal>
        </>
      )}
    </>
  );
}

export default Profile;
