import axios from "axios";
import Router from "next/router";
import moment from "moment";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function getOilBalance() {
  const res = await axios({
    url: "http://localhost:3000/oilbalance/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function getOilBalanceLog(id) {
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/oil/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function getOil(id) {
  const res = await axios({
    url: "http://localhost:3000/oilbalance/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function getAllOilBalance() {
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/log",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function getVoucher(id) {
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/voucher/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function getLastVoucherEntry() {
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/last1",
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

export async function addOilType(event) {
  event.preventDefault();
  const data = {
    type: event.target.type.value,
  };

  const res = await axios({
    url: "http://localhost:3000/oilbalance/add_oil_type",
    withCredentials: true,
    method: "POST",
    data: data,
  });
  if (res.data.status == 200) {
    Router.push("/admin/fuel/balance");
  }
}

export async function allotFuel(event, newOil) {
  event.preventDefault();
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/allot",
    withCredentials: true,
    method: "POST",
    data: newOil,
  });
  if (res.data.status == 200) {
    Router.push("/admin/fuel/balance");
  }
}
