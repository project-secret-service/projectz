import axios from "axios";
import Router from "next/router";
import moment from "moment";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetIssueDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/inventory/issue/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetIssues() {
  const res = await axios({
    url: "http://localhost:3000/inventory/items",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetItemHistory(id) {
  const res = await axios({
    url: "http://localhost:3000/inventory/item_history/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetItemDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/inventory/items/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetOrderDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/inventory/order/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetOrders() {
  const res = await axios({
    url: "http://localhost:3000/inventory/items",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function addNewItem(event) {
  event.preventDefault();
  var data = {
    name: event.target.name.value,
    quantity: event.target.quantity.value,
    rate: event.target.rate.value,
    description: event.target.description.value,
  };
  const res = await axios({
    url: "http://localhost:3000/inventory/items/add",
    withCredentials: true,
    method: "POST",
    data: data,
  });

  Router.push("/admin/inventory/storage");
}

export async function GetItems() {
  const res = await axios({
    url: "http://localhost:3000/inventory/items",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}