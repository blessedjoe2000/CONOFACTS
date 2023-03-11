import { useState } from "react";
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
  const disabledNext = selectedInterest.length < 2;

  return (
    <>
      <div className="interest-container">
        {interestArray.map((interest) => {
          return (
            <button
              className="interest"
              value={interest}
              onClick={handleInterest}
            >
              {interest}
            </button>
          );
        })}
      </div>
      <div className="next-btn">
        <button
          disabled={disabledNext}
          className={`interest-next-btn ${disabledNext ? "disabled" : ""}`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ChooseInterest;
