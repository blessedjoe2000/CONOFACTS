import axios from "axios";

const API_URL = `conofacts/users`;

//get postuser by id
export const getPostUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/postuser/${userId}`, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
  localStorage.setItem("postUser", JSON.stringify(response.data));

  return response.data;
};

const postUserService = {
  getPostUserById,
};

export default postUserService;
