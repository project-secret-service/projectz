import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "@/pages/components/Header";
import SideBar from "@/pages/components/Sidebar";
import Scripts from "@/pages/components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "@/pages/components/Head";
import vehicle_styles from "@/styles/Vehicles.module.css";
import { Button, Col, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import Link from "next/link";

async function GetVehicle(id) {
  const res = await axios({
    url: "http://localhost:3000/vehicles/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [vehicle, setVehicle] = useState({});
  const router = useRouter();

  async function updateVehicle(event) {
    event.preventDefault();
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
      registration_no: event.target.registration_no.value,
      vehicle_type: event.target.vehicle_type.value,
      date_of_service: event.target.date_of_service.value,
      chasis_no: event.target.chasis_no.value,
      engine_no: event.target.engine_no.value,
      no_of_cylinders: event.target.no_of_cylinders.value,
      horse_power: event.target.horse_power.value,
      size_of_sparkling_plug: event.target.size_of_sparkling_plug.value,
      front_view: event.target.front_view.files[0],
      back_view: event.target.back_view.files[0],
      top_view: event.target.top_view.files[0],
      right_view: event.target.right_view.files[0],
      left_view: event.target.left_view.files[0],
    };
    const res = await axios({
      url: "http://localhost:3000/vehicles/" + vehicle._id + "/update",
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
    window.location.href="/admin/vehicles/"+vehicle._id;
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetVehicle(id).then((data) => {
      setVehicle(data);
    });
  }, [router.isReady]);
  return (
    <>
      <Head title="Vehicles List" />
      <main className={styles.main}>
        <Header />
        <SideBar />
        <form method="POST" onSubmit={updateVehicle}>
          <main id="main" className="col-lg-11 main mt-0">
            <Row className="col-lg-12">
              <Col lg="4" className="card m-2 p-5 text-center">
                <hr />
                <b>Front</b>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      name="front_view"
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                    />
                  </div>
                </div>

                <hr />
                <b>Back</b>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      name="back_view"
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                    />
                  </div>
                </div>

                <hr />
                <b>Left</b>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      name="left_view"
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                    />
                  </div>
                </div>
                <hr />
                <b>Right</b>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      name="right_view"
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                    />
                  </div>
                </div>
                <hr />
                <b>Top</b>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      name="top_view"
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                    />
                  </div>
                </div>
                <hr />
              </Col>

              <Col lg="7" className="card m-2 p-2">
                <div className="list-group">
                  <Link
                    href={"/admin/vehicles/"+vehicle._id}
                    style={{ textDecoration: "none" }}
                  >
                    <li
                      href="#"
                      className="list-group-item list-group-item-action"
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: "#eef1dd",
                      }}
                    >
                      BACK
                    </li>
                  </Link>

                  <br />

                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Vehicle Name{" "}
                    <input
                      className="form-control form-control-sm"
                      defaultValue={vehicle.name}
                      name="name"
                      type="text"
                      placeholder=".form-control-sm"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    CRP No
                    <input
                      className="form-control form-control-sm"
                      defaultValue={vehicle.vehicle_crp_no}
                      name="vehicle_crp_no"
                      type="text"
                      placeholder=".form-control-sm"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Registration No
                    <input
                      className="form-control form-control-sm"
                      defaultValue={vehicle.registration_no}
                      name="registration_no"
                      type="text"
                      placeholder=".form-control-sm"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Year of Manufacture
                    <input
                      className="form-control form-control-sm"
                      defaultValue={vehicle.year_of_manufacture}
                      name="year_of_manufacture"
                      type="number"
                      placeholder=".form-control-sm"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Date of Supply
                    <input
                      className="form-control form-control-sm"
                      name="date_of_supply"
                      defaultValue={
                        vehicle.date_of_supply &&
                        dateFormat(vehicle.date_of_supply, "yyyy-mm-dd")
                      }
                      type="date"
                      placeholder=".form-control-sm"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Date of Service
                    <input
                      className="form-control form-control-sm"
                      name="date_of_service"
                      defaultValue={
                        vehicle.date_of_service &&
                        dateFormat(vehicle.date_of_service, "yyyy-mm-dd")
                      }
                      type="date"
                      placeholder=".form-control-sm"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Select Vehicle Type
                    <select
                      name="vehicle_type"
                      className="form-select"
                      defaultValue={vehicle.vehicle_type}
                      aria-label="Default select example"
                    >
                      <option value={vehicle.vehicle_type}>
                        {vehicle.vehicle_type}
                      </option>
                      <option value="TWOWHEELER">2 Wheeler</option>
                      <option value="3TONNER">3 Tonner</option>
                      <option value="BUS">Bus</option>
                      <option value="LMV">Car</option>
                      <option value="LMV">Gypsy</option>
                      <option value="HMV">Tractor</option>
                      <option value="HMV">Truck</option>
                    </select>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Cost of Vehicle : <b> &#8377;</b>
                    <input
                      name="cost"
                      className="form-control form-control-sm"
                      defaultValue={vehicle.cost}
                      type="number"
                    ></input>
                  </li>
                </div>
              </Col>
            </Row>

            <Row className="col-lg-11">
              <Col lg="4">
                <div className="card p-4">
                  <h4 className={vehicle_styles.vehicle_name}>BODY DETAILS</h4>
                  <br />
                  Body Type
                  <input
                    name="body_type"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.body_type}
                    type="text"
                  ></input>
                  <br />
                  Front
                  <input
                    name="front"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.front}
                    type="text"
                  ></input>
                  <br />
                  Number of Wheels
                  <input
                    name="no_of_wheels"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.no_of_wheels}
                    type="number"
                  ></input>
                  <br />
                  Number of Cylinders
                  <input
                    name="no_of_cylinders"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.no_of_cylinders}
                    type="number"
                  ></input>
                  <br />
                  Wheel Base
                  <input
                    name="wheel_base"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.wheel_base}
                    type="number"
                  ></input>
                  <br />
                  Tappet Adjustment
                  <input
                    name="tappet"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.tappet}
                    type="number"
                  ></input>
                  <br />
                  Circuit Breaker
                  <input
                    name="circuit_breaker"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.circuit_breaker}
                    type="number"
                  ></input>
                </div>
              </Col>
              <Col lg="4">
                <div className="card p-4">
                  <h4 className={vehicle_styles.vehicle_name}>
                    ENGINE DETAILS
                  </h4>
                  <br />
                  Engine Number
                  <input
                    name="engine_no"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.engine_no}
                    type="text"
                  ></input>
                  <br />
                  Chasis Number
                  <input
                    name="chasis_no"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.chasis_no}
                    type="text"
                  ></input>
                  <br />
                  Firing Order
                  <input
                    name="firing_order"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.firing_order}
                    type="text"
                  ></input>
                  <br />
                  Horse Power
                  <input
                    name="horse_power"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.horse_power}
                    type="number"
                  ></input>
                  <br />
                  Size of Sparkling Plug
                  <input
                    name="size_of_sparkling_plug"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.size_of_sparkling_plug}
                    type="number"
                  ></input>
                </div>
              </Col>
              <Col lg="4">
                <div className="card p-4">
                  <h4 className={vehicle_styles.vehicle_name}>
                    BATTERY DETAILS
                  </h4>
                  <br />
                  Battery No
                  <input
                    name="battery_no"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.battery_no}
                    type="text"
                  ></input>
                  <br />
                  Battery Type
                  <input
                    name="battery_type"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.battery_type}
                    type="text"
                  ></input>
                  <br />
                  Battery Volt
                  <input
                    name="battery_volt"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.battery_volt}
                    type="text"
                  ></input>
                </div>
              </Col>
              <Col lg="4">
                <div className="card p-4">
                  <h4 className={vehicle_styles.vehicle_name}>TYRE DETAILS</h4>
                  <br />
                  Tyre Size
                  <input
                    name="tyre_size"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.tyre_size}
                    type="text"
                  ></input>
                  <br />
                  Front Tire Pressure
                  <input
                    name="front_tyre_pressure"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.front_tyre_pressure}
                    type="text"
                  ></input>
                  <br />
                  Rear Type Pressure
                  <input
                    name="rear_tyre_pressure"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.rear_tyre_pressure}
                    type="text"
                  ></input>
                </div>
              </Col>
            </Row>
            <Row className="col-11">
              <hr />
              <Button type="submit" className="btn-success">
                UPDATE
              </Button>
            </Row>
          </main>
        </form>
      </main>

      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
