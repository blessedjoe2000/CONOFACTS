import { useState } from "react";
import { Link } from "react-router-dom";
import "./chooseInterest.css";

function ChooseInterest() {
  const [selectedInterest, setSelectedInterest] = useState([]);

  const interestArray = [
    "Sports",
    "Wildlife",
    "Road Trip",
    "Book Club",
    "Games",
    "Adventure",
  ];

  const handleInterest = (interest) => {
    if (selectedInterest.includes(interest)) {
      setSelectedInterest(selectedInterest.filter((item) => item !== interest));
    } else {
      setSelectedInterest([...selectedInterest, interest]);
      console.log(selectedInterest);
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
        <Link to="/timeline">
          <button
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
