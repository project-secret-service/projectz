import axios from "axios";
import Router from "next/router";
import moment from "moment";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetMemoDetails(id) {
  const res = await axios({
    url: "/defectmemos/" + id,
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

export async function GetCards() {
  const res = await axios({
    url: "/job_card/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetParts() {
  const res = await axios({
    url: "/inventory/items/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetMemos() {
  const res = await axios({
    url: "/defectmemos/desc",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetInspectionHistory() {
  const res = await axios({
    url: "/inspection/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function AddSignToDefectMemo(signAs, id, password) {
  const res = await axios({
    url: "/defectmemos/sign/add/" + signAs,
    withCredentials: true,
    method: "POST",
    data: {
      memoID: id,
      password: password,
    },
  });
  return res;
}

export async function AddMemo(event, memo, selectedParts, defects, jobWorks) {
  event.preventDefault();
  var data = {
    ...memo,
    parts: selectedParts,
    defects: defects,
    job_works: jobWorks,
  };
  const res = await axios({
    url: "/defectmemos/add",
    method: "POST",
    data: data,
    withCredentials: true,
  });
  Router.push("/defectmemos");
}
