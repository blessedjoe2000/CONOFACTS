import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import "./timeline.css";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, getPostById } from "../../features/post/postSlice";
import { getPostUser } from "../../features/postUser/postUserSlice";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";

function Timeline() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPending, posts } = useSelector((state) => state?.posts);
  const user = useSelector((state) => state.auth.user);
  const userInterest = user?.interests?.map((interest) => interest.name);

  // const userPosts = posts?.filter((post) =>
  //   userInterest?.includes(post.interest)
  // );

  const [userPosts, setUserPosts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const openModal = (id) => {
    setShowModal(true);
    setPostToDelete(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // useEffect(() => {
  //   const updatedUserPosts = posts?.filter((post) =>
  //     userInterest?.includes(post.interest)
  //   );
  //   setUserPosts(updatedUserPosts);
  // }, [posts]);

  // useEffect(() => {
  //   if (Array.isArray(posts) && posts.length > 0) {
  //     const updatedUserPosts = posts.filter((post) =>
  //       userInterest?.includes(post.interest)
  //     );
  //     setUserPosts(updatedUserPosts);
  //   }
  // }, [posts]);

  useEffect(() => {
    if (Array.isArray(posts) && posts.length > 0) {
      const updatedUserPosts = posts.filter((post) =>
        userInterest?.includes(post.interest)
      );
      setUserPosts(updatedUserPosts);
    }
  }, [posts]);

  const handleUsername = (id) => {
    dispatch(getPostUser(id));
    navigate("/postuser");
  };

  // const handleDelete = (id) => {
  //   dispatch(deletePost(id));
  //   toast.success("post deleted");
  //   navigate("/");
  // };

  // const handleDelete = (id) => {
  //   dispatch(deletePost(id))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("post deleted");
  //       // Remove the deleted post from the state
  //       const updatedPosts = userPosts.filter((post) => post._id !== id);
  //       console.log("updated post", updatedPosts);
  //       setUserPosts(updatedPosts); // Update the userPosts state variable
  //       navigate("/profile");
  //       console.log("detete btn posts", userPosts);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleDelete = async () => {
    if (postToDelete) {
      try {
        await dispatch(deletePost(postToDelete)).unwrap();
        toast.success("post deleted");
        // Remove the deleted post from the state
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postToDelete)
        );
        closeModal();
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
      <h1>Timeline</h1>
      <div className="timeline-container">
        {userPosts &&
          userPosts.map((post) => (
            <div key={post._id} className="timeline">
              <h2>{post.interest}</h2>

              <p className="timeline-message">{post.message}</p>
              <p className="timeline-date">{`Date: ${new Date(
                post.createdAt
              ).toLocaleDateString()}`}</p>
              <p>
                User:{" "}
                <Link
                  to={`/viewuser/${post.user}`}
                  className="timeline-username"
                  onClick={() => handleUsername(post.user)}
                >
                  {post.username}
                </Link>
              </p>
              {post.username === user.username && (
                <div className="timeline-btn">
                  <Link
                    to={`/editpost/${post._id}`}
                    onClick={() => handleEdit(post._id)}
                  >
                    <button className="btn">edit</button>
                  </Link>
                  <button
                    className="btn delete"
                    onClick={() => openModal(post._id)}
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <button onClick={closeModal}>X</button>
        <h2>Confirm delete</h2>
        <p>Are you sure you </p>
        <button onClick={closeModal}>cancel</button>
        <button onClick={handleDelete}>delete</button>
      </Modal>
    </>
  );
}

export default Timeline;
