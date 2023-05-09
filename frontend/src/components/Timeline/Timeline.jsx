import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import "./timeline.css";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, getPostById } from "../../features/post/postSlice";
import { getPostUser } from "../../features/postUser/postUserSlice";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";

function Timeline() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPending, posts } = useSelector((state) => state?.posts);
  const user = useSelector((state) => state.auth.user);
  const userInterest = user?.interests?.map((interest) => interest.name);

  const [userPosts, setUserPosts] = useState([]);

  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [readMorePost, setReadMorePost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const openReadMoreModal = (post) => {
    setShowReadMoreModal(true);
    setReadMorePost(post);
  };

  const closeReadMoreModal = () => {
    setShowReadMoreModal(false);
  };

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setPostToDelete(id);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (Array.isArray(posts) && posts.length > 0) {
      const updatedUserPosts = posts.filter((post) =>
        userInterest?.includes(post.interest)
      );
      setUserPosts(updatedUserPosts);
    }
  }, []);

  const handleUsername = (id) => {
    dispatch(getPostUser(id));
    navigate("/postuser");
  };

  const handleDelete = async () => {
    if (postToDelete) {
      try {
        await dispatch(deletePost(postToDelete)).unwrap();
        toast.success("post deleted");
        // Remove the deleted post from the state
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postToDelete)
        );
        closeDeleteModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (id) => {
    dispatch(getPostById(id));
  };

  if (isPending) {
    <Spinner />;
  }

  return (
    <>
      <h1 className="timeline-heading">Timeline</h1>
      <div className="timeline-card">
        {userPosts &&
          userPosts.map((post) => (
            <div key={post._id} className="timeline">
              <h2 className="card-heading">{post.interest}</h2>

              {post.message.length > 250 ? (
                <>
                  <p className="timeline-message">
                    {post.message.substring(0, 250)}...
                    <button
                      className="readmore"
                      onClick={() => openReadMoreModal(post.message)}
                    >
                      read more...
                    </button>
                  </p>
                  <Modal
                    className="modal"
                    isOpen={showReadMoreModal}
                    onRequestClose={closeReadMoreModal}
                  >
                    <button className="close" onClick={closeReadMoreModal}>
                      X
                    </button>
                    <p className="modal-message">{readMorePost}</p>
                    <button
                      className="btn btn-close"
                      onClick={closeReadMoreModal}
                    >
                      close
                    </button>
                  </Modal>
                </>
              ) : (
                <p className="timeline-message">{post.message}</p>
              )}

              <p className="timeline-icon-details">
                <FontAwesomeIcon icon={faCalendar} />{" "}
                {`Date: ${new Date(post.createdAt).toLocaleDateString()}`}
              </p>
              {post.username === user.username ? (
                <p className="timeline-icon-details">
                  <FontAwesomeIcon icon={faUser} /> User:{" "}
                  <Link to={`/profile`} className="timeline-username">
                    {post.username}
                  </Link>
                </p>
              ) : (
                <p className="timeline-icon-details">
                  <FontAwesomeIcon icon={faUser} /> User:{" "}
                  <Link
                    to={`/viewuser/${post.user}`}
                    className="timeline-username"
                    onClick={() => handleUsername(post.user)}
                  >
                    {post.username}
                  </Link>
                </p>
              )}

              {post.username === user.username && (
                <div className="timeline-btn">
                  <Link
                    to={`/editpost/${post._id}`}
                    onClick={() => handleEdit(post._id)}
                  >
                    <button className="btn">edit</button>
                  </Link>
                  <button
                    className="delete btn"
                    onClick={() => openDeleteModal(post._id)}
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <Modal
        className="modal-detele"
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
      >
        <button className="close" onClick={closeDeleteModal}>
          X
        </button>
        <h2 className="modal-heading">Confirm delete</h2>
        <p className="modal-message-info">
          Are you sure you delete this post?{" "}
        </p>
        <div className="modal-btn-container">
          <button className="btn delete-close" onClick={closeDeleteModal}>
            cancel
          </button>
          <button className="btn delete" onClick={handleDelete}>
            delete
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Timeline;
