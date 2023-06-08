import axios from "axios";
import Router from "next/router";
import moment from "moment";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetMemoDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/defectmemos/" + id,
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

export async function GetCards() {
  const res = await axios({
    url: "http://localhost:3000/job_card/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetParts() {
  const res = await axios({
    url: "http://localhost:3000/inventory/items/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetMemos() {
  const res = await axios({
    url: "http://localhost:3000/defectmemos/desc",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}
