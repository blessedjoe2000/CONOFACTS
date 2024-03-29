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
  } catch (error) {
    console.log(error);
    throw error;
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//update user
export const updateUser = async (userData) => {
  try {
    const { _id, name, email, username, dob, about, location, imageUrl } =
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
    if (imageUrl && imageUrl.trim() !== "") {
      updatedData.imageUrl = imageUrl;
    }

    const response = await axios.patch(`${API_URL}/${_id}`, updatedData, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
    }
    return response.data.updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//delete user by id
export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });

  localStorage.removeItem("user");
  localStorage.removeItem("token");

  return response.data;
};

//get user by id
export const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });

  return response.data;
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("postUser");
};

const authService = {
  register,
  login,
  logout,
  updateUser,
  getUserById,
  deleteUser,
};

export default authService;
