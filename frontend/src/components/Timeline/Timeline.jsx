import { useSelector } from "react-redux";
import "./timeline.css";

function Timeline() {
  const { posts } = useSelector((state) => state.posts);

  return (
    <>
      <h1>Timeline</h1>
      <div className="container">
        {posts.map((post) => (
          <div key={post._id} className="timeline">
            <p className="timeline-message">{post.message}</p>
            <p className="timeline-date">{`Date: ${post.createdAt.slice(
              0,
              10
            )}`}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Timeline;
