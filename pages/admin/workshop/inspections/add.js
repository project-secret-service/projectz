import { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import Router from "next/router";
import { GetVehicles } from "@/functions/apiHandlers/vehicles";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  chassisChecks,
  electricalChecks,
  engineChecks,
  lubricantsChecks,
  transmissionChecks,
} from "@/components/admin/inspection/checkBoxes";
import axios from "axios";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [inspection, setInspection] = useState({
    date: new Date().toISOString().slice(0, 10),
    maintaining_unit: "M.T. WORKSHOP, CTC (T&IT) RANCHI",
    vehicle: "",
    engine: {},
    chassis: {},
    electrical: {},
    lubrication: {},
    transmission: {},
  });

  useEffect(() => {
    GetVehicles().then((data) => {
      setVehicles(data);
      setInspection({ ...inspection, vehicle: data[0]._id });
    });
  }, []);

  function handleInspectionInput(e) {
    setInspection({ ...inspection, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: `http://localhost:3000/inspection/add`,
      data: inspection,
      withCredentials: true,
    });
    if (res.data.status === 200) Router.push("/admin/workshop/inspections");
  }

  function SetTheInspection(section, label, value) {
    setInspection({
      ...inspection,
      [section]: {
        ...inspection[section],
        [value]: {
          problem: true,
          label: label,
        },
      },
    });
  }

  function deleteTheInspection(section, value) {
    let temp = inspection[section];
    delete temp[value];
    setInspection({
      ...inspection,
      [section]: temp,
    });
  }

  function handleCheckBox(e) {
    let section = e.target.parentElement.parentElement.parentElement.id;
    let label = e.target.parentElement.innerText;
    if (e.target.checked) {
      switch (section) {
        case "inspection_engine_section":
          deleteTheInspection("engine", e.target.value);
          break;
        case "inspection_chassis_section":
          deleteTheInspection("chassis", e.target.value);
          break;
        case "inspection_electrical_section":
          deleteTheInspection("electrical", e.target.value);
          break;
        case "inspection_lubrication_section":
          deleteTheInspection("lubrication", e.target.value);
          break;
        case "inspection_transmission_section":
          deleteTheInspection("transmission", e.target.value);
      }
      return;
    }
    switch (section) {
      case "inspection_engine_section":
        SetTheInspection("engine", label, e.target.value);
        break;
      case "inspection_chassis_section":
        SetTheInspection("chassis", label, e.target.value);
        break;
      case "inspection_electrical_section":
        SetTheInspection("electrical", label, e.target.value);
        break;
      case "inspection_lubrication_section":
        SetTheInspection("lubrication", label, e.target.value);
        break;
      case "inspection_transmission_section":
        SetTheInspection("transmission", label, e.target.value);
        break;
    }
  }

  return (
    <>
      <AdminLayout title={`Inspect Vehicle`}>
        <main
          id="main"
          className="col-lg-10 main opac-80"
          style={{
            marginTop: "-2rem",
          }}
        >
          <Row>
            <div className="col-lg-8 card p-3 m-1">
              <div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
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
                          type="date"
                          name="date"
                          className="form-control"
                          onChange={handleInspectionInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Maintaining Unit
                      </label>
                      <div className="col-sm-7">
                        <input
                          defaultValue={"M.T. WORKSHOP, CTC (T&IT) RANCHI"}
                          type="text"
                          name="maintaining_unit"
                          className="form-control"
                          onChange={handleInspectionInput}
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
                          onChange={handleInspectionInput}
                        >
                          {vehicles?.map((vehicle, index) => {
                            return (
                              <option key={index + 1} value={vehicle._id}>
                                CRP - {vehicle.vehicle_crp_no}{" "}
                                {vehicle.registration_no} {vehicle.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <hr />
                    <div id="inspection_engine_section">
                      ENGINE :{" "}
                      {engineChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {item.label}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={item.value}
                              id={item.id}
                              onChange={handleCheckBox}
                              defaultChecked={item.defaultChecked}
                            />
                          </label>
                        </div>
                      ))}
                    </div>

                    <div>
                      {Object.entries(inspection.engine).map(
                        ([part, inspect], index) => {
                          let i = 0;
                          let section = "engine";
                          if (inspect.problem) {
                            return (
                              <div className="row mb-3" key={index}>
                                <label
                                  htmlFor="inputText"
                                  className="col-sm-5 col-form-label"
                                >
                                  {inspect.label}
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    defaultValue={""}
                                    type="text"
                                    name={section + " " + part}
                                    className="form-control"
                                    placeholder={
                                      "Enter " +
                                      inspect.label.split(".")[1] +
                                      " Problem"
                                    }
                                    onChange={(e) => {
                                      let temp = { ...inspection };
                                      temp[section][part].description =
                                        e.target.value;
                                      setInspection(temp);
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                          return null; // Return null for non-problem entries
                        }
                      )}
                    </div>
                    <hr />
                    <div id="inspection_transmission_section">
                      TRANSMISSION ETC. :{" "}
                      {transmissionChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {item.label}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={item.value}
                              id={item.id}
                              onChange={handleCheckBox}
                              defaultChecked={item.defaultChecked}
                            />
                          </label>
                        </div>
                      ))}
                      <div>
                        {Object.entries(inspection.transmission).map(
                          ([part, inspect], index) => {
                            let i = 0;
                            let section = "transmission";
                            if (inspect.problem) {
                              return (
                                <div className="row mb-3" key={index}>
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    {inspect.label}
                                  </label>
                                  <div className="col-sm-7">
                                    <input
                                      defaultValue={""}
                                      type="text"
                                      name={section + " " + part}
                                      className="form-control"
                                      placeholder={
                                        "Enter " +
                                        inspect.label.split(".")[1] +
                                        " Problem"
                                      }
                                      onChange={(e) => {
                                        let temp = { ...inspection };
                                        temp[section][part].description =
                                          e.target.value;
                                        setInspection(temp);
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>
                    </div>

                    <hr />
                    <div id="inspection_electrical_section">
                      ELECTRICAL:{" "}
                      {electricalChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {item.label}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={item.value}
                              id={item.id}
                              onChange={handleCheckBox}
                              defaultChecked={item.defaultChecked}
                            />
                          </label>
                        </div>
                      ))}
                      <div>
                        {Object.entries(inspection.electrical).map(
                          ([part, inspect], index) => {
                            let i = 0;
                            let section = "electrical";
                            if (inspect.problem) {
                              return (
                                <div className="row mb-3" key={index}>
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    {inspect.label}
                                  </label>
                                  <div className="col-sm-7">
                                    <input
                                      defaultValue={""}
                                      type="text"
                                      name={section + " " + part}
                                      className="form-control"
                                      placeholder={
                                        "Enter " +
                                        inspect.label.split(".")[1] +
                                        " Problem"
                                      }
                                      onChange={(e) => {
                                        let temp = { ...inspection };
                                        temp[section][part].description =
                                          e.target.value;
                                        setInspection(temp);
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>
                    </div>
                    <hr />
                    <div id="inspection_lubrication_section">
                      LUBRICATION & CLEANLINESS-
                      {lubricantsChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {item.label}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={item.value}
                              id={item.id}
                              onChange={handleCheckBox}
                              defaultChecked={item.defaultChecked}
                            />
                          </label>
                        </div>
                      ))}
                      <div>
                        {Object.entries(inspection.lubrication).map(
                          ([part, inspect], index) => {
                            let i = 0;
                            let section = "lubrication";
                            if (inspect.problem) {
                              return (
                                <div className="row mb-3" key={index}>
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    {inspect.label}
                                  </label>
                                  <div className="col-sm-7">
                                    <input
                                      defaultValue={""}
                                      type="text"
                                      name={section + " " + part}
                                      className="form-control"
                                      placeholder={
                                        "Enter " +
                                        inspect.label.split(".")[1] +
                                        " Problem"
                                      }
                                      onChange={(e) => {
                                        let temp = { ...inspection };
                                        temp[section][part].description =
                                          e.target.value;
                                        setInspection(temp);
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>
                    </div>
                    <hr />
                    <div id="inspection_chassis_section">
                      CHASSIS HULL BODY :{" "}
                      {chassisChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {item.label}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={item.value}
                              id={item.id}
                              onChange={handleCheckBox}
                              defaultChecked={item.defaultChecked}
                            />
                          </label>
                        </div>
                      ))}
                      <div>
                        {Object.entries(inspection.chassis).map(
                          ([part, inspect], index) => {
                            let i = 0;
                            let section = "chassis";
                            if (inspect.problem) {
                              return (
                                <div className="row mb-3" key={index}>
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    {inspect.label}
                                  </label>
                                  <div className="col-sm-7">
                                    <input
                                      defaultValue={""}
                                      type="text"
                                      name={section + " " + part}
                                      className="form-control"
                                      placeholder={
                                        "Enter " +
                                        inspect.label.split(".")[1] +
                                        " Problem"
                                      }
                                      onChange={(e) => {
                                        let temp = { ...inspection };
                                        temp[section][part].description =
                                          e.target.value;
                                        setInspection(temp);
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        TOOLS & ACCESSORIES:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="tools_accessories"
                          className="form-control"
                          onChange={handleInspectionInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        MARKS AND ACTION TAKEN BY M.TO/COY COMMANDER/OC/DETT:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="marks_and_actions"
                          className="form-control"
                          onChange={handleInspectionInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        ROAD TEST:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="road_test"
                          className="form-control"
                          onChange={handleInspectionInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        SPECIAL FITTINGS, EQUIPMENTS, ETC.:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="special_fittings"
                          className="form-control"
                          onChange={handleInspectionInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        VEHICLE RECORDS (LOG BOOK, INSPECTION REPORT, ETC)
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="vehicle_records_updated"
                          className="form-control"
                          onChange={handleInspectionInput}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        INSPECTION REMARKS :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="inspection_remarks"
                          className="form-control"
                          onChange={handleInspectionInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ float: "right" }}
                        >
                          Complete Inspection
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-3 card m-1 p-3">
              <Button
                variant="dark"
                onClick={() => {
                  Router.back();
                }}
              >
                BACK
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections");
                }}
              >
                <i class="bi bi-card-checklist"></i> Inspections
              </Button>

              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/");
                }}
              >
                <i class="bi bi-card-list"></i> Defect Memos
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/add");
                }}
              >
                <i class="bi bi-plus-circle"></i> Add Memo
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards");
                }}
              >
                <i class="bi bi-credit-card-2-front"></i> Job Cards
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards/add");
                }}
              >
                <i class="bi bi-plus-circle"></i> Add Job Card
              </Button>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
