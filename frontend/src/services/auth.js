import axios from "axios";

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const signUp = async (data) => {
  try {
    const response = await axios.post("/api/auth/register", data);
    console.log("Signup successful", response.data.user);

    console.log(response);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    throw error.response?.data?.msg || "Signup failed";
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post("/api/auth/login", data);
    console.log("Login successfully", response.data.user);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    throw error.response?.data?.msg || "Login failed";
  }
};
