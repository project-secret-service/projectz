import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import "react-datalist-input/dist/styles.css";

async function GetDetails() {
  const res = await axios({
    url: "https://projectx-production.up.railway.app/inspection/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function addNewDriver(event) {
  event.preventDefault();
  console.log(event.target.driver);
  var data = {
    sl_no: event.target.sl_no.value,
    vehicle: event.target.vehicle.value,
    date: event.target.date.value,
    electrical: event.target.electrical.value,
    engine: event.target.engine.value,
    transmission: event.target.transmission.value,
    lubrication: event.target.lubrication.value,
    chassis: event.target.chassis.value,
    tools_remark: event.target.tools_remark.value,
    inspection_remarks: event.target.inspection_remarks.value,
    road_test: event.target.road_test.value,
    special_fittings: event.target.special_fittings.value,
    vehicle_records: event.target.vehicle_records.value,
  };

  const res = await axios({
    url: "https://projectx-production.up.railway.app/inspection/inspect",
    withCredentials: true,
    method: "POST",
    data: data,
  });
  console.log(res.data);
}

export default function Home() {
  const [drivers, setDrivers] = useState([]);
  const [errors, setErrors] = useState({ sl_no: "" });
  useEffect(() => {
    GetDetails().then((data) => {
      setDrivers(data);
    });
  }, []);

  function OpenLink(link) {
    console.log(link);
    Router.push("/admin/inspection/inspect" + link);
  }

  return (
    <>
      <Head>
        <title>Inspect Vehicle</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-10 main">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-body">
                <h1>Inspect Vehicle</h1>
                <hr
                  style={{
                    color: "#000000",
                    backgroundColor: "#000000",
                    height: 1.5,
                    padding: ".2rem",
                  }}
                />

                <form onSubmit={addNewDriver}>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Sl no:
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="number"
                        name="sl_no"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Vehicle No:
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="string"
                        name="license_no"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Date:
                    </label>
                    <div className="col-sm-2">
                      <input
                        type="date"
                        name="date_to"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Inspection Remarks:
                    </label>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        name="approval_mto"
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
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
