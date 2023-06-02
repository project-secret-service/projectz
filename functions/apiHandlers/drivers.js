import axios from "axios";
import Router from "next/router";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetDriversAvailable() {
  const res = await axios({
    url: "drivers/available",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}
