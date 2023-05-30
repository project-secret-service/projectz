import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";

async function GetDrivers() {
  const res = await axios({
    url: "http://localhost:3000/drivers/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    GetDrivers().then((data) => {
      setDrivers(data);
    });
  }, []);
  function OpenLink(link) {
    Router.push("/admin/drivers/" + link);
  }
  return (
    <>
      <Head>
        <title>List Drivers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />
        <main id="main" className=" col-lg-11 main mt-0">
          <h1>All Drivers</h1>
          <Row>
            <div className="col-lg-8 m-1">
              <div className="card opac-90">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Driver</th>
                        <th scope="col">Name</th>
                        <th scope="col">License No</th>
                        <th scope="col">Rank</th>
                        <th scope="col">Available</th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {drivers.map((driver, index) => {
                        return (
                          <tr
                            key={index + 1}
                            onClick={() => OpenLink(driver._id)}
                          >
                            <td>
                              {driver.profile_pic && (
                                <img
                                  src={
                                    "http://localhost:3000/images/profilepic/" +
                                    driver.profile_pic
                                  }
                                  style={{
                                    width: "4rem",
                                    WebkitFilter:
                                      "drop-shadow(1px 1px 1px #222)",
                                    filter: "drop-shadow(1px 1px 5px #222)",
                                  }}
                                  alt="Avatar"
                                />
                              )}
                              {!driver.profile_pic && (
                                <img
                                  src={"/assets/img/profile1.png"}
                                  style={{
                                    width: "4rem",
                                    WebkitFilter:
                                      "drop-shadow(1px 1px 1px #222)",
                                    filter: "drop-shadow(1px 1px 5px #222)",
                                  }}
                                  alt="Avatar"
                                />
                              )}
                            </td>
                            <th>{driver.name}</th>
                            <td>{driver.license_no}</td>
                            <td>{driver.rank}</td>
                            {driver.available && (
                              <td style={{ color: "green" }}>Available</td>
                            )}
                            {!driver.available && (
                              <td style={{ color: "red" }}>On Duty</td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-3 m-1 opac-80"
              style={{ maxHeight: "20vh" }}
            >
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <Link href={"/admin/drivers/add"}>
                <Button className="w-100 mb-1 btn-warning">Add Drivers</Button>
              </Link>

              <Link href={"/admin/drivers/available"}>
                <Button className="w-100 mb-1 btn-dark">
                  Available Drivers
                </Button>
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
