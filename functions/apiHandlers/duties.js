import axios from "axios";
import Router from "next/router";
import moment from "moment";
import { AXIOS_BASE_URL } from "../constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export async function GetDutiesDesc() {
  const res = await axios({
    url: "/duty_log/desc",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function ActiveDuty(id) {
  const res = await axios({
    url: "/duty_log/active/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function GetDuties() {
  const res = await axios({
    url: "/duty_log/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export function OpenDuty(link) {
  Router.push("/admin/duties/" + link);
}

export async function addNewVehicleOnDuty(event, duty) {
  event.preventDefault();
  let data = {
    ...duty,
    out_datetime: moment(duty.out_datetime).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  };

  if (event.target.completed.value == "true") {
    data = {
      ...data,
      in_datetime: moment(duty.in_datetime).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    };
  }

  data = {
    ...data,
    mission_ended: event.target.completed.value,
    date: event.target.date.value,
    indent_no: event.target.indent_no.value,
    driver: event.target.driver.value,
  };

  const res = await axios({
    url: "/duty_log/add",
    withCredentials: true,
    method: "POST",
    data: data,
  });

  if (res.status == 200) {
    Router.push("/admin/duties");
  }
}

export async function GetLatestIndentNo() {
  const res = await axios({
    url: "/duty_log/last_indent_no",
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

export async function GetOnDutyVehicles() {
  const res = await axios({
    url: "/duty_log/uncompleted",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export async function UpdateDutyDetails(event, duty) {
  event.preventDefault();
  var data = {
    in_datetime: event.target.in_datetime.value,
    fuel: event.target.fuel.value,
    meter_count: event.target.meter_count.value,
    mission_ended: true,
  };

  const res = await axios({
    url: "/duty_log/update/" + duty._id,
    withCredentials: true,
    method: "PUT",
    data: data,
  });

  if (res.status == 200) {
    Router.push("/admin/duties");
  }
}

export async function GetDutiesFromDates(from, to) {
  const res = await axios({
    method: "get",
    url: `http://localhost:3000/duty_log/duties/${from}/${to}`,
    withCredentials: true,
  });
  return res.data;
}

export async function GetDutyDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/duty_log/" + id,
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

export async function AddDutySign(id, password, signAs) {
  const res = await axios({
    url: "http://localhost:3000/duty_log/sign/add/" + signAs,
    withCredentials: true,
    method: "POST",
    data: {
      dutyID: id,
      password: password,
    },
  });
  return res.data;
}
