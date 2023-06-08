import axios from "axios";
import Router from "next/router";
import { AXIOS_BASE_URL } from "./constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

//*Landing Page
export async function checkIfLoggedIn() {
  const res = await axios({
    method: "POST",
    url: "/checklogin",
    withCredentials: true,
  });
  if (res.data.status === 200) {
    Router.push("/admin/duties/");
  } else {
    Router.push("/login");
  }
}

//*Login Page
export async function checkLogin() {
  const res = await axios({
    method: "POST",
    url: "/checklogin",
    withCredentials: true,
  });
  if (res.data.status === 200) {
    Router.push("/admin/duties/");
  }
}

export async function UserLogin(event) {
  event.preventDefault();
  let data = {
    username: event.target.username.value,
    password: event.target.password.value,
  };
  const res = await axios({
    method: "POST",
    url: "/login",
    data: data,
    withCredentials: true,
  });

  if (res.status === 200) {
    Router.push("/admin/duties/");
  } else {
    alert("Wrong Username or Password");
  }
}

export async function GetUser() {
  const res = await axios({
    url: "http://localhost:3000/users/get_user_details",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function LogOut() {
  const res = await axios({
    method: "post",
    url: "http://localhost:3000/logout",
    withCredentials: true,
  });
  if (res.data.status === 200) {
    window.location.href = "/login";
  }
}
