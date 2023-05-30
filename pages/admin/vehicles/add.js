import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import "react-datalist-input/dist/styles.css";
import Head from "next/head";
import { Button, Row, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

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
  const vehicle_crp_no_input = useRef(null);
  const checkVehicleNameToast = () =>
    toast.error("Please Enter Vehicle Name", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const checkCRPNoToast = (no) =>
    toast.error("CRP No :" + no + " Already Taken !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const [errors, setErrors] = useState({
    vehicle_crp_no: "",
    vehicle_name: "",
  });
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!vehicle.name) {
      checkVehicleNameToast();
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    setVehicle({
      ...vehicle,
      vehicle_type: "TWOWHEELER",
    });
  }, []);

  function setV({ target: { name, value } }) {
    setVehicle({ ...vehicle, [name]: value });
  }

  async function handleSubmit() {
    const res = await axios({
      url: "http://localhost:3000/vehicles/add",
      withCredentials: true,
      method: "POST",
      data: vehicle,
    });
    if (res.status == 200) {
      router.push("/admin/vehicles/vehicle/" + res.data.vehicle_id);
    }
  }

  function CheckCrpNo() {
    var s = document.getElementsByName("vehicle_crp_no");
    if (s[0].value) {
      CheckCrpNoinDB(s[0].value).then((data) => {
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
    } else {
      setErrors((errors) => {
        return {
          ...errors,
          vehicle_crp_no: "",
        };
      });
    }
  }

  return (
    <>
      <Head title="Add Vehicles" />
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <Row>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h1>Add New Vehicle</h1>

                  <form>
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

                        <p>{errors.vehicle_name}</p>
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
                          ref={vehicle_crp_no_input}
                          type="number"
                          name="vehicle_crp_no"
                          className="form-control"
                        />
                        <p className="mt-2 text-danger">
                          {errors.vehicle_crp_no}
                        </p>
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
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleShow}
                          className="btn btn-primary w-100"
                        >
                          Add Vehicle
                        </button>
                      </div>
                    </div>
                    <Modal show={show} onHide={handleClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Add New Vehicle</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Do You want to Add The Vehicle : <b>{vehicle.name}</b>{" "}
                        <p>
                          <li>This will generate a new Vehicle ID</li>
                          <li>
                            All Details of The vehicle can be Updated in Next
                            Page
                          </li>
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                          Add New Vehicle
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </form>
                  <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1"
              style={{ maxHeight: "20vh" }}
            >
              <Button
                onClick={() => {
                  router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <Link href={"/admin/vehicles"}>
                <Button className="w-100 mb-1 btn-success">List Vehicles</Button>
              </Link>
              <Link href={"/admin/vehicles/available"}>
                <Button className="w-100 mb-1 btn-">Available Vehicles</Button>
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
