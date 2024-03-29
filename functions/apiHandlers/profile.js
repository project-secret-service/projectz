import axios from "axios";
import Router from "next/router";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetProfile() {
  const res = await axios({
    url: "/users/get_user_details",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function updateProfileDetails(event, setLoading, user) {
  event.preventDefault();
  setLoading(true);
  var data = {
    name: event.target.name.value,
    role: event.target.role.value,
    rank: event.target.rank.value,
    designation: event.target.designation.value,
    phone: event.target.phone.value,
    email: event.target.email.value,
    photo: event.target.profile_pic.files[0],
  };
  const res = await axios({
    url: "/users/update/" + user._id,
    method: "PUT",
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  });
  if (res.data.status === 200) {
    Router.reload();
  }
}
