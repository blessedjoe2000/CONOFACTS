import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../features/post/postSlice";

function PostForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ title, message }));
    setTitle("");
    setMessage("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text"> Title</label>
          <input
            id="text"
            name="text "
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="text"> Message</label>
          <input
            id="text"
            name="text "
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add post
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostForm;
