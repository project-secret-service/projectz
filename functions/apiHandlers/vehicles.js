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
