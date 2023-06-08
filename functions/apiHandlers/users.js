import axios from "axios";
import Router from "next/router";
import moment from "moment";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetUserDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/users/" + id,
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

export async function AddNewUser(newUserDetails) {
  const res = await axios({
    url: "http://localhost:3000/users/add",
    withCredentials: true,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: newUserDetails,
  });
  return res;
}

export async function GetUsers() {
  const res = await axios({
    url: "http://localhost:3000/users/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}
