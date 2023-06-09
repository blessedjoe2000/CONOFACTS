import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/postSlice";
import { toast } from "react-toastify";
import "./postform.css";

function PostForm() {
  const CLOUD_NAME = "dpn75vlns";
  const UPLOAD_PRESET = "conofacts";

  const currentDate = new Date().toISOString().split("T")[0];

  const [message, setMessage] = useState("");
  const [tag, setTag] = useState([]);
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState("");
  const [dateFrom, setDateFrom] = useState(currentDate);
  const [dateTo, setDateTo] = useState(currentDate);
  const [noOfTravelers, setNoOfTravelers] = useState(1);

  const dispatch = useDispatch();

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    if (dateFrom < currentDate) {
      return toast.error("Travel start date cannot be less than today");
    }

    if (dateFrom > dateTo || dateFrom === dateTo) {
      return toast.error(
        "Travel start date must be less than and travel end date"
      );
    }
    if (message === "" || destination === "" || !imageUrl) {
      return toast.error("Fill all required fields");
    } else {
      dispatch(
        createPost({
          destination,
          message,
          dateFrom,
          dateTo,
          noOfTravelers,
          tag,
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
            name="noOfTravelers"
            id="noOfTravelers"
            value={noOfTravelers}
            min="1"
            step="1"
            onChange={(e) => setNoOfTravelers(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Add tags:</label>
          <input
            className="form-control"
            type="text"
            name="tag"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
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
