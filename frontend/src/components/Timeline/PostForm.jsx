import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/postSlice";

function PostForm() {
  const [message, setMessage] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const interests = useSelector((state) => state.interests.interests); // access interests array from Redux store
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ interest: selectedInterest, message }));
    console.log("interest", interests);
    setSelectedInterest(""); // clear selected interest
    setMessage("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="interest"> Interest</label>
          <select
            id="interest"
            value={selectedInterest}
            onChange={(e) => setSelectedInterest(e.target.value)}
          >
            <option value="">Select an interest</option>{" "}
            {/* add an initial option for empty selection */}
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          <label htmlFor="text"> Message</label>
          <input
            id="text"
            name="text"
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
