import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { GetVehicles } from "@/functions/apiHandlers/vehicles";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const searchFilterRef = useRef();
  const [searchResultList, setSearchResultList] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    GetVehicles().then((data) => {
      if (!Array.isArray(data) || data.length == 0) return;
      data.sort((a, b) => a.vehicle_sl_no - b.vehicle_sl_no);
      setVehicles(data);
    });
  }, []);

  function handleSearchFilter({ target: { name, value } }) {
    let searchFilter = value;
    if (searchFilter != "available" && searchFilter != "unavailable") {
      setSearch(false);
      return;
    }
    setSearch(true);
    if (searchFilter == "available") {
      setSearchResultList(vehicles.filter((vehicle) => vehicle.available));
    }
    if (searchFilter == "unavailable") {
      setSearchResultList(vehicles.filter((vehicle) => !vehicle.available));
    }
  }

  function handleSearch({ target: { name, value } }) {
    let search = value;
    let searchFilter = searchFilterRef.current.value;
    if (search == "") {
      setSearch(false);
      return;
    }
    setSearch(true);
    if (searchFilter == "name") {
      setSearchResultList(
        vehicles.filter((vehicle) =>
          vehicle.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "registration_no") {
      setSearchResultList(
        vehicles.filter((vehicle) =>
          vehicle.registration_no.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "vehicle_type") {
      setSearchResultList(
        vehicles.filter((vehicle) =>
          vehicle.vehicle_type.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }

  function OpenLink(link) {
    Router.push("/admin/vehicles/vehicle/" + link);
  }
  return (
    <>
      <AdminLayout title="Available Vehicles">
        <main id="main" className="col-lg-11 main mt-n2 opac-80">
          <div className="col-lg-12 d-flex">
            <div className="col-lg-8 m-1">
              <div>
                <h5>Available Vehicles</h5>
                <div className="card p-3">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">CRP No</th>
                        <th scope="col">Vehicle Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Available</th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {!search &&
                        vehicles.map((vehicle, index) => {
                          if (vehicle.available) {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(vehicle._id)}
                              >
                                <th scope="row" className="col-1">
                                  {vehicle.vehicle_crp_no}{" "}
                                </th>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.vehicle_type}</td>
                                <td>
                                  {vehicle.available && (
                                    <span style={{ color: "green" }}>
                                      Available
                                    </span>
                                  )}
                                  {!vehicle.available && (
                                    <span style={{ color: "red" }}>
                                      On Duty
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        })}
                      {search &&
                        searchResultList.map((vehicle, index) => {
                          if (vehicle.available) {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(vehicle._id)}
                              >
                                <th scope="row" className="col-1">
                                  {vehicle.vehicle_crp_no}{" "}
                                </th>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.vehicle_type}</td>
                                <td>
                                  {vehicle.available && (
                                    <span style={{ color: "green" }}>
                                      Available
                                    </span>
                                  )}
                                  {!vehicle.available && (
                                    <span style={{ color: "red" }}>
                                      On Duty
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h5>Vehicles On Duty</h5>
                <div className="card p-3">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">CRP No</th>
                        <th scope="col">Vehicle Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Available</th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {!search &&
                        vehicles.map((vehicle, index) => {
                          if (vehicle.available === false) {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(vehicle._id)}
                              >
                                <th scope="row" className="col-1">
                                  {vehicle.vehicle_crp_no}{" "}
                                </th>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.vehicle_type}</td>
                                <td>
                                  {vehicle.available && (
                                    <span style={{ color: "green" }}>
                                      Available
                                    </span>
                                  )}
                                  {!vehicle.available && (
                                    <span style={{ color: "red" }}>
                                      On Duty
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        })}
                      {search &&
                        searchResultList.map((vehicle, index) => {
                          if (vehicle.available === false) {
                            return (
                              <tr
                                key={index + 1}
                                onClick={() => OpenLink(vehicle._id)}
                              >
                                <th scope="row" className="col-1">
                                  {vehicle.vehicle_crp_no}{" "}
                                </th>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.vehicle_type}</td>
                                <td>
                                  {vehicle.available && (
                                    <span style={{ color: "green" }}>
                                      Available
                                    </span>
                                  )}
                                  {!vehicle.available && (
                                    <span style={{ color: "red" }}>
                                      On Duty
                                    </span>
                                  )}
                                </td>
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
              className="col-lg-3 card p-5 mt-4"
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
                <option value="name">Vehicle Name</option>
                <option value="registration_no">Registration No</option>
                <option value="vehicle_type">Type</option>
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
              <Link href={"/admin/vehicles/add"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-plus-circle"></i> Add Vehicle
                </Button>
              </Link>
              <Link href={"/admin/vehicles/"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-list-task"></i> List Vehicles
                </Button>
              </Link>
              <Link href={"/admin/duties/add"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-pencil-square"></i> Add Duty
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
