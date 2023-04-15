import { useState } from "react";
import { Link } from "react-router-dom";
import "./chooseInterest.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { update } from "../../features/auth/authSlice";

function ChooseInterest() {
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [formInterest, setFormInterest] = useState({ interests: [] });

  const dispatch = useDispatch();

  const interestArray = [
    "Sports",
    "Wildlife",
    "Road Trip",
    "Book Club",
    "Games",
    "Adventure",
  ];

  const { interests } = formInterest;

  const onClickNext = () => {
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("user")),
      interests: selectedInterest,
    };

    dispatch(update(updatedUser))
      .then(() => {
        toast.success("User interests updated successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleInterest = (interest) => {
    if (selectedInterest.includes(interest)) {
      setSelectedInterest(selectedInterest.filter((item) => item !== interest));
    } else {
      setSelectedInterest([...selectedInterest, interest]);
      // setFormInterest({ interests: [...selectedInterest, interest] });
    }
  };

  const disabledNextBtn = selectedInterest.length < 2;

  return (
    <>
      <div className="interest-container">
        {interestArray.map((interest) => {
          return (
            <button
              className={`interest ${
                selectedInterest.includes(interest) ? "highlight" : ""
              }`}
              value={interest}
              onClick={() => handleInterest(interest)}
            >
              {interest}
            </button>
          );
        })}
      </div>
      <div className="next-btn">
        <Link to="/">
          <button
            onClick={onClickNext}
            disabled={disabledNextBtn}
            className={`interest-next-btn ${disabledNextBtn ? "disabled" : ""}`}
          >
            Next
          </button>
        </Link>
      </div>
    </>
  );
}

export default ChooseInterest;
