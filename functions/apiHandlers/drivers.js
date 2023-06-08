import axios from "axios";
import Router from "next/router";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

const API_URL = AXIOS_BASE_URL + "/drivers";

export async function GetDriversAvailable() {
  const res = await axios({
    url: "/drivers/available",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetDriverDetails(id) {
  const res = await axios({
    url: "/drivers/" + id,
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

export async function addNewDriver(event, driver) {
  event.preventDefault();
  const res = await axios({
    url: "/drivers/add",
    withCredentials: true,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      ...driver,
      profile_pic: event.target.profile_pic.files[0],
    },
  });
  Router.push("/admin/drivers");
}

export async function GetDrivers() {
  const res = await axios({
    url: "/drivers/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}
