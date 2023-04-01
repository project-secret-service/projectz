import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function GetVehicles() {
  const res = await axios({
    url: "http://localhost:3000/vehicles/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

function sucessful() {
  toast.success("Sucessfully Added");
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;
}
function unsucessful() {
  toast.error("Server Error");
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;
}

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}

async function addNewVehicle(event) {
  event.preventDefault();
  console.log(event.target.vehicle);

  var inTime =
    event.target.date_of_travel.value + "T" + event.target.In_time.value;
  // inTime=new Date(inTime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
  const innTIme = new Date(inTime);
  var inntime = convertUTCDateToLocalDate(innTIme);

  var outTime =
    event.target.date_of_travel.value + "T" + event.target.out_time.value;
  // outTime=new Date(outTime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
  const ouTTIme = new Date(outTime);
  var outtime = convertUTCDateToLocalDate(ouTTIme);

    // console.log(s)
    var data = {
        vehicle_id: event.target.vehicle_no.value,
        date: event.target.date_of_travel.value,
        indent_no: event.target.vehicle_no.value,
        out_time: outtime,
        in_time: inntime,
        purpose: event.target.Purpose.value,
        from: event.target.From.value,
        to: event.target.To.value,
        km_run: event.target.Km_run.value,
        meter_count: event.target.Meter_count.value,
        approved_by_mto: event.target.approved.value,
        fuel: event.target.Fuel.value,
        mission_ended: event.target.completed.value

    }

  console.log(res.status);
  if (res.status == 200) sucessful();
  else unsucessful();
    console.log(event.target.vehicle_no.value);
    const res = await axios({url: "http://localhost:3000/duty_log/add", withCredentials: true, method: "POST", data: data});
    console.log(res.status);
    if(res.status!=200)
     sucessful();
     else
     unsucessful();
    
}

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  // const [particularvehicles, setnewVehicles] = useState([]);
  const [errors, setErrors] = useState({ vehicle_sl_no: "" });
  useEffect(() => {
    GetVehicles().then((data) => {
      setVehicles(data);
    });
  }, []);

  function OpenLink(link) {
    console.log(link);
    Router.push("/admin/vehicles/" + link);
  }

  return (
    <>
      <title>Add Duty</title>

      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0">
          <Row>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h1>Add New Duty</h1>

                  <form onSubmit={addNewVehicle}>
                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Vehicle Number :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="vehicle_no"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          {vehicles.map((vehicle, index) => (
                            <option value={vehicle._id}>
                              {vehicle.vehicle_no}
                            </option>
                          ))}{" "}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of travel:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="date"
                          name="date_of_travel"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Out Time:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="time"
                          name="out_time"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Purpose :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="Purpose"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        In time :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="time"
                          name="In_time"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        From :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="From"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        To :
                      </label>
                      <div className="col-sm-7">
                        <input type="text" name="To" className="form-control" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Km Run :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="Km_run"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Meter Count:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="Meter_count"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Approved By Mto :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="approved"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="true">Approved</option>
                          <option value="false">Not Approved</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Fuel :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="Fuel"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Completed :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="completed"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="true">Completed</option>
                          <option value="false">Not Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ float: "right" }}
                        >
                          Submit Form
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1"
              style={{ maxHeight: "10vh" }}
            >
              <Link href={"/admin/duties"}>
                <Button className="w-100 mb-1">List Vehicles</Button>
              </Link>
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
