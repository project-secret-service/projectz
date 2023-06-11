import axios from "axios";
import Router from "next/router";
import moment from "moment";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetUserDetails(id) {
  const res = await axios({
    url: "/users/" + id,
    withCredentials: true,
    method: "GET",
  });
  if (res.data.status === 401) {
    Router.push("/login");
    return (res.data = {});
  } else {
    return res.data;
  }
}

export async function AddNewUser(newUserDetails) {
  const res = await axios({
    url: "/users/add",
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
    url: "/users/",
    method: "GET",
    withCredentials: true,
  });
  if (res.data.status === 401) {
    Router.push("/login");
    return (res.data = []);
  } else {
    return res.data;
  }
}
