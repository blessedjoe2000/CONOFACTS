import axios from "axios";

const API_URL = `http://localhost:8000/conofacts/interests`;

//create interest
const createInterest = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getInterest = async () => {
  const response = await axios.get(API_URL);
  console.log("response", response);

  return response.data;
};

const interestService = { createInterest, getInterest };

export default interestService;
