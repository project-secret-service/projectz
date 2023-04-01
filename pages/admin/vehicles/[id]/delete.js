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
import Router from "next/router";

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

  async function deleteVehicle() {
    const res = await axios({
      url: "http://localhost:3000/vehicles/" + vehicle._id + "/delete",
      method: "POST",
      withCredentials: true,
    });
    console.log(res.data);
    Router.push('/admin/vehicles/');
    return res.data;
  }

  function openLink() {
    Router.push("/admin/vehicles/" + vehicle._id);
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
        <main id="main" className="col-lg-11 main mt-0">
          <Row>
            <Col lg="4" className="card m-2 p-5 text-center">
              <img
                src="/assets/img/car-icon-png-4258.png"
                width="80%"
                className="m-auto"
              />
              <div>
                <h4 className={vehicle_styles.vehicle_name}>{vehicle.name}</h4>
                <h4 className={vehicle_styles.vehicle_name}>
                  CRP : ({vehicle.vehicle_crp_no})
                </h4>
                REG No: {vehicle.registration_no}
              </div>
            </Col>
            <Col lg="6" className="card m-2 p-5 text-center">
              <span style={{ color: "red" }}>
                Are You Sure You Want To Delete
              </span>{" "}
              <br></br>
              <b>VEHICLE : {vehicle.name}</b>
              <b>CRP NO : {vehicle.vehicle_crp_no}</b>
              <b>REG NO : {vehicle.registration_no}</b>
              <br></br>
              <div>
                <Button className="btn-success m-1" onClick={deleteVehicle}>
                  YES
                </Button>
                <Button className="btn-danger m-1" onClick={openLink}>
                  NO
                </Button>
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