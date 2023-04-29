import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePost } from "../features/post/postSlice";
import { Link, useNavigate } from "react-router-dom";

function EditPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id, interest, message } = useSelector((state) => state.posts.posts);

  const [postMessage, setPostMessage] = useState("");

  useEffect(() => {
    setPostMessage(message);
  }, [message]);

  console.log("message", postMessage);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ _id, message: postMessage }));
    toast.success("post updated");
    navigate("/");
  };
  return (
    <>
      <section className="post-form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="interest">Interest:</label>
            <input type="text" defaultValue={interest} />
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
            <button className="add-btn btn" type="submit">
              save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditPost;