import axios from "axios";
import Router from "next/router";
import { AXIOS_BASE_URL } from "./constants";
import { useContext } from "react";
import AuthContext from "./auth/AuthContext";

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
    console.log(res.data);
    return res.data;
  }else{
    Router.push("/login");
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
  if (res.data === "INVALID CREDENTIALS") {
    alert("Invalid Credentials");
  } else if (res.status === 200) {
    console.log(res.data);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res;
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
