import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePost } from "../features/post/postSlice";
import { Link } from "react-router-dom";

function EditPost() {
  const [message, setMessage] = useState();
  const [selectedInterest, setSelectedInterest] = useState("");

  const dispatch = useDispatch();

  const userInterests = useSelector((state) => state.auth?.user?.interests);
  const { posts } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);
  const userInterest = user?.interests?.map((interest) => interest.name);

  const userPosts = posts?.filter((post) =>
    userInterest?.includes(post.interest)
  );

  console.log("posts", posts);

  const handleClick = (id) => {
    if (message === "") {
      toast.error("Please enter post message");
    } else {
      dispatch(updatePost(id));
      toast.success("post updated");
    }
  };
  return (
    <>
      <section className="post-form">
        <form>
          <div className="form-group">
            <label htmlFor="interest">Interest:</label>
            <select
              id="interest"
              value={selectedInterest}
              onChange={(e) => setSelectedInterest(e.target.value)}
            >
              <option value="">Select an interest</option>
              {userInterests &&
                userInterests.map((interest, index) => (
                  <option key={index} value={interest.name}>
                    {interest.name}
                  </option>
                ))}
            </select>
            <label htmlFor="text">Message:</label>
            <textarea
              id="text"
              name="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group edit-post-btn">
            <Link to="/">
              <button className="btn">back</button>
            </Link>
            <button
              className={`add-btn btn  ${
                selectedInterest === "" ? "disabled" : ""
              }`}
              type="submit"
              disabled={selectedInterest === ""}
            >
              save
            </button>
          </div>
        </form>
        <section className="add-post-divider"></section>
      </section>
    </>
  );
}

export default EditPost;
