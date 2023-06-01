import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import moment from "moment";
import {
  GetVehiclesAvailable,
  GetDriversAvailable,
  addNewVehicle,
  GetLatestIndentNo,
} from "@/functions/axiosApis";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [duty, setDuty] = useState([]);
  const [showCompletedView, setShowCompletedView] = useState(false);

  function setD({ target: { name, value } }) {
    setDuty({ ...duty, [name]: value });
  }

  function setCompleteView({ target: { name, value } }) {
    setDuty({ ...duty, [name]: value });
    setShowCompletedView(!showCompletedView);
  }

  useEffect(() => {
    GetVehiclesAvailable().then((data) => {
      setVehicles(data);
      GetLatestIndentNo().then((indent_no) => {
        let v = data[0] ? data[0]._id : "";
        setDuty({
          ...duty,
          indent_no: indent_no + 1,
          vehicle: data[0] ? data[0]._id : "",
          date: moment().format("YYYY-MM-DD"),
          out_datetime: moment().format("YYYY-MM-DDTHH:mm"),
          completed: "false",
        });
      });
    });
    GetDriversAvailable().then((data) => {
      setDrivers(data);
    });
  }, []);

  return (
    <>
      <title>Add Duty</title>

      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <h3>Add New Duty</h3>
          <Row>
            <div className="col-lg-8 m-1">
              <div className="card">
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      addNewVehicle(e, duty);
                    }}
                  >
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        <i className="bi bi-list-ol"></i> Indent No :
                      </label>
                      <div className="col-sm-7">
                        <input
                          defaultValue={duty.indent_no}
                          onChange={setD}
                          type="number"
                          name="indent_no"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        <i className="bi bi-car-front"></i> Vehicle Number :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="vehicle"
                          className="form-select"
                          aria-label="Default select example"
                          onChange={setD}
                        >
                          {vehicles.map((vehicle, index) => {
                            return (
                              <option key={index + 1} value={vehicle._id}>
                                CRP - {vehicle.vehicle_crp_no}{" "}
                                {vehicle.registration_no}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        <i className="bi bi-calendar2-check"></i> Date :
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
                        <i className="bi bi-box-arrow-right"></i> Out Date and
                        Time :
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
                        <i className="bi bi-list-task"></i> Purpose :
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
                      <label className="col-sm-5 col-form-label">
                        <i className="bi bi-person-fill"></i> Driver :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="driver"
                          className="form-select"
                          aria-label="Default select example"
                          onChange={setD}
                        >
                          {drivers.map((driver, index) => (
                            <option key={index + 1} value={driver._id}>
                              {driver.license_no} - {driver.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <hr />

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        <i className="bi bi-check-circle"></i> Completed :
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
                            <i className="bi bi-box-arrow-in-right"></i> In Date
                            and Time :
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
                            <i className="bi bi-distribute-horizontal"></i> Km
                            Run :
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
                            <i className="bi bi-app-indicator"></i> Meter Count:
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
                            <i className="bi bi-fuel-pump"></i> Fuel :
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
                          + Add New Duty
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1"
              style={{ maxHeight: "40vh" }}
            >
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
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
