import { useDispatch, useSelector } from "react-redux";
import "./timeline.css";
import { Link } from "react-router-dom";
import { deletePost } from "../../features/post/postSlice";
import { getPostUser } from "../../features/postUser/postUserSlice";
import { useEffect } from "react";

function Timeline() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);
  const userInterest = user?.interests?.map((interest) => interest.name);

  console.log("posts", posts);

  const userPosts = posts?.filter((post) =>
    userInterest?.includes(post.interest)
  );

  const handleUsername = (id) => {
    dispatch(getPostUser(id));
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  useEffect(() => {}, [dispatch, posts, user]);

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
                  to={`/postuser/${post.user}`}
                  className="timeline-username"
                  onClick={() => handleUsername(post.user)}
                >
                  {post.username}
                </Link>
              </p>
              {post.username === user.username && (
                <div className="timeline-btn">
                  <Link to={`/editpost/${post._id}`}>
                    <button className="btn">edit</button>
                  </Link>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(post._id)}
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default Timeline;
