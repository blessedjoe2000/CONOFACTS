import { useState } from "react";
import "./chooseInterest.css";

function ChooseInterest() {
  const [selectedInterest, setSelectedInterest] = useState([]);

  const selectInterest = (interest) => {
    if (!selectedInterest.includes(interest)) {
      setSelectedInterest([...selectedInterest, interest]);
    }
    console.log("selected interest", selectedInterest);
  };
  const disabledNext = selectedInterest.length < 2;

  return (
    <>
      <div className="interest-container">
        <button
          onClick={() => {
            selectInterest("sports");
          }}
          className={`interest`}
        >
          Sports
        </button>
        <button
          onClick={() => {
            selectInterest("wildlife");
          }}
          className={`interest`}
        >
          Wildlife
        </button>
        <button
          onClick={() => {
            selectInterest("road-trip");
          }}
          className={`interest`}
        >
          Road Trip
        </button>
        <button
          onClick={() => {
            selectInterest("book-club");
          }}
          className={`interest`}
        >
          Book Club
        </button>
        <button
          onClick={() => {
            selectInterest("games");
          }}
          className={`interest`}
        >
          Games
        </button>
        <button
          onClick={() => {
            selectInterest("adventure");
          }}
          className={`interest`}
        >
          Adventure
        </button>
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
