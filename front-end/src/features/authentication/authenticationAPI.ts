import axios from "axios";
import { loginURL, logoutURL, registerURL } from "../../endpoints/endpoints";
import { Login, Register } from "../../models/Authentication";

const register = async (userData: Register) => {
    const response = await axios.post(registerURL, userData);
    return response.data;
};

const login = async (userData: Login) => {
    const response = await axios.post(loginURL, userData);

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
    }

    return response.data;
};


// const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("is_staff");
//     localStorage.removeItem("userName");
// };


const logout = async () => {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
  }

    try {
      const refreshToken = JSON.parse(localStorage.getItem("token") || "").refresh;
  
      const response = await axios.post(logoutURL, { refresh_token: refreshToken }, config);
  
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  
const authenticationService = {
    register,
    login,
    logout,
};

export default authenticationService;
