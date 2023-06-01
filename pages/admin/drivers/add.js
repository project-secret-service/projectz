import Head from "next/head";
import styles from "@/styles/Home.module.css";
import styless from "@/styles/Profile.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";

import Router from "next/router";

export default function Home() {
  const [driver, setDrivers] = useState({});
  const [imageSource, setImageSource] = useState("");

  const handleInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSource(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  async function addNewDriver(event) {
    event.preventDefault();

    console.log(event.target.profile_pic.files[0]);
    const res = await axios({
      url: "http://localhost:3000/drivers/add",
      withCredentials: true,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        ...driver,
        profile_pic: event.target.profile_pic.files[0],
      },
    });
    console.log(res.data);
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
                <form onSubmit={addNewDriver}>
                  <div className="row mb-3">
                    <label
                      htmlFor="profileImage"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-file-image"></i> Profile Image
                    </label>
                    <div className="col-sm-7">
                      {imageSource && (
                        <>
                          <img
                            src={imageSource}
                            alt="Preview Image"
                            width="30%"
                          />
                          <br />
                          <br />
                        </>
                      )}
                      <div>
                        <input
                          onChange={handleInputChange}
                          name="profile_pic"
                          type="file"
                          id="image_input"
                          accept="image/png , image/jpg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
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
                      className="col-md-4 col-lg-3 col-form-label"
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
                      className="col-md-4 col-lg-3 col-form-label"
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
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Date From:
                    </label>
                    <div className="col-sm-7">
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
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Date To:
                    </label>
                    <div className="col-sm-7">
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
                        className="btn btn-success"
                        style={{ float: "right", width: "50%" }}
                      >
                        + Add Driver
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-3 card m-1 p-5">
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
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
