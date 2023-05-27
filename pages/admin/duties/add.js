import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

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

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [duty, setDuty] = useState([]);
  const [showCompletedView, setShowCompletedView] = useState(false);
  const router = useRouter();

  async function addNewVehicle(event) {
    event.preventDefault();
    let data = {
      ...duty,
      out_datetime: moment(duty.out_datetime).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ),
    };

    if (event.target.completed.value == "true") {
      data = {
        ...data,
        in_datetime: moment(duty.in_datetime).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
      };
    }

    data = {
      ...data,
      mission_ended: event.target.completed.value,
    };

    const res = await axios({
      url: "http://localhost:3000/duty_log/add",
      withCredentials: true,
      method: "POST",
      data: data,
    });

    if (res.status == 200) {
      sucessful();
      router.push("/admin/duties");
    } else unsucessful();
  }

  function setD({ target: { name, value } }) {
    setDuty({ ...duty, [name]: value });
  }

  function setCompleteView({ target: { name, value } }) {
    setDuty({ ...duty, [name]: value });
    setShowCompletedView(!showCompletedView);
  }

  const [errors, setErrors] = useState({ vehicle_sl_no: "" });

  useEffect(() => {
    GetVehicles().then((data) => {
      setVehicles(data);
      setDuty({
        ...duty,
        vehicle_id: data[0]._id,
        date: moment().format("YYYY-MM-DD"),
        out_datetime: moment().format("YYYY-MM-DDTHH:mm"),
        completed: false,
      });
    });
  }, []);

  return (
    <>
      <title>Add Duty</title>

      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0">
          <h3>Add New Duty</h3>
          <Row>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={addNewVehicle}>
                    <ToastContainer />
                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Vehicle Number :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="vehicle_no"
                          className="form-select"
                          aria-label="Default select example"
                          onChange={setD}
                        >
                          {vehicles.map((vehicle, index) => (
                            <option key={index + 1} value={vehicle._id}>
                              CRP - {vehicle.vehicle_crp_no}{" "}
                              {vehicle.registration_no}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date :
                      </label>
                      <div className="col-sm-7">
                        <input
                          defaultValue={new Date().toISOString().slice(0, 10)}
                          onChange={setD}
                          type="date"
                          name="date"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Out Date and Time :
                      </label>
                      <div className="col-sm-7">
                        <input
                          defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
                          onChange={setD}
                          type="datetime-local"
                          name="out_datetime"
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
                          onChange={setD}
                          type="text"
                          name="purpose"
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
                          onChange={setD}
                          type="text"
                          name="from"
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
                        <input
                          type="text"
                          onChange={setD}
                          name="to"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <hr />

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Completed :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="completed"
                          className="form-select"
                          aria-label="Default select example"
                          onChange={setCompleteView}
                        >
                          <option value="false">Not Completed</option>
                          <option value="true">Completed</option>
                        </select>
                      </div>
                    </div>
                    {showCompletedView && (
                      <>
                        <div className="row mb-3">
                          <label
                            htmlFor="inputText"
                            className="col-sm-5 col-form-label"
                          >
                            In Date and Time :
                          </label>
                          <div className="col-sm-7">
                            <input
                              defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
                              onChange={setD}
                              type="datetime-local"
                              name="in_datetime"
                              className="form-control"
                            />
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
                              onChange={setD}
                              type="number"
                              name="km_run"
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
                              onChange={setD}
                              type="number"
                              name="meter_count"
                              className="form-control"
                            />
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
                              onChange={setD}
                              type="number"
                              name="fuel"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="row">
                      <div className="col-sm-10">
                        <br />
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ float: "right", width: "70%" }}
                        >
                          Add New Duty
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
