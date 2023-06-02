import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import Link from "next/link";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetDutiesDesc, OpenDuty } from "@/functions/apiHandlers/duties";

export default function Home() {
  const [duties, setDuties] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  const [search, setSearch] = useState(false);
  const searchFilterRef = useRef(null);
  const [page, setPage] = useState({
    current: 1,
    first_element: 0,
    last_element: 0,
    size: 10,
  });

  function NextPage() {
    if (page.current > page.total_pages - 1) {
      return;
    }
    let newPage = page.current + 1;
    let newFirstElement = page.last_element;
    let newLastElement = page.last_element + page.size;
    setPage({
      current: newPage,
      first_element: newFirstElement,
      last_element: newLastElement,
      total_pages: page.total_pages,
      size: page.size,
    });
  }

  function PreviousPage() {
    if (page.current === 1) {
      return;
    }
    let newPage = page.current - 1;
    let newFirstElement = page.first_element - page.size;
    let newLastElement = page.first_element;
    setPage({
      current: newPage,
      first_element: newFirstElement,
      last_element: newLastElement,
      total_pages: page.total_pages,
      size: page.size,
    });
  }

  useEffect(() => {
    GetDutiesDesc().then((data) => {
      setDuties(data);
      setPage({
        current: 1,
        first_element: 0,
        last_element: page.size,
        total_pages: Math.ceil(data.length / page.size),
        size: page.size,
      });
    });
  }, []);

  function handleSearchFilter({ target: { name, value } }) {
    if (
      searchFilterRef.current.value !== "active" &&
      searchFilterRef.current.value !== "completed"
    ) {
      setSearch(false);
      setPage({
        current: 1,
        first_element: 0,
        last_element: page.size,
        total_pages: Math.ceil(duties.length / page.size),
        size: page.size,
      });
      return;
    }
    if (searchFilterRef.current.value === "active") {
      setSearch(true);
      let results = new Set();
      duties.forEach((duty) => {
        if (duty.mission_ended === false) {
          results.add(duty);
        }
      });
      setSearchResultList(Array.from(results));
      setPage({
        current: 1,
        first_element: 0,
        last_element: page.size,
        total_pages: Math.ceil(Array.from(results).length / page.size),
        size: page.size,
      });
      return;
    }

    if (searchFilterRef.current.value === "completed") {
      setSearch(true);
      let results = new Set();
      duties.forEach((duty) => {
        if (duty.mission_ended === true) {
          results.add(duty);
        }
      });

      setSearchResultList(Array.from(results));
      setPage({
        current: 1,
        first_element: 0,
        last_element: page.size,
        total_pages: Math.ceil(Array.from(results).length / page.size),
        size: page.size,
      });
      return;
    }
  }

  function handleSearch({ target: { name, value } }) {
    let search = value;
    if (searchFilterRef.current.value === "active") {
      setSearch(true);
      let results = new Set();
      duties.forEach((duty) => {
        if (duty.mission_ended === false) {
          results.add(duty);
        }
      });
      setSearchResultList(Array.from(results));
      return;
    }
    if (
      search === "" &&
      searchFilterRef.current.value != "active" &&
      searchFilterRef.current.value != "completed"
    ) {
      setSearch(false);
      setPage({
        current: 1,
        first_element: 0,
        last_element: page.size,
        total_pages: Math.ceil(duties.length / page.size),
        size: page.size,
      });
      return;
    }
    setSearch(true);
    let results = new Set();
    duties.forEach((duty) => {
      let date = dateFormat(duty.date, "dS mmm, yyyy");

      if (
        searchFilterRef.current.value === "vehicle_name" &&
        duty.vehicle.name.toLowerCase().includes(search.toLowerCase())
      ) {
        results.add(duty);
      }
      if (
        searchFilterRef.current.value === "registration_no" &&
        duty.vehicle.registration_no
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        results.add(duty);
      }
      if (
        searchFilterRef.current.value === "indent_no" &&
        duty.indent_no.toLowerCase().includes(search.toLowerCase())
      ) {
        results.add(duty);
      }
      if (
        searchFilterRef.current.value === "date" &&
        date.toLowerCase().includes(search.toLowerCase())
      ) {
        results.add(duty);
      }
      if (searchFilterRef.current.value === "active") {
        if (duty.mission_ended === false) {
          setSearch(true);
          results.add(duty);
        }
      }

      if (searchFilterRef.current.value === "completed") {
        if (duty.mission_ended === true) {
          results.add(duty);
          setSearch(true);
        }
      }
    });
    setSearchResultList(Array.from(results));
    setPage({
      current: 1,
      first_element: 0,
      last_element: page.size,
      total_pages: Math.ceil(Array.from(results).length / page.size),
      size: page.size,
    });
  }

  return (
    <>
      <Head>
        <title>List Duties</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className=" col-lg-11 main mt-0">
          <div className="d-flex justify-content-between">
            <h1>All Duties</h1>

            <div className="d-flex" style={{ display: "inline" }}>
              <div style={{ marginRight: "10px" }}>
                <div className="input-group mb-3">
                  <div
                    className="input-group-prepend"
                    style={{ cursor: "pointer" }}
                    onClick={PreviousPage}
                  >
                    <span className="input-group-text" id="basic-addon1">
                      Previous
                    </span>
                  </div>
                  <input
                    defaultValue={page.current}
                    type="number"
                    className="form-control"
                    placeholder="Page No"
                    aria-describedby="basic-addon1"
                    style={{ maxWidth: "50px" }}
                    disabled
                  />
                  <input
                    type="text"
                    defaultValue={"of " + page.total_pages && page.total_pages}
                    className="form-control"
                    style={{ maxWidth: "80px" }}
                    disabled
                  />
                  <div
                    className="input-group-prepend"
                    style={{ cursor: "pointer" }}
                    onClick={NextPage}
                  >
                    <span className="input-group-text" id="basic-addon1">
                      Next
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <div className="col-lg-8 m-1">
              <div className="card opac-90">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Indent No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Vehicle name</th>
                        <th scope="col">Vehicle No</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {!search &&
                        duties
                          .slice(page.first_element, page.last_element)
                          .map((duty, index) => {
                            var vv = new Date(duty.date);
                            var mission = duty.mission_ended;
                            let color = "#D0F5BE";
                            let textColor = "#0C134F";
                            var v1;
                            if (mission) {
                              v1 = "Completed";
                              color = "#FBFFDC";
                              textColor = "green";
                            } else {
                              v1 = "Active";
                            }
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenDuty(duty._id)}
                                style={{ backgroundColor: color }}
                              >
                                <th className="col-1">{duty.indent_no}</th>
                                <td scope="row">
                                  {duty.out_datetime &&
                                    dateFormat(
                                      duty.out_datetime,
                                      "dS mmmm, yyyy"
                                    )}
                                </td>
                                <td>{duty.vehicle && duty.vehicle.name}</td>
                                <td>
                                  {duty.vehicle && duty.vehicle.registration_no}
                                </td>
                                <td>
                                  {duty.out_datetime &&
                                    dateFormat(duty.out_datetime, " h:MM TT")}
                                </td>

                                <td style={{ color: textColor }}>
                                  {v1 === "Active" && (
                                    <>
                                      <span className="blinking">Active</span>
                                    </>
                                  )}
                                  {v1 === "Completed" && (
                                    <>
                                      <span>Completed</span>
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      {search &&
                        searchResultList
                          .slice(page.first_element, page.last_element)
                          .map((duty, index) => {
                            var vv = new Date(duty.date);
                            var mission = duty.mission_ended;
                            let color = "#D0F5BE";
                            let textColor = "#0C134F";
                            var v1;
                            if (mission) {
                              v1 = "Completed";
                              color = "#FBFFDC";
                              textColor = "green";
                            } else {
                              v1 = "Active";
                            }
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(duty._id)}
                                style={{ backgroundColor: color }}
                              >
                                <th className="col-1">{duty.indent_no}</th>
                                <td scope="row">
                                  {duty.out_datetime &&
                                    dateFormat(
                                      duty.out_datetime,
                                      "dS mmmm, yyyy"
                                    )}
                                </td>
                                <td>{duty.vehicle && duty.vehicle.name}</td>
                                <td>
                                  {duty.vehicle && duty.vehicle.registration_no}
                                </td>
                                <td>
                                  {duty.out_datetime &&
                                    dateFormat(duty.out_datetime, " h:MM TT")}
                                </td>

                                <td style={{ color: textColor }}>
                                  {v1 === "Active" && (
                                    <>
                                      <span className="blinking">Active</span>
                                    </>
                                  )}
                                  {v1 === "Completed" && (
                                    <>
                                      <span>Completed</span>
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1 opac-80"
              style={{ maxHeight: "50vh", opacity: "0.6" }}
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
                defaultValue={"vehicle_name"}
              >
                <option value="vehicle_name">Vehicle Name</option>
                <option value="registration_no">Vehicle No</option>
                <option value="date">Date</option>
                <option value="indent_no">Indent No</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
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

              <Link href={"/admin/duties/add"}>
                <Button className="w-100 mb-1 btn-primary">Add Duties</Button>
              </Link>
              <Link href={"/admin/duties/update"}>
                <Button className="w-100 mb-1 btn-warning">
                  Update Duties
                </Button>
              </Link>
              <Link href={"/admin/drivers/available"}>
                <Button className="w-100 mb-1 btn-light">
                  Available Drivers
                </Button>
              </Link>
              <Link href={"/admin/vehicles/available"}>
                <Button className="w-100 mb-1 btn-success">
                  Available Vehicles
                </Button>
              </Link>
              <Link href={"/admin/duties/print"}>
                <Button className="w-100 mb-1 btn-danger">Print</Button>
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
