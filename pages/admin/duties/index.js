import { useEffect, useState, useRef } from "react";
import { Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetDutiesDesc, OpenDuty } from "@/functions/apiHandlers/duties";
import { DutiesRightSideMenu } from "@/pages/components/admin/duties";
import AdminLayout from "@/pages/components/admin/AdminLayout";

function Home() {
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
      if (data.status != 401) {
        setDuties(data);
      }
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
      let date = dateFormat(duty.date, "dS mmmm, yyyy");

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
      if (
        searchFilterRef.current.value === "purpose" &&
        duty.purpose.toLowerCase().includes(search.toLowerCase())
      ) {
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
  }

  return (
    <>
      <AdminLayout>
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

                  {page.total_pages > 1 && (
                    <input
                      type="text"
                      // defaultValue={"of " + page.total_pages && page.total_pages}
                      placeholder={"of " + page.total_pages + " Pages"}
                      className="form-control"
                      style={{ maxWidth: "7rem" }}
                      disabled
                    />
                  )}
                  {page.total_pages <= 1 && (
                    <input
                      type="text"
                      placeholder={"of " + page.total_pages + " Page"}
                      className="form-control"
                      style={{ maxWidth: "7rem" }}
                      disabled
                    />
                  )}
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
                        <th scope="col" className="col-2">
                          Date
                        </th>
                        <th scope="col" className="col-4">
                          Duty
                        </th>
                        <th scope="col" className="col-3">
                          Vehicle
                        </th>
                        <th scope="col" className="col-1">
                          KM
                        </th>
                        <th scope="col">Bill No</th>
                        <th scope="col" className="text-center">
                          Status
                        </th>
                        <th scope="col" className="text-center">
                          SignBy <br />
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {!search &&
                        duties &&
                        duties
                          .slice(page.first_element, page.last_element)
                          .map((duty, index) => {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenDuty(duty._id)}
                              >
                                <td className="col-1">
                                  <b>
                                    {duty.out_datetime &&
                                      dateFormat(
                                        duty.out_datetime,
                                        "dS mmmm, yyyy"
                                      )}
                                  </b>
                                </td>
                                <td className="col-3">
                                  {duty.purpose && duty.purpose}
                                </td>

                                <td>
                                  CRP -(
                                  {duty.vehicle && duty.vehicle.vehicle_crp_no}
                                  ), {duty.vehicle && duty.vehicle.name},{" "}
                                  {duty.vehicle && duty.vehicle.registration_no}
                                </td>
                                <td>{duty.km_run && duty.km_run} km</td>
                                <td>1455</td>
                                <td
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  {!duty.mission_ended && (
                                    <>
                                      <span
                                        className="blinking"
                                        style={{ color: "red" }}
                                      >
                                        <i className="bi bi-car-front-fill"></i>
                                      </span>
                                    </>
                                  )}
                                  {duty.mission_ended && (
                                    <>
                                      <span style={{ color: "green" }}>
                                        <i className="bi bi-check-circle-fill"></i>
                                      </span>
                                    </>
                                  )}
                                </td>

                                <td className="text-center">
                                  {duty.sign_indenter && (
                                    <span style={{ color: "darkmagenta" }}>
                                      INT
                                    </span>
                                  )}
                                  {duty.sign_mtic && (
                                    <span style={{ color: "blue" }}> MTIC</span>
                                  )}
                                  {duty.sign_mto && (
                                    <span style={{ color: "green" }}> MTO</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      {search &&
                        searchResultList
                          .slice(page.first_element, page.last_element)
                          .map((duty, index) => {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenDuty(duty._id)}
                              >
                                <td className="col-1">
                                  <b>
                                    {duty.out_datetime &&
                                      dateFormat(
                                        duty.out_datetime,
                                        "dS mmmm, yyyy"
                                      )}
                                  </b>
                                </td>
                                <td className="col-3">
                                  {duty.purpose && duty.purpose}
                                </td>

                                <td>
                                  CRP -(
                                  {duty.vehicle && duty.vehicle.vehicle_crp_no}
                                  ), {duty.vehicle && duty.vehicle.name},{" "}
                                  {duty.vehicle && duty.vehicle.registration_no}
                                </td>
                                <td>{duty.km_run && duty.km_run} km</td>
                                <td>1455</td>
                                <td
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  {!duty.mission_ended && (
                                    <>
                                      <span
                                        className="blinking"
                                        style={{ color: "red" }}
                                      >
                                        <i className="bi bi-car-front-fill"></i>
                                      </span>
                                    </>
                                  )}
                                  {duty.mission_ended && (
                                    <>
                                      <span style={{ color: "green" }}>
                                        <i className="bi bi-check-circle-fill"></i>
                                      </span>
                                    </>
                                  )}
                                </td>

                                <td className="text-center">
                                  {duty.sign_indenter && (
                                    <span style={{ color: "darkmagenta" }}>
                                      INT
                                    </span>
                                  )}
                                  {duty.sign_mtic && (
                                    <span style={{ color: "blue" }}> MTIC</span>
                                  )}
                                  {duty.sign_mto && (
                                    <span style={{ color: "green" }}> MTO</span>
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
              style={{ maxHeight: "70vh" }}
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
                defaultValue={"purpose"}
              >
                <option value="purpose">Duty</option>
                <option value="vehicle_name">Vehicle Name</option>
                <option value="registration_no">Vehicle No</option>
                <option value="date">Date</option>
                <option value="indent_no">Indent No</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
              </select>
              <hr></hr>
              <DutiesRightSideMenu disable={"all_duties"} />
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}

export default Home;
