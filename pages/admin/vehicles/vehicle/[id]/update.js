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
import { Button, Col, Row, Modal } from "react-bootstrap";
import dateFormat from "dateformat";
import Link from "next/link";

async function GetVehicle(id) {
  const res = await axios({
    url: "https://projectx-production.up.railway.app/vehicles/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [vehicle, setVehicle] = useState({});
  const [updatedVehicle, setUpdatedVehicle] = useState({});
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setP = (event) => {
    const selectedFile = event.target.files[0];
    const name = event.target.name;
    setUpdatedVehicle({ ...updatedVehicle, [name]: selectedFile });
  };

  function setV({ target: { name, value } }) {
    setUpdatedVehicle({ ...updatedVehicle, [name]: value });
  }

  async function updateVehicle() {
    const res = await axios({
      url: "https://projectx-production.up.railway.app/vehicles/" + vehicle._id + "/update",
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: updatedVehicle,
    });
    router.push("/admin/vehicles/vehicle/" + vehicle._id);
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
        <form method="POST">
          <main id="main" className="col-lg-11 main mt-0">
            <Row className="col-lg-12">
              <Col lg="4" className="card m-2 p-5 text-center">
                <hr />
                <b>Front</b>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      onChange={(e) => {
                        setP(e);
                      }}
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
                      onChange={(e) => {
                        setP(e);
                      }}
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
                      onChange={(e) => {
                        setP(e);
                      }}
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
                      onChange={(e) => {
                        setP(e);
                      }}
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
                      onChange={(e) => {
                        setP(e);
                      }}
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
                    href={"/admin/vehicles/vehicle/" + vehicle._id}
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
                    Vehicle Name
                    <input
                      onChange={(e) => {
                        setV(e);
                      }}
                      className="form-control form-control-sm"
                      defaultValue={vehicle.name}
                      name="name"
                      type="text"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    CRP No
                    <input
                      onChange={(e) => {
                        setV(e);
                      }}
                      className="form-control form-control-sm"
                      defaultValue={vehicle.vehicle_crp_no}
                      name="vehicle_crp_no"
                      type="text"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Registration No
                    <input
                      onChange={(e) => {
                        setV(e);
                      }}
                      className="form-control form-control-sm"
                      defaultValue={vehicle.registration_no}
                      name="registration_no"
                      type="text"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Year of Manufacture
                    <input
                      onChange={(e) => {
                        setV(e);
                      }}
                      className="form-control form-control-sm"
                      defaultValue={vehicle.year_of_manufacture}
                      name="year_of_manufacture"
                      type="number"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Date of Supply
                    <input
                      onChange={(e) => {
                        setV(e);
                      }}
                      className="form-control form-control-sm"
                      name="date_of_supply"
                      defaultValue={
                        vehicle.date_of_supply &&
                        dateFormat(vehicle.date_of_supply, "yyyy-mm-dd")
                      }
                      type="date"
                    ></input>
                  </li>
                  <li
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Date of Service
                    <input
                      onChange={(e) => {
                        setV(e);
                      }}
                      className="form-control form-control-sm"
                      name="date_of_service"
                      defaultValue={
                        vehicle.date_of_service &&
                        dateFormat(vehicle.date_of_service, "yyyy-mm-dd")
                      }
                      type="date"
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
                      onChange={(e) => {
                        setV(e);
                      }}
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
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="body_type"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.body_type}
                    type="text"
                  ></input>
                  <br />
                  Front
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="front"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.front}
                    type="text"
                  ></input>
                  <br />
                  Number of Wheels
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="no_of_wheels"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.no_of_wheels}
                    type="number"
                  ></input>
                  <br />
                  Number of Cylinders
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="no_of_cylinders"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.no_of_cylinders}
                    type="number"
                  ></input>
                  <br />
                  Wheel Base
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="wheel_base"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.wheel_base}
                    type="number"
                  ></input>
                  <br />
                  Tappet Adjustment
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="tappet"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.tappet}
                    type="number"
                  ></input>
                  <br />
                  Circuit Breaker
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
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
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="engine_no"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.engine_no}
                    type="text"
                  ></input>
                  <br />
                  Chasis Number
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="chasis_no"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.chasis_no}
                    type="text"
                  ></input>
                  <br />
                  Firing Order
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="firing_order"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.firing_order}
                    type="text"
                  ></input>
                  <br />
                  Horse Power
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="horse_power"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.horse_power}
                    type="number"
                  ></input>
                  <br />
                  Size of Sparkling Plug
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="size_of_sparkling_plug"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.size_of_sparkling_plug}
                    type="number"
                  ></input>
                  <br />
                  Fuel Capacity (L)
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="fuel_capacity"
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
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="battery_no"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.battery_no}
                    type="text"
                  ></input>
                  <br />
                  Battery Type
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="battery_type"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.battery_type}
                    type="text"
                  ></input>
                  <br />
                  Battery Volt
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
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
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="tyre_size"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.tyre_size}
                    type="text"
                  ></input>
                  <br />
                  Front Tire Pressure
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
                    name="front_tyre_pressure"
                    className="form-control form-control-sm"
                    defaultValue={vehicle.front_tyre_pressure}
                    type="text"
                  ></input>
                  <br />
                  Rear Type Pressure
                  <input
                    onChange={(e) => {
                      setV(e);
                    }}
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
              <Button type="button" className="btn-success" onClick={setShow}>
                UPDATE
              </Button>
            </Row>
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Update Vehicle : {vehicle.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Do You want to Update the Vehicle with Following Details ?
                <p>
                  {/* <li>This will generate a new Vehicle ID</li> */}
                  {Object.entries(updatedVehicle).map
                  (([key,value])=>(<li>{key}: {value}</li>))}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={updateVehicle}>
                  Add New Vehicle
                </Button>
              </Modal.Footer>
            </Modal>
          </main>
        </form>
      </main>

      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
