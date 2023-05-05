import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "../features/auth/authSlice";
import { deleteUserPosts } from "../features/post/postSlice";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "./pages.css";

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

            <div className="profile-btn">
              <Link to="/editprofile">
                <button className="btn">
                  <FontAwesomeIcon icon={faEdit} />
                  edit
                </button>
              </Link>
              <button className="btn delete" onClick={() => openModal(_id)}>
                <FontAwesomeIcon icon={faRemove} />
                delete
              </button>
            </div>
            <Modal
              className="modal-detele"
              isOpen={showModal}
              onRequestClose={closeModal}
            >
              <button className="close" onClick={closeModal}>
                X
              </button>
              <h2 className="modal-heading">Confirm delete</h2>
              <p className="modal-message-info">
                Are you sure you want to delete profile?
              </p>
              <div className="modal-btn-container">
                <button className="btn delete-close" onClick={closeModal}>
                  cancel
                </button>

                <button className="btn delete" onClick={handleDelete}>
                  delete
                </button>
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
