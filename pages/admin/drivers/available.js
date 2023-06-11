import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import { GetDrivers } from "@/functions/apiHandlers/drivers";
import { AXIOS_BASE_URL } from "@/functions/constants";
import AdminLayout from "@/pages/components/admin/AdminLayout";

export default function Home() {
  const [drivers, setDrivers] = useState([]);
  const searchFilterRef = useRef();
  const [searchResultList, setSearchResultList] = useState([]);
  const [search, setSearch] = useState(false);

  function handleSearchFilter({ target: { name, value } }) {
    let searchFilter = value;
    if (searchFilter != "available" && searchFilter != "unavailable") {
      setSearch(false);
      return;
    }
    setSearch(true);
    if (searchFilter === "available") {
      let filteredDrivers = drivers.filter((driver) => driver.available);
      setSearchResultList(filteredDrivers);
    }
    if (searchFilter === "unavailable") {
      let filteredDrivers = drivers.filter((driver) => !driver.available);
      setSearchResultList(filteredDrivers);
    }
  }

  function handleSearch({ target: { name, value } }) {
    let search = value;
    if (search === "") {
      setSearch(false);
      return;
    }
    setSearch(true);
    let searchFilter = searchFilterRef.current.value;
    if (searchFilter === "name") {
      let filteredDrivers = drivers.filter((driver) =>
        driver.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResultList(filteredDrivers);
    }
    if (searchFilter === "license_no") {
      let filteredDrivers = drivers.filter((driver) =>
        driver.license_no.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResultList(filteredDrivers);
    }
    if (searchFilter === "rank") {
      let filteredDrivers = drivers.filter((driver) =>
        driver.rank.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResultList(filteredDrivers);
    }
  }

  useEffect(() => {
    GetDrivers().then((data) => {
      if (Array.isArray(data) && data.length != 0) {
        data.sort((a, b) => a.vehicle_sl_no - b.vehicle_sl_no);
        setDrivers(data);
      }
    });
  }, []);

  function OpenLink(link) {
    Router.push("/admin/drivers/" + link);
  }
  return (
    <>
      <AdminLayout title="Available Drivers">
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <Row className="p-1"></Row>
          <div className="col-lg-12 d-flex">
            <div className="col-lg-8 mt-1">
              <div>
                <h2>Available Drivers</h2>
                <div className="card p-3">
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
                      {!search &&
                        drivers.map((driver, index) => {
                          if (driver.available) {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(driver._id)}
                              >
                                <td>
                                  {driver.profile_pic && (
                                    <img
                                      src={
                                        `${AXIOS_BASE_URL}/images/profilepic/` +
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
                                <td style={{ color: "green" }}>Available</td>
                              </tr>
                            );
                          }
                        })}
                      {search &&
                        searchResultList.map((driver, index) => {
                          if (driver.available) {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(driver._id)}
                              >
                                <td>
                                  {driver.profile_pic && (
                                    <img
                                      src={
                                        `${AXIOS_BASE_URL}/images/profilepic/` +
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
                                <td style={{ color: "green" }}>Available</td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h2>Drivers On Duty</h2>
                <div className="card p-3">
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
                      {!search &&
                        drivers.map((driver, index) => {
                          if (driver.available === false) {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(driver._id)}
                              >
                                <td>
                                  {driver.profile_pic && (
                                    <img
                                      src={
                                        `${AXIOS_BASE_URL}/images/profilepic/` +
                                        driver.profile_pic
                                      }
                                      style={{
                                        width: "4rem",
                                      }}
                                      alt="Avatar"
                                    />
                                  )}
                                  {!driver.profile_pic && (
                                    <img
                                      src={"/assets/img/profile1.png"}
                                      style={{
                                        width: "4rem",
                                      }}
                                      alt="Avatar"
                                    />
                                  )}
                                </td>
                                <th>{driver.name}</th>
                                <td>{driver.license_no}</td>
                                <td>{driver.rank}</td>
                                <td style={{ color: "red" }}>On Duty</td>
                              </tr>
                            );
                          }
                        })}
                      {search &&
                        searchResultList.map((driver, index) => {
                          if (driver.available === false) {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(driver._id)}
                              >
                                <td>
                                  {driver.profile_pic && (
                                    <img
                                      src={
                                        `${AXIOS_BASE_URL}/images/profilepic/` +
                                        driver.profile_pic
                                      }
                                      style={{
                                        width: "4rem",
                                      }}
                                      alt="Avatar"
                                    />
                                  )}
                                  {!driver.profile_pic && (
                                    <img
                                      src={"/assets/img/profile1.png"}
                                      style={{
                                        width: "4rem",
                                      }}
                                      alt="Avatar"
                                    />
                                  )}
                                </td>
                                <th>{driver.name}</th>
                                <td>{driver.license_no}</td>
                                <td>{driver.rank}</td>
                                <td style={{ color: "red" }}>On Duty</td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-5 m-1 mt-5"
              style={{ maxHeight: "50vh" }}
            >
              <div className="row p-3">
                <input
                  onChange={handleSearch}
                  name="search"
                  type="text"
                  className="form-control"
                  placeholder="Search"
                ></input>
              </div>

              <select
                className="form-select text-center"
                ref={searchFilterRef}
                aria-label="Default select example"
                onChange={handleSearchFilter}
                defaultValue={"name"}
              >
                <option value={"name"}>Driver Name</option>
                <option value="license_no">License No</option>
                <option value="rank">Rank</option>
                <option value="available">Available</option>
                <option value="unavailable">On Duty</option>
              </select>
              <hr></hr>
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <hr />
              <Link href={"/admin/drivers/add"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-plus-circle"> </i>Add Drivers
                </Button>
              </Link>

              <Link href={"/admin/drivers/"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-list-task"></i> All Drivers
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
