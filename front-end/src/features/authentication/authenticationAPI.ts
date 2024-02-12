import axios from "axios";
import { authenticationURL, loginURL, logoutURL, registerURL } from "../../endpoints/endpoints";
import { Login, Register } from "../../models/Authentication";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



export function activateAccount(token: string) {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    return new Promise<{ data: any }>((resolve =>
      axios.get(`${authenticationURL}/activate/${token}`, config)
        .then(res => resolve({ data: res.data }))));
  }



export function deleteInactive() {
    return new Promise<{ data: any }>((resolve =>
      axios.post(`${authenticationURL}/delete_inactive_users/`)
        .then(res => resolve({ data: res.data }))));
  }

        

const register = async (userData: Register) => {
  try {
      const response = await axios.post(registerURL, userData);
      return response.data;
  } catch (error: any) {
      if (error.response) {
          if (error.response.status === 400) {
              toast.error(".שם המשתמש כבר קיים", {
                  position: toast.POSITION.TOP_RIGHT,
              });
              return { error: ".שם המשתמש כבר קיים" };
          } else {
              toast.error("שגיאה בהרשמה.", {
                  position: toast.POSITION.TOP_RIGHT,
              });
              return { error: "שגיאה בהרשמה." };
          }
      } else {
          toast.error("שגיאת רשת או במהלך הבקשה.", {
              position: toast.POSITION.TOP_RIGHT,
          });
          return { error: "שגיאת רשת או במהלך הבקשה." };
      }
  }
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
