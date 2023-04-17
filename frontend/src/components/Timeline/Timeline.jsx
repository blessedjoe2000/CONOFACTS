import { useSelector } from "react-redux";
import "./timeline.css";

function Timeline() {
  const { posts } = useSelector((state) => state.posts);

  return (
    <>
      <h1>Timeline</h1>
      <div className="timeline-container">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="timeline">
              <h2>{post.interest}</h2>
              <p className="timeline-message">{post.message}</p>
              <p className="timeline-date">{`Date: ${new Date(
                post.createdAt
              ).toLocaleDateString()}`}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default Timeline;
