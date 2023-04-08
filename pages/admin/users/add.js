import Head from "next/head";
import styles from "@/styles/Home.module.css";
import pic_styles from "@/styles/Profile.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { Button, Row } from 'react-bootstrap';
import Link from "next/link";

async function GetUsers() {
  const res = await axios({
    url: "http://localhost:3000/users/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function addNewUser(event) {
  event.preventDefault();
  console.log(event.target.profile_pic.files[0]);
  var data = {
    user_registration_no: event.target.user_registration_no.value,
    username: event.target.username.value,
    password: event.target.password.value,
    contact_no: event.target.contact_no.value,
    email_id: event.target.email_id.value,
    rank: event.target.rank.value,
    photo: event.target.profile_pic.files[0],
  };

  const formData = new FormData(event.target);
  console.log(formData);

  const res = await axios({
    url: "http://localhost:3000/users/add",
    withCredentials: true,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  });
  console.log(res.data);
}

async function CheckRegistrationNoinDB(registration_no) {
  var res = await axios({
    url: "http://localhost:3000/users/registration_no",
    withCredentials: true,
    method: "POST",
    data: {
      registration_no: parseInt(registration_no),
    },
  });
  return res.data;
}

export default function Home() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({ user_registration_no: "" });
  useEffect(() => {
    GetUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  function OpenLink(link) {
    console.log(link);
    Router.push("/admin/users/" + link);
  }

  function CheckRegistrationNo() {
    var s = document.getElementsByName("user_registration_no");
    if (s[0].value) {
      CheckRegistrationNoinDB(s[0].value).then((data) => {
        console.log(data);
        if (data === "F") {
          setErrors((errors) => {
            return {
              ...errors,
              user_registration_no: "Registration NO. ALREADY EXISTS",
            };
          });
        } else {
          setErrors((errors) => {
            return {
              ...errors,
              user_registration_no: "",
            };
          });
        }
      });
    }
  }

  return (
    <>
      <Head>
        <title>Add User</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0">
          <Row>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h1>Add New User</h1>
                  <hr
                    style={{
                      color: "#000000",
                      backgroundColor: "#000000",
                      height: 1.5,
                      padding: ".2rem",
                    }}
                  />

                  <form onSubmit={addNewUser}>
                    <div className={pic_styles.container}>
                      <div className={pic_styles.pictureContainer}>
                        <div className={pic_styles.picture}>
                          <input
                            name="profile_pic"
                            type="file"
                            id="image_input"
                            accept="image/png , image/jpg"
                          />
                          <div id="display_image"></div>
                        </div>
                        <h4>Choose Picture</h4>
                      </div>
                    </div>
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
                          name="username"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        User Registration No :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="user_registration_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Password:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Contact no:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="contact_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Email Id:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="email"
                          name="email_id"
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
                        <input type="text" name="rank" className="form-control" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Employee Role :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="vehicle_type"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="">--Please choose an option--</option>
                          <option value="Admin">Admin</option>
                          <option value="FI">Fuel Incharge</option>
                          <option value="WI">WorkShop Incharge</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button
                          type="submit"
                          className="btn btn-success"
                          style={{ float: "right" }}
                        >
                          Add User
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-2 card p-4 m-1" style={{ maxHeight: "10vh" }}>
              <Link href={"/admin/users"}>
                <Button className="w-100 mb-1 btn btn-info">Users List</Button>
              </Link>
            </div>
          </Row>
          <button
            className="btn btn-primary"
            style={{ float: "left" }}
            onClick={() => Router.back()}>Go Back</button>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
