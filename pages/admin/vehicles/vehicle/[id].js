import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../../components/Header";
import SideBar from "../../../components/Sidebar";
import Scripts from "../../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "@/pages/components/Head";
import vehicle_styles from "@/styles/Vehicles.module.css";
import { Button, Col, Row, Carousel } from "react-bootstrap";
import dateFormat from "dateformat";
import indianNumberFormat from "indian-number-format";
import Link from "next/link";

async function GetVehicle(id) {
  const res = await axios({
    url: "http://localhost:3000/vehicles/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

function setFuel(fuel, fuelCapacity) {
  if (fuel <= fuelCapacity) {
    let fuelPercentage = ((fuel / fuelCapacity) * 100).toFixed(2);
    const fuelPercent = document.getElementById("fuel_percentage");
    fuelPercent.innerText = fuelPercentage + "%";
    const fuelDetails = document.getElementById("fuel_details");
    fuelDetails.innerText = fuel + "L/" + fuelCapacity + "L";
    document.querySelectorAll(".fuel-box")[0].children[1].style.height =
      100 - fuelPercentage + "%";
    document.querySelectorAll(".fuel-box")[0].children[2].style.height =
      fuelPercentage + "%";
    if (fuelPercentage <= 20) {
      document.querySelectorAll(
        ".fuel-box"
      )[0].children[2].style.backgroundColor = "red";
    } else {
      document.querySelectorAll(
        ".fuel-box"
      )[0].children[2].style.backgroundColor = "#80ff00";
    }
  }
}

function setKms(km) {
  const odometerDigits = document.querySelectorAll(".odometer-digit");
  const odometerValue = document.querySelector(".odometer-value");
  let totalDistance = km;
  const digits = totalDistance.toString().padStart(7, "0").split("");
  odometerDigits.forEach((digit, index) => {
    digit.innerText = digits[index];
  });
}
export default function Home() {
  const [vehicle, setVehicle] = useState({});
  const [fuelInput, setfuelInput] = useState(false);
  const [fuelLimitError, setFuelLimitError] = useState(false);
  const [kmLimitError, setKmLimitError] = useState(false);
  const [kmRun, setKmRun] = useState(false);

  const router = useRouter();

  function handleFuelChange({ target: { name, value } }) {
    if (parseFloat(value) > vehicle.fuel_capacity) {
      setFuelLimitError(true);
    } else {
      setFuelLimitError(false);
    }
  }

  function handleKmChange({ target: { name, value } }) {
    if (parseFloat(value) < vehicle.total_kilo_meter) {
      setKmLimitError(true);
    } else {
      setKmLimitError(false);
    }
  }

  function showFuelLog() {
    router.push("/admin/vehicles/vehicle/" + vehicle._id + "/fuel_log");
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetVehicle(id).then((data) => {
      setVehicle(data);
      setKms(data.total_kilo_meter);
      setFuel(data.fuel, data.fuel_capacity);
    });
  }, [router.isReady]);

  async function updateKmRun() {
    let newKM = document.getElementById("km_run").value;
    if (newKM > vehicle.total_kilo_meter) {
      const res = await axios({
        url: "http://localhost:3000/vehicles/" + vehicle._id + "/update_km_run",
        method: "POST",
        withCredentials: true,
        data: {
          km: newKM,
        },
      });
      setKms(newKM);
      setKmRun(false);
    }
  }

  async function updateFuel() {
    let newFuel = document.getElementById("new_fuel").value;
    const res = await axios({
      url: "http://localhost:3000/vehicles/" + vehicle._id + "/fuel_update",
      method: "POST",
      withCredentials: true,
      data: {
        fuel: newFuel,
      },
    });
    setFuel(parseFloat(newFuel), vehicle.fuel_capacity);
    setfuelInput(false);
  }
  return (
    <>
      <Head title="Vehicles List" />
      <main className={styles.main}>
        <Header />
        <SideBar />
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <Row>
            <Col lg="4" className="card m-2 p-5 text-center">
              <div style={{ height: "80%", alignItems: "center" }}>
                <Carousel slide={false}>
                  {vehicle.front_view && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:3000/images/vehicle_images/" +
                          vehicle.front_view
                        }
                        alt="First slide"
                        style={{maxHeight:"50vh"}}
                      />
                      <Carousel.Caption>
                        <h3>Front</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )}
                  {vehicle.back_view && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:3000/images/vehicle_images/" +
                          vehicle.back_view
                        }
                        alt="First slide"
                        style={{maxHeight:"50vh"}}
                      />
                      <Carousel.Caption>
                        <h3>Back</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )}
                  {vehicle.top_view && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:3000/images/vehicle_images/" +
                          vehicle.top_view
                        }
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>Top</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )}
                  {vehicle.left_view && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:3000/images/vehicle_images/" +
                          vehicle.left_view
                        }
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>Left</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )}
                  {vehicle.right_view && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={
                          "http://localhost:3000/images/vehicle_images/" +
                          vehicle.right_view
                        }
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>Right</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )}
                </Carousel>
              </div>
              <div>
                <h4 className={vehicle_styles.vehicle_name}>{vehicle.name}</h4>
                <h4 className={vehicle_styles.vehicle_name}>
                  CRP : ({vehicle.vehicle_crp_no})
                </h4>
                REG No: {vehicle.registration_no}
              </div>
            </Col>
            <Col lg="7" className="card m-2 p-2">
              <div className="list-group">
                <Link
                  href={"/admin/vehicles"}
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
                <li href="#" className="list-group-item list-group-item-action">
                  <img
                    src="/assets/img/vehicle/icons/year.png"
                    style={{ width: "2rem" }}
                  ></img>{" "}
                  Year of Manufacture : <b>{vehicle.year_of_manufacture}</b>
                </li>
                <li href="#" className="list-group-item list-group-item-action">
                  <img
                    src="/assets/img/vehicle/icons/dos.png"
                    style={{ width: "2rem" }}
                  ></img>{" "}
                  Date of Supply :{" "}
                  <b>
                    {vehicle.date_of_supply &&
                      dateFormat(
                        vehicle.date_of_supply,
                        "dS mmmm, yyyy - dddd"
                      )}
                  </b>
                </li>
                <li href="#" className="list-group-item list-group-item-action">
                  <img
                    src="/assets/img/vehicle/icons/calender.png"
                    style={{ width: "2rem" }}
                  ></img>{" "}
                  Date of Service :{" "}
                  <b>
                    {dateFormat(
                      vehicle.date_of_service,
                      "dS mmmm, yyyy - dddd"
                    )}
                  </b>
                </li>
                <li href="#" className="list-group-item list-group-item-action">
                  <img
                    src="/assets/img/vehicle/icons/vehicles.png"
                    style={{ width: "2rem" }}
                  ></img>{" "}
                  Vehicle Type : <b>{vehicle.vehicle_type}</b>
                </li>
                <li href="#" className="list-group-item list-group-item-action">
                  <img
                    src="/assets/img/vehicle/icons/rupee.png"
                    style={{ width: "2rem" }}
                  ></img>{" "}
                  Cost of Vehicle :{" "}
                  <b>
                    {vehicle.cost && (
                      <>&#8377; {indianNumberFormat.format(vehicle.cost)} </>
                    )}
                  </b>
                </li>
              </div>

              <div className="p-2">
                <Row>
                  <div
                    className={`${vehicle_styles.odometer} p-2 text-center col-9 m-1`}
                    onClick={() => {
                      router.push(
                        "/admin/vehicles/vehicle/" + vehicle._id + "/km_run"
                      );
                    }}
                  >
                    <h4 className={`${vehicle_styles.odometer_heading} mb-4`}>
                      Total Distance Traveled
                    </h4>
                    <div
                      className={`${vehicle_styles.odometer_value} odometer-value`}
                    >
                      <span
                        className={`${vehicle_styles.odometer_digit} odometer-digit`}
                      >
                        0
                      </span>
                      <span
                        className={`${vehicle_styles.odometer_digit} odometer-digit`}
                      >
                        0
                      </span>
                      <span
                        className={`${vehicle_styles.odometer_digit} odometer-digit`}
                      >
                        0
                      </span>
                      <span
                        className={`${vehicle_styles.odometer_digit} odometer-digit`}
                      >
                        0
                      </span>
                      <span
                        className={`${vehicle_styles.odometer_digit} odometer-digit`}
                      >
                        0
                      </span>
                      <span
                        className={`${vehicle_styles.odometer_digit} odometer-digit`}
                      >
                        0
                      </span>
                      <span
                        className={`${vehicle_styles.odometer_digit} odometer-digit`}
                      >
                        0
                      </span>
                    </div>
                    <div className={vehicle_styles.odometer_label}>
                      <span className={vehicle_styles.odometer_text}>
                        Kilometeres
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${vehicle_styles.fuel_box} col-2 p-2 m-1 fuel-box text-center`}
                    onClick={showFuelLog}
                  >
                    <div className={vehicle_styles.fuel_text}>
                      Fuel
                      <p id="fuel_percentage">50%</p>
                      <p id="fuel_details"></p>
                    </div>
                    <div className={vehicle_styles.fuel_empty}> </div>
                    <div className={vehicle_styles.fuel_percent}> </div>
                  </div>
                </Row>
              </div>

              <div className="m-3">
                <Link
                  href={"/admin/vehicles/vehicle/" + vehicle._id + "/update"}
                >
                  <Button className="btn-primary m-1">UPDATE VEHICLE</Button>
                </Link>
                <Link
                  href={"/admin/vehicles/vehicle/" + vehicle._id + "/delete"}
                >
                  <Button className="btn-danger m-1">DELETE VEHICLE</Button>
                </Link>
              </div>
            </Col>
          </Row>

          <Row className="col-lg-11">
            <Col lg="4">
              <div className="card p-4">
                <div className="d-flex" style={{ alignItems: "center" }}>
                  <img
                    src="/assets/img/vehicle/icons/body-repair.png"
                    alt="Chassis"
                    style={{
                      height: "3rem",
                      width: "3rem",
                      marginRight: "1rem",
                    }}
                  />

                  <h3
                    className={`${vehicle_styles.vehicle_name}`}
                    style={{ margin: 0 }}
                  >
                    BODY DETAILS
                  </h3>
                </div>
                <hr />
                <Row>
                  <Col lg="6">Body Front</Col>
                  <Col>
                    : <b>{vehicle.front}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="6"> Body Type </Col>
                  <Col>
                    : <b>{vehicle.body_type}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="6"> Number of Wheels</Col>
                  <Col>
                    : <b>{vehicle.no_of_wheels}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="6"> Number of Cylinders</Col>
                  <Col>
                    : <b>{vehicle.no_of_cylinders}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="6"> Wheel Base</Col>
                  <Col>
                    : <b>{vehicle.wheel_base}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="6"> Tappet Adjustment</Col>
                  <Col>
                    : <b>{vehicle.tappet}</b>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg="4">
              <div className="card p-4">
                <div className="d-flex" style={{ alignItems: "center" }}>
                  <img
                    src="/assets/img/vehicle/icons/car-engine.png"
                    alt="Chassis"
                    style={{
                      height: "3rem",
                      width: "3rem",
                      marginRight: "1rem",
                    }}
                  />

                  <h3
                    className={`${vehicle_styles.vehicle_name}`}
                    style={{ margin: 0 }}
                  >
                    ENGINE DETAILS
                  </h3>
                </div>
                <hr />
                <Row>
                  <Col lg="5"> Engine Number</Col>
                  <Col>
                    :<b> {vehicle.engine_no}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Chasis Number</Col>
                  <Col>
                    :<b> {vehicle.chasis_no}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Firing Order</Col>
                  <Col>
                    :<b> {vehicle.firing_order}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Horse Power</Col>
                  <Col>
                    :<b> {vehicle.horse_power} cc</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Size of Sparkling Plug</Col>
                  <Col>
                    :<b> {vehicle.size_of_sparkling_plug}</b>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg="4">
              <div className="card p-4">
                <div className="d-flex" style={{ alignItems: "center" }}>
                  <img
                    src="/assets/img/vehicle/icons/accumulator.png"
                    alt="Chassis"
                    style={{
                      height: "3rem",
                      width: "3rem",
                      marginRight: "1rem",
                    }}
                  />

                  <h3
                    className={`${vehicle_styles.vehicle_name}`}
                    style={{ margin: 0 }}
                  >
                    BATTERY DETAILS
                  </h3>
                </div>
                <hr />
                <Row>
                  <Col lg="5"> Battery No: </Col>
                  <Col>
                    : <b>{vehicle.battery_no}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Battery Type:</Col>
                  <Col>
                    : <b>{vehicle.battery_type}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Battery Volt: </Col>
                  <Col>
                    : <b>{vehicle.battery_volt}</b>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row className="col-11">
            <Col>
              <div className="card p-4">
                <h4 className={vehicle_styles.vehicle_name}>FIRST OVERHAUL</h4>

                <hr />
                <Row>
                  <Col lg="5"> Date of First Overhaul </Col>
                  <Col>
                    :{" "}
                    <b>
                      {vehicle.date_of_first_overhaul &&
                        dateFormat(
                          vehicle.date_of_first_overhaul,
                          "dS mmmm, yyyy - dddd"
                        )}
                    </b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Distance travelled before First Overhaul </Col>
                  <Col>
                    : <b>{vehicle.distance_before_first_overhaul}</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Engine Number after First Overhaul </Col>
                  <Col>
                    : <b>{vehicle.engine_first_overhaul}</b>
                  </Col>
                </Row>
                <button className="btn btn-primary mt-3">UPDATE</button>
              </div>
            </Col>
            <Col>
              <div className="card p-4">
                <h4 className={vehicle_styles.vehicle_name}>SECOND OVERHAUL</h4>
                <hr />
                <Row>
                  <Col lg="5"> Date of Second Overhaul</Col>
                  <Col>
                    <b>
                      :{" "}
                      {vehicle.date_of_second_overhaul &&
                        dateFormat(
                          vehicle.date_of_second_overhaul,
                          "dS mmmm, yyyy - dddd"
                        )}{" "}
                    </b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Distance travelled before Second Overhaul</Col>
                  <Col>
                    :<b> {vehicle.distance_before_second_overhaul}</b>{" "}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="5"> Engine Number after Second Overhaul</Col>
                  <Col>
                    :<b> {vehicle.engine_second_overhaul}</b>{" "}
                  </Col>
                  <button className="btn btn-primary mt-3">UPDATE</button>
                </Row>
              </div>
            </Col>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
