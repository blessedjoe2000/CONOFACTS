import { useSelector } from "react-redux";
import "./timeline.css";

function Timeline() {
  const { posts } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);

  const userInterest = user?.interests?.map((interest) => interest.name);

  const userPosts = posts?.filter((post) =>
    userInterest?.includes(post.interest)
  );

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
              <p>User: {post.username}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default Timeline;
