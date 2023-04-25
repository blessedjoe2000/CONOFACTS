import { useDispatch, useSelector } from "react-redux";
import "./timeline.css";
import { Link } from "react-router-dom";
import { getUser } from "../../features/auth/authSlice";

function Timeline() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);
  const userInterest = user?.interests?.map((interest) => interest.name);

  const userPosts = posts?.filter((post) =>
    userInterest?.includes(post.interest)
  );

  const handleClick = (id) => {
    dispatch(getUser(id));
  };

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
                  to={`/conofacts/users/${post.user}`}
                  className="timeline-username"
                  onClick={() => handleClick(post.user)}
                >
                  {post.username}
                </Link>
              </p>
            </div>
          ))}
      </div>
    </>
  );
}

export default Timeline;
