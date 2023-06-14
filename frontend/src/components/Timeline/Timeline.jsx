import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import "./timeline.css";
import Spinner from "../Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faList } from "@fortawesome/free-solid-svg-icons";

function Timeline() {
  const { isPending, posts } = useSelector((state) => state?.posts);
  const mode = useSelector((state) => state?.mode?.mode);

  const [userPosts, setUserPosts] = useState([]);
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [readMorePost, setReadMorePost] = useState(null);

  const openReadMoreModal = (post) => {
    setShowReadMoreModal(true);
    setReadMorePost(post);
  };

  const closeReadMoreModal = () => {
    setShowReadMoreModal(false);
  };

  useEffect(() => {
    if (Array.isArray(posts) && posts.length > 0) {
      setUserPosts(posts);
    }
  }, [posts]);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="timeline-heading">Timeline</h1>
      <div className="timeline-card">
        {userPosts &&
          userPosts.map((post) => (
            <div key={post._id} className="timeline">
              <h2 className="card-heading">{`Travel to ${post.destination}`}</h2>
              <img
                className="image"
                src={post.imageUrl}
                alt={` ${post.destination}`}
              />
              <div className="post-tag">
                {post.tags.map((tag, index) => (
                  <p className="tags" key={index}>
                    {tag.enteredTag}
                  </p>
                ))}
              </div>
              <div className="timeline-icon-details">
                <FontAwesomeIcon icon={faClock} />
                Tavel duration:
                <p className="decolor">
                  {` ${new Date(
                    post.dateFrom
                  ).toLocaleDateString()} - ${new Date(
                    post.dateTo
                  ).toLocaleDateString()}`}
                </p>
              </div>

              <div className="post-travel">
                <div className="timeline-icon-details">
                  <FontAwesomeIcon icon={faCalendar} />
                  Posted:{" "}
                  <p className="decolor">{` ${new Date(
                    post.createdAt
                  ).toLocaleDateString()}`}</p>
                </div>
                <div className="timeline-icon-details">
                  <FontAwesomeIcon icon={faList} /> Travelers:
                  <p className="decolor">{` ${
                    post?.noOfTravelers ? post.noOfTravelers : 1
                  }`}</p>
                </div>
              </div>

              {post.message.length > 180 ? (
                <>
                  <p className="timeline-message">
                    {post.message.substring(0, 180)}...
                    <button
                      className="readmore"
                      onClick={() => openReadMoreModal(post.message)}
                    >
                      read more...
                    </button>
                  </p>
                  <Modal
                    id={mode === "dark" ? "dark-mode" : ""}
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
              <div className="avatar-container">
                <img
                  className="avatar"
                  src={post.userImage}
                  alt={`profile of ${post.username}`}
                />
                <button className="btn ">Join Trip</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Timeline;
