import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../features/post/postSlice";
import { toast } from "react-toastify";
import "./postform.css";
import uploadImage from "../uploadImage";

function PostForm() {
  const currentDate = new Date().toISOString().split("T")[0];

  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState("");
  const [dateFrom, setDateFrom] = useState(currentDate);
  const [dateTo, setDateTo] = useState(currentDate);
  const [noOfTravelers, setNoOfTravelers] = useState(1);

  const [tagInput, setTagInput] = useState("");

  const dispatch = useDispatch();

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const enteredTag = tagInput.trim();
      if (enteredTag && tags.length < 5) {
        setTags((prevTags) => [...prevTags, { enteredTag }]);
        setTagInput("");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage(image);

    if (dateFrom < currentDate) {
      return toast.error("Travel start date cannot be less than today");
    }

    if (dateFrom > dateTo || dateFrom === dateTo) {
      return toast.error(
        "Travel start date must be less than and travel end date"
      );
    }

    if (destination === "") {
      return toast.error("Destination is required");
    } else {
      dispatch(
        createPost({
          destination,
          message,
          dateFrom,
          dateTo,
          noOfTravelers,
          tags,
          imageUrl,
        })
      );
    }

    toast.success("post added successfully");
    setDestination("");
    setMessage("");
  };

  return (
    <section className="post-form">
      <form className="post-container" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="destination">
            Destination: <span className="required">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            name="destination"
            id="destination"
            value={destination}
            placeholder="Enter destination..."
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Message:</label>
          <textarea
            id="text"
            name="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="date-group form-group">
          <div className="form-group">
            <label htmlFor="dateFrom">
              Travel starts: <span className="required">*</span>
            </label>
            <input
              className="form-control"
              type="date"
              name="dateFrom"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTo">
              Travel ends: <span className="required">*</span>
            </label>
            <input
              className="form-control"
              type="date"
              name="dateTo"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="noOfTravelers">
            Number of travelers: <span className="required">*</span>
          </label>
          <input
            className="form-control"
            type="number"
            id="noOfTravelers"
            value={noOfTravelers}
            min="1"
            step="1"
            inputMode="numeric"
            onChange={(e) => setNoOfTravelers(parseInt(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Add tags:</label>
          <input
            className="form-control"
            type="text"
            name="tag"
            id="tag"
            value={tagInput}
            onKeyDown={handleKeyDown}
            onChange={handleTagChange}
          />
        </div>
        <div className="tag-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag-item">
              {`${tag.enteredTag} `}
            </span>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload photo:</label>
          <input
            className="form-control"
            type="file"
            name="image"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <button className={`add-btn btn btn-block `} type="submit">
            Add post
          </button>
        </div>
      </form>
      <section className="add-post-divider"></section>
    </section>
  );
}

export default PostForm;
