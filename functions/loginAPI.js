import axios from "axios";
import Router from "next/router";
import { AXIOS_BASE_URL } from "./constants";
import { re } from "mathjs";

axios.defaults.baseURL = AXIOS_BASE_URL;

//*Landing Page
export async function checkIfLoggedIn() {
  const res = await axios({
    method: "POST",
    url: "/checklogin",
    withCredentials: true,
  });
  return res.data;
}

export async function checkLoggedIn() {
  const res = await axios({
    method: "POST",
    url: "/checklogin",
    withCredentials: true,
  });
  return res.data;
}

//*Login Page
export async function checkLogin() {
  const res = await axios({
    method: "POST",
    url: "/checklogin",
    withCredentials: true,
  });
  if (res.data.status === 200) {
    return res.data;
  } else {
    Router.push("/login");
  }
}

export async function UserLogin(event) {
  event.preventDefault();
  let data = {
    username: event.target.username.value,
    password: event.target.password.value,
  };
  console.log(data);
  const res = await axios({
    method: "POST",
    url: "/login",
    data: data,
    withCredentials: true,
  });
  if (res.data) {
    return res.data;
  } else {
    alert("Server Error");
  }
}

export async function GetUser() {
  const res = await axios({
    url: "/users/get_user_details",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function LogOut() {
  const res = await axios({
    method: "post",
    url: "/logout",
    withCredentials: true,
  });
  if (res.data.status === 200) {
    return res.data.status;
  }
}
