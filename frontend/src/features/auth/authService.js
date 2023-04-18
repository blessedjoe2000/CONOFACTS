import axios from "axios";

const API_URL = `conofacts/users`;

//Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//login user
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//update user
export const updateUser = async (userData) => {
  console.log("user data", userData);
  try {
    const { _id, name, email, username, dob, about, location, interests } =
      userData; // Destructure the fields you want to update
    const updatedData = {}; // Create an empty object to store the fields that have been updated
    if (name && name.trim() !== "") {
      updatedData.name = name;
    }
    if (email && email.trim() !== "") {
      updatedData.email = email;
    }
    if (username && username.trim() !== "") {
      updatedData.username = username;
    }
    if (dob && dob.trim() !== "") {
      updatedData.dob = dob;
    }
    if (about && about.trim() !== "") {
      updatedData.about = about;
    }
    if (location && location.trim() !== "") {
      updatedData.location = location;
    }
    if (interests && interests.trim() !== "") {
      updatedData.interests = interests;
    }

    const response = await axios.put(`${API_URL}/${_id}`, updatedData, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    console.log("response", response.data);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
  updateUser,
};

export default authService;
