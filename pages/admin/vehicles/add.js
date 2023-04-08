import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import "react-datalist-input/dist/styles.css";
import Head from "next/head";
import { Button, Row } from "react-bootstrap";

async function CheckCrpNoinDB(crp_no) {
  var res = await axios({
    url: "http://localhost:3000/vehicles/crp_no",
    withCredentials: true,
    method: "POST",
    data: {
      crp_no: parseInt(crp_no),
    },
  });
  return res.data;
}

export default function Home() {
  const [errors, setErrors] = useState({ vehicle_crp_no: "" });
  const [vehicle, setVehicle] = useState({});

  function setV({ target: { name, value } }) {
    setVehicle({ ...vehicle, [name]: value });
  }

  async function addNewVehicle(e) {
    e.preventDefault();
    setVehicle({
      ...vehicle,
      [e.target.vehicle_type.name]: e.target.vehicle_type.value,
    });

    const res = await axios({
      url: "http://localhost:3000/vehicles/add",
      withCredentials: true,
      method: "POST",
      data: vehicle,
    });
    window.location.href = "/admin/vehicles/";
  }

  function CheckCrpNo() {
    var s = document.getElementsByName("vehicle_crp_no");
    if (s[0].value) {
      CheckCrpNoinDB(s[0].value).then((data) => {
        console.log(data);
        if (data === "F") {
          setErrors((errors) => {
            return {
              ...errors,
              vehicle_crp_no: "CRP NO. ALREADY EXISTS",
            };
          });
          return true;
        } else {
          setErrors((errors) => {
            return {
              ...errors,
              vehicle_crp_no: "",
            };
          });
          return false;
        }
      });
    }
  }

  return (
    <>
      <Head title="Add Vehicles" />
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0">
          <Row>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h1>Add New Vehicle</h1>

                  <form onSubmit={addNewVehicle}>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Name :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="name"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Vehicle CRP No :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => {
                            setV(e);
                            CheckCrpNo(this);
                          }}
                          type="number"
                          name="vehicle_crp_no"
                          className="form-control"
                          // onChange={() => }
                        />
                        <p>{errors.vehicle_crp_no} </p>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Select Vehicle Type :
                      </label>
                      <div className="col-sm-7">
                        <select
                          onChange={(e) => {
                            setV(e);
                          }}
                          name="vehicle_type"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="TWOWHEELER">2 Wheeler</option>
                          <option value="3TONNER">3 Tonner</option>
                          <option value="BUS">Bus</option>
                          <option value="LMV">Car</option>
                          <option value="LMV">Gypsy</option>
                          <option value="HMV">Tractor</option>
                          <option value="HMV">Truck</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Vehicle Registration No:
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
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
                        Cost of Vehicle :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="cost"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        No of Wheels :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="no_of_wheels"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Year of Manufacture :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="year_of_manufacture"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date Recieved into Service :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="date"
                          name="date_of_service"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Chasis Number :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="chasis_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Engine Number:
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="engine_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Number of Cylinders :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="no_of_cylinders"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Horse Power :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="horse_power"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Size of Sparkling Plugs :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="size_of_sparkling_plug"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Tappet Adjustments :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="tappet"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Circuit Breaker Point Adjustment :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="circuit_breaker"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Firing Order :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="firing_order"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Wheel Base :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="wheel_base"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Type of Body :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="string"
                          name="body_type"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Front :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="front"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Size of Tyre :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="tyre_size"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Tyre Pressure Front Wheels :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="front_tyre_pressure"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Tyre Pressure Rear Wheels :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="rear_tyre_pressure"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Battery No :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="battery_no"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Battery Type :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="battery_type"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Battery Voltage :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="text"
                          name="battery_volt"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of Supply :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="date"
                          name="date_of_supply"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Engine Number after First Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="engine_first_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Distance travelled before First Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="distance_before_first_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of First Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="date"
                          name="date_of_first_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Engine Number after Second Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="engine_second_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Distance travelled before Second Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="number"
                          name="distance_before_second_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of Second Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={(e) => setV(e)}
                          type="date"
                          name="date_of_second_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100">
                          Add Vehicle
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
              <Link href={"/admin/vehicles"}>
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
