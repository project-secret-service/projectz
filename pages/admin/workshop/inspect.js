import { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import Router from "next/router";
import { GetVehicles } from "@/functions/apiHandlers/vehicles";
import AdminLayout from "@/components/admin/AdminLayout";

function NewChild() {
  return (
    <div className="row mb-3">
      <label htmlFor="inputText" className="col-sm-5 col-form-label">
        Maintaining Unit
      </label>
      <div className="col-sm-7">
        <input type="text" name="maintaining_unit" className="form-control" />
      </div>
    </div>
  );
}

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
        <main id="main" className="col-lg-10 main mt-0 opac-80">
          <h1>Inspect Vehicle</h1>

          <Row>
            <div className="col-lg-8 card p-3 m-1">
              <div>
                <div className="card-body">
                  <form>
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
                          name="registration_no"
                          className="form-control"
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
                          // onChange={setVehicle}
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
                      <div
                        className="form-check"
                        style={{
                          display: "inline-block",
                          marginRight: "3rem",
                          marginLeft: "3rem",
                        }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked1"
                          style={{ display: "inline" }}
                        >
                          1. Compression
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="compression"
                            id="flexCheckChecked1"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked2"
                          style={{ display: "inline" }}
                        >
                          2. Cooling System
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="cooling_system"
                            id="flexCheckChecked2"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked3"
                          style={{ display: "inline" }}
                        >
                          3. Fuel System
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="fuel_system"
                            id="flexCheckChecked3"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked4"
                          style={{ display: "inline" }}
                        >
                          4. Ignition System
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="ignition_system"
                            id="flexCheckChecked4"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked5"
                          style={{ display: "inline" }}
                        >
                          5. Lubrication System
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="lubrication_system"
                            id="flexCheckChecked5"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked6"
                          style={{ display: "inline" }}
                        >
                          6. Controls
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="controls"
                            id="flexCheckChecked6"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked7"
                          style={{ display: "inline" }}
                        >
                          7. Clutch System
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="clutch_system"
                            id="flexCheckChecked7"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked8"
                          style={{ display: "inline" }}
                        >
                          8. Exhaust System &amp; Induction System
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="exhaust_system_induction_system"
                            id="flexCheckChecked8"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      {/* {Object.entries(inspection.engine).map(
                        ([part, inspect],index) => {
                          let i = 0;
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
                                    type="text"
                                    name="maintaining_unit"
                                    className="form-control"
                                    placeholder={
                                      "Enter " +
                                      inspect.label.split(".")[1] +
                                      " Problem"
                                    }
                                  />
                                </div>
                              </div>
                            );
                          }
                        }
                      )} */}
                      {Object.entries(inspection.engine).map(
                        ([part, inspect], index) => {
                          let i = 0;
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
                                    type="text"
                                    name="maintaining_unit"
                                    className="form-control"
                                    placeholder={
                                      "Enter " +
                                      inspect.label.split(".")[1] +
                                      " Problem"
                                    }
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
                      <div
                        className="form-check"
                        style={{
                          display: "inline-block",
                          marginRight: "3rem",
                          marginLeft: "3rem",
                        }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked9"
                          style={{ display: "inline" }}
                        >
                          9. Main Gear Box & Controls
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="main_gear_box_controls"
                            id="flexCheckChecked9"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked10"
                          style={{ display: "inline" }}
                        >
                          10. Auxillary Gear Box / Controlled Differential &
                          Controls
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="auxillary_gear_box_controls"
                            id="flexCheckChecked10"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked11"
                          style={{ display: "inline" }}
                        >
                          11. Shaft-U-Joint
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="shaft_u_joint"
                            id="flexCheckChecked11"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked12"
                          style={{ display: "inline" }}
                        >
                          12. Rear Axle(s)
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="rear_axle"
                            id="flexCheckChecked12"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked13"
                          style={{ display: "inline" }}
                        >
                          13. Front Axle
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="front_axle"
                            id="flexCheckChecked13"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked14"
                          style={{ display: "inline" }}
                        >
                          14. Tracta - Type joint and/or Bevel Boxes
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="tracta_type_joint_bevel_boxes"
                            id="flexCheckChecked14"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked15"
                          style={{ display: "inline" }}
                        >
                          15. Spindles & Bearings (M/Cycle)
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="spindles_bearings"
                            id="flexCheckChecked15"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked16"
                          style={{ display: "inline" }}
                        >
                          16. Wheels and tyres
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="wheels_tyres"
                            id="flexCheckChecked16"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked17"
                          style={{ display: "inline" }}
                        >
                          17. Tracks
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="tracks"
                            id="flexCheckChecked17"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked18"
                          style={{ display: "inline" }}
                        >
                          18. Brake Service & Parking
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="brake_service_parking"
                            id="flexCheckChecked18"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked19"
                          style={{ display: "inline" }}
                        >
                          19. Reduction Gear
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="reduction_gear"
                            id="flexCheckChecked19"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked20"
                          style={{ display: "inline" }}
                        >
                          20. Spring/Suspension
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="spring_suspension"
                            id="flexCheckChecked20"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked21"
                          style={{ display: "inline" }}
                        >
                          21. Bogies and Idler
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="bogies_idler"
                            id="flexCheckChecked21"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked22"
                          style={{ display: "inline" }}
                        >
                          22. Steering Gears and Controls
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="steering_gears_controls"
                            id="flexCheckChecked22"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked23"
                          style={{ display: "inline" }}
                        >
                          23. Speedometer-Recounter and Drive
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="speedometer_recounter_drive"
                            id="flexCheckChecked23"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      {Object.entries(inspection.transmission).map(
                        ([part, inspect], index) => {
                          let i = 0;
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
                                    name="maintaining_unit"
                                    className="form-control"
                                    placeholder={
                                      "Enter " +
                                      inspect.label.split(".")[1] +
                                      " Problem"
                                    }
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
                    <div id="inspection_electrical_section">
                      ELECTRICAL:{" "}
                      <div
                        className="form-check"
                        style={{
                          display: "inline-block",
                          marginRight: "3rem",
                          marginLeft: "3rem",
                        }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked24"
                          style={{ display: "inline" }}
                        >
                          24. Accumulator(s)
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="accumulator"
                            id="flexCheckChecked24"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked25"
                          style={{ display: "inline" }}
                        >
                          25. Dynamo
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="dynamo"
                            id="flexCheckChecked25"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked26"
                          style={{ display: "inline" }}
                        >
                          26. Voltage Controller(s)
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="voltage_controller"
                            id="flexCheckChecked26"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked27"
                          style={{ display: "inline" }}
                        >
                          27. Starter and Switch Solenoid
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="starter_switch_solenoid"
                            id="flexCheckChecked27"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked28"
                          style={{ display: "inline" }}
                        >
                          28. Wiring
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="wiring"
                            id="flexCheckChecked28"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked29"
                          style={{ display: "inline" }}
                        >
                          29. Switch Board, Lamps, Horn, Siren and Fuse, Clock,
                          Thermometer, Fuel Gauges, etc.
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="switch_board_lamps_horn_siren"
                            id="flexCheckChecked29"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked30"
                          style={{ display: "inline" }}
                        >
                          30. Aux. Generator & Controls or WT Dynamo
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="aux_generator_controls"
                            id="flexCheckChecked30"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked31"
                          style={{ display: "inline" }}
                        >
                          31. Power Travers Motor, etc.
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="power_travers_motor"
                            id="flexCheckChecked31"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div id="inspection_lubrication_section">
                      LUBRICATION & CLEANLINESS-
                      <div
                        className="form-check"
                        style={{
                          display: "inline-block",
                          marginRight: "3rem",
                          marginLeft: "3rem",
                        }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked32"
                          style={{ display: "inline" }}
                        >
                          32. Engine
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="engine"
                            id="flexCheckChecked32"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked33"
                          style={{ display: "inline" }}
                        >
                          33. Gear Box
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="gear_box"
                            id="flexCheckChecked33"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked34"
                          style={{ display: "inline" }}
                        >
                          34. Axles
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="axles"
                            id="flexCheckChecked34"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked35"
                          style={{ display: "inline" }}
                        >
                          35. General
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="general"
                            id="flexCheckChecked35"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div id="inspection_chassis_section">
                      CHASSIS HULL BODY :{" "}
                      <div
                        className="form-check"
                        style={{
                          display: "inline-block",
                          marginRight: "3rem",
                          marginLeft: "3rem",
                        }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked36"
                          style={{ display: "inline" }}
                        >
                          36. Chassis
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="chassis"
                            id="flexCheckChecked36"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked37"
                          style={{ display: "inline" }}
                        >
                          37. Twin Shackles Hooks
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="twin_shackles_hooks"
                            id="flexCheckChecked37"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked38"
                          style={{ display: "inline" }}
                        >
                          38. Frame and Rear Forks
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="frame_rear_forks"
                            id="flexCheckChecked38"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked39"
                          style={{ display: "inline" }}
                        >
                          39. Body Forks
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="body_forks"
                            id="flexCheckChecked39"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked40"
                          style={{ display: "inline" }}
                        >
                          40. Canopy & Superstructure
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="canopy_superstructure"
                            id="flexCheckChecked40"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked41"
                          style={{ display: "inline" }}
                        >
                          41. Hull
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="hull"
                            id="flexCheckChecked41"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked42"
                          style={{ display: "inline" }}
                        >
                          42. Tool Boxes
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="tool_boxes"
                            id="flexCheckChecked42"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked43"
                          style={{ display: "inline" }}
                        >
                          43. Petrol Oil, Water Cans & Carrier
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="petrol_oil_water_cans"
                            id="flexCheckChecked43"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ display: "inline-block", marginRight: "3rem" }}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked44"
                          style={{ display: "inline" }}
                        >
                          44. Extinguishers
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="extinguishers"
                            id="flexCheckChecked44"
                            onChange={handleCheckBox}
                            defaultChecked
                          />
                        </label>
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
                          name="marks_actions"
                          className="form-control"
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
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        RE VEHICLE RECORDS (LOG BOOK, INSPECTION REPORT ETC) UP
                        TO DATE AND SATISFACTORILY MAINTAINED:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="vehicle_records_updated"
                          className="form-control"
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
                      <div className="col-sm-3">
                        <input
                          type="text"
                          name="remarks"
                          className="form-control"
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
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}