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

//logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
