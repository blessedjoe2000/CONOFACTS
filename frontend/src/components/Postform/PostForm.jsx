import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/postSlice";
import { toast } from "react-toastify";
import "./postform.css";

function PostForm() {
  const [message, setMessage] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");

  const userInterests = useSelector((state) => state.auth?.user?.interests);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (message === "") {
      toast.error("Please enter post message");
    } else {
      dispatch(createPost({ interest: selectedInterest, message }));
      toast.success("post added successfully");
      setSelectedInterest("");
      setMessage("");
    }
  };

  // console.log("interest", userInterests);

  return (
    <section className="post-form">
      <form onSubmit={onSubmit}>
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
        <div className="form-group">
          <button
            className={`add-btn btn btn-block ${
              selectedInterest === "" ? "disabled" : ""
            }`}
            type="submit"
            disabled={selectedInterest === ""}
          >
            Add post
          </button>
        </div>
      </form>
      <section className="add-post-divider"></section>
    </section>
  );
}

export default PostForm;
