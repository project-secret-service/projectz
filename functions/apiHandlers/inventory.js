import axios from "axios";
import Router from "next/router";
import moment from "moment";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetIssueDetails(id) {
  const res = await axios({
    url: "/inventory/issue/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetIssues() {
  const res = await axios({
    url: "/inventory/items",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetItemHistory(id) {
  const res = await axios({
    url: "/inventory/item_history/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetItemDetails(id) {
  const res = await axios({
    url: "/inventory/items/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetOrderDetails(id) {
  const res = await axios({
    url: "/inventory/order/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetOrders() {
  const res = await axios({
    url: "/inventory/items",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function addNewItem(event, data) {
  event.preventDefault();

  const res = await axios({
    url: "/inventory/items/add",
    withCredentials: true,
    method: "POST",
    data: data,
  });

  if (res.data.status === 200) {
    Router.push("/admin/inventory/storage");
  } else {
    alert(res.data.message);
  }
}

export async function GetItems() {
  const res = await axios({
    url: "/inventory/items",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function AddIssue(data) {
  const res = await axios({
    url: "/inventory/issue/add",
    method: "POST",
    withCredentials: true,
    data: data,
  });
  if (res.data.status === 200) {
    Router.push("/admin/inventory/voucher/" + res.data.issue_id);
  }
}

export async function LastIssue() {
  const res = await axios({
    url: "/inventory/issue",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function AddOrder(data) {
  console.log(data);
  const res = await axios({
    url: "/inventory/order/add",
    method: "POST",
    withCredentials: true,
    data: data,
  });
  if (res.data.status === 200) {
    Router.push("/admin/inventory/voucher/" + res.data.order_id);
  }
}

export async function LastOrder() {
  const res = await axios({
    url: "/inventory/last_voucher/sno",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function getVoucher(id) {
  const res = await axios({
    url: "/inventory/voucher/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function AddSignToInventoryVoucher(signAs, id, password) {
  const res = await axios({
    url: "/inventory/sign/add/" + signAs,
    withCredentials: true,
    method: "POST",
    data: {
      voucherID: id,
      password: password,
    },
  });
  return res;
}
