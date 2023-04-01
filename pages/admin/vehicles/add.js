import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import "react-datalist-input/dist/styles.css";
import Head from "next/head";
import { Button, Row, Col } from "react-bootstrap";

async function GetVehicles() {
  const res = await axios({
    url: "http://localhost:3000/vehicles/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function addNewVehicle(event) {
  event.preventDefault();
  console.log(event.target.vehicle);
  var data = {
    vehicle_crp_no: event.target.vehicle_crp_no.value,
    name: event.target.name.value,
    year_of_manufacture: event.target.year_of_manufacture.value,
    no_of_wheels: event.target.no_of_wheels.value,
    cost: event.target.cost.value,
    date_of_supply: event.target.date_of_supply.value,
    tappet: event.target.tappet.value,
    circuit_breaker: event.target.circuit_breaker.value,
    firing_order: event.target.firing_order.value,
    wheel_base: event.target.wheel_base.value,
    body_type: event.target.body_type.value,
    front: event.target.front.value,
    tyre_size: event.target.tyre_size.value,
    front_tyre_pressure: event.target.front_tyre_pressure.value,
    rear_tyre_pressure: event.target.rear_tyre_pressure.value,
    battery_type: event.target.battery_type.value,
    battery_volt: event.target.battery_volt.value,
    battery_no: event.target.battery_no.value,
    engine_first_overhaul: event.target.engine_first_overhaul.value,
    distance_before_first_overhaul:
      event.target.distance_before_first_overhaul.value,
    date_of_first_overhaul: event.target.date_of_first_overhaul.value,
    engine_second_overhaul: event.target.engine_second_overhaul.value,
    distance_before_second_overhaul:
      event.target.distance_before_second_overhaul.value,
    date_of_second_overhaul: event.target.date_of_second_overhaul.value,
    registration_no: event.target.registration_no.value,
    vehicle_type: event.target.vehicle_type.value,
    date_of_service: event.target.date_of_service.value,
    chasis_no: event.target.chasis_no.value,
    engine_no: event.target.engine_no.value,
    no_of_cylinders: event.target.no_of_cylinders.value,
    horse_power: event.target.horse_power.value,
    size_of_sparkling_plug: event.target.size_of_sparkling_plug.value,
  };

  const res = await axios({
    url: "http://localhost:3000/vehicles/add",
    withCredentials: true,
    method: "POST",
    data: data,
  });
  console.log(res.data);
}

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
  const [vehicles, setVehicles] = useState([]);
  const [errors, setErrors] = useState({ vehicle_crp_no: "" });
  useEffect(() => {
    GetVehicles().then((data) => {
      setVehicles(data);
    });
  }, []);

  function OpenLink(link) {
    console.log(link);
    Router.push("/admin/vehicles/" + link);
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
        } else {
          setErrors((errors) => {
            return {
              ...errors,
              vehicle_crp_no: "",
            };
          });
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
                          type="number"
                          name="vehicle_crp_no"
                          className="form-control"
                          onChange={() => CheckCrpNo(this)}
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
                          type="date"
                          name="date_of_second_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                        >
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
