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
    Router.push("/admin/");
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
    Router.push("/admin/");
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
    Router.push("/admin/");
  } else {
    alert("Wrong Username or Password");
  }
}
