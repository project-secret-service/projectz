import Head from "next/head";
import styles from "@/styles/Home.module.css";
import styless from "@/styles/Profile.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";

async function GetUsers() {
  const res = await axios({
    url: "http://localhost:3000/drivers/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [driver, setDrivers] = useState({});
  useEffect(() => {
    GetUsers().then((data) => {
      setDrivers(data);
    });
  }, []);

  async function addNewDriver(event) {
    event.preventDefault();
    
    const res = await axios({
      url: "http://localhost:3000/drivers/add",
      withCredentials: true,
      method: "POST",
      data: driver,
    });

    if (res.data.status === 200) {
     
      Router.push("/admin/drivers/" + res.data.data._id);
    }
  }

  function setD({ target: { name, value } }) {
    setDrivers((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <Head>
        <title>Add Driver</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-11 main mt-0 opac-80">
          <h1>Add New Driver</h1>
          <div className="row">
            <div className="card col-8 m-1">
              <div className="card-body">
                {/* <div className={styless.container}>
                                    <div className={styless.pictureContainer}>
                                        <div className={styless.picture}>
                                            <input type="file" id="image_input" accept="image/png , image/jpg" />
                                            <div id="display_image"></div>
                                        </div>
                                        <h4>Choose Picture</h4>
                                    </div>
                                </div> */}

                <form onSubmit={addNewDriver}>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Name :
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
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
                      Rank:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="text"
                        name="rank"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      License No:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
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
                      Date From:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={setD}
                        type="date"
                        name="date_from"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Date To:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={setD}
                        type="date"
                        name="date_to"
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
                        Add Driver
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-3 card m-1 p-5">
              <Link href={"/admin/drivers"}>
                <Button className="w-100 mb-1">List Drivers</Button>
              </Link>
            </div>
          </div>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
