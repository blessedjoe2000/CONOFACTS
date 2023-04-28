import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePost } from "../features/post/postSlice";
import { Link, useNavigate } from "react-router-dom";

function EditPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post } = useSelector((state) => state.posts);
  const { _id, interest, message } = post;

  console.log("post", post);
  console.log("id", _id);

  console.log("interest", interest);
  const [postMessage, setPostMessage] = useState(message);
  const [postInterest, setPostInterest] = useState(interest);

  const handleClick = (id) => {
    dispatch(updatePost(id));
    toast.success("post updated");
    navigate("/");
  };
  return (
    <>
      <section className="post-form">
        <form>
          <div className="form-group">
            <label htmlFor="interest">Interest:</label>
            <select
              id="interest"
              value={postInterest}
              onChange={(e) => setPostInterest(e.target.value)}
            ></select>
            <label htmlFor="text">Message:</label>
            <textarea
              id="text"
              name="text"
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group edit-post-btn">
            <Link to="/">
              <button className="btn">back</button>
            </Link>
            <button
              className="add-btn btn"
              type="submit"
              onClick={() => handleClick(_id)}
            >
              save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditPost;
