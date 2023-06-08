import axios from "axios";
import Router from "next/router";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetVehiclesAvailable() {
  const res = await axios({
    url: "/vehicles/available",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetVehicleFuel(vehicleID) {
  const res = await axios({
    url: "/vehicles/fuel/" + vehicleID,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetVehicles() {
  const res = await axios({
    url: "/vehicles/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function CheckCrpNoinDB(crp_no) {
  var res = await axios({
    url: "/vehicles/crp_no",
    withCredentials: true,
    method: "POST",
    data: {
      crp_no: parseInt(crp_no),
    },
  });
  return res.data;
}

export async function handleVehicleSubmit(vehicle) {
  const res = await axios({
    url: "/vehicles/add",
    withCredentials: true,
    method: "POST",
    data: vehicle,
  });
  if (res.status == 200) {
    Router.push("/admin/vehicles/vehicle/" + res.data.vehicle_id);
  }
}

export async function GetVehicle(id) {
  const res = await axios({
    url: "/vehicles/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function updateVehicle(updatedVehicle, id) {
  const res = await axios({
    url: "/vehicles/" + id + "/update",
    method: "POST",
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: updatedVehicle,
  });
  if (res.data.status == 200) {
    Router.reload();
  }
}

export async function deleteVehicle(id) {
  const res = await axios({
    url: "/vehicles/" + id + "/delete",
    method: "POST",
    withCredentials: true,
  });
  Router.push("/admin/vehicles/");
  return res.data;
}
