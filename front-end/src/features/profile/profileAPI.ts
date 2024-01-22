import axios from "axios";
import { profileURL } from "../../endpoints/endpoints";
import Profile from "../../models/Profile";



export function getProfile() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Profile }>((resolve =>
      axios.get(`${profileURL}/get_profile/`, config).then(res => resolve({ data: res.data }))))}




