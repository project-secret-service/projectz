import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import Router from "next/router";
import Link from "next/link";
import { Button } from "react-bootstrap";

async function getOilBalance() {
  const res = await axios({
    url: "http://localhost:3000/oilbalance/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function GetVehicles() {
  const res = await axios({
    url: "http://localhost:3000/vehicles/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function getLastEntry() {
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/last1",
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

export default function Home() {
  const [oils, setOils] = useState([]);
  const [voucherNo, setVoucherNo] = useState("");
  const [newOil, setNewFuel] = useState({});
  const [showVehicle, setShowVehicle] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [maxOil, setMaxOil] = useState(0);

  const oilAmountRef = useRef(null);

  function setOil({ target: { name, value } }) {
    setNewFuel((newOil) => ({ ...newOil, [name]: value }));
  }

  function setLimitOil({ target: { name, value } }) {
    const foundElement = oils.find((oil) => oil._id === value);
    if (foundElement) {
      setMaxOil(foundElement.balance);
    }
    setNewFuel((newOil) => ({ ...newOil, [name]: value }));
  }

  function setOilFor({ target: { name, value } }) {
    setNewFuel((newOil) => ({ ...newOil, [name]: value }));
    if (value == "vehicle_fuel" || value == "vehicle_maintainance") {
      setShowVehicle(true);
      setNewFuel((newOil) => ({ ...newOil, vehicle: vehicles[0]._id }));
    } else {
      setShowVehicle(false);
      setNewFuel((newOil) => ({ ...newOil, vehicle: "" }));
    }
  }

  async function allotFuel(event) {
    event.preventDefault();
    const res = await axios({
      url: "http://localhost:3000/oilstockregister/allot",
      withCredentials: true,
      method: "POST",
      data: newOil,
    });
    if (res.data.status == 200) {
      Router.push("/admin/fuel/balance");
    }
  }

  useEffect(() => {
    getOilBalance().then((fetchedOils) => {
      getLastEntry().then((lastV) => {
        GetVehicles().then((fetchedVehicles) => {
          setVehicles(fetchedVehicles);
          setOils(fetchedOils);
          setVoucherNo(
            "IV/POL/" +
              (lastV.slno ? lastV.slno + 1 : 1) +
              "/" +
              moment().format("YYYY") +
              "/MT-CTC(T&IT)"
          );
          setNewFuel((newOil) => ({
            ...newOil,
            issue_voucher_no:
              "IV/POL/" +
              (lastV.slno ? lastV.slno + 1 : 1) +
              "/" +
              moment().format("YYYY") +
              "/MT-CTC(T&IT)",
            date: moment().format("YYYY-MM-DD"),
            for: "vehicle_fuel",
            type: fetchedOils[0] ? fetchedOils[0]._id : "",
            cost: 0,
            issued_amount: 0,
            vehicle: fetchedVehicles[0] ? fetchedVehicles[0]._id : "",
            slno: lastV.slno ? lastV.slno + 1 : 1,
          }));
          setMaxOil(fetchedOils[0] ? fetchedOils[0].balance : 0);
        });
      });
    });
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-10 main mt-0 opac-80">
          <h1>Allot Oil</h1>
          <div className="row">
            <div className="col-8 m-1 ">
              <div className="card p-3">
                <div className="card-body">
                  <form onSubmit={allotFuel}>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Voucher No.:
                      </label>
                      <div className="col-sm-7">
                        <input
                          defaultValue={voucherNo}
                          type="text"
                          name="issue_voucher_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">For</label>
                      <div className="col-sm-7">
                        <select
                          onChange={setOilFor}
                          name="for"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="vehicle_fuel">Vehicle Fuel</option>
                          <option value="vehicle_maintainance">
                            Vehicle Maintainance
                          </option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {showVehicle && (
                      <div className="row mb-3">
                        <label className="col-sm-5 col-form-label">
                          Vehicle
                        </label>
                        <div className="col-sm-7">
                          <select
                            onChange={setOil}
                            name="vehicle"
                            className="form-select"
                            aria-label="Default select Example"
                          >
                            {vehicles.map((vehicle, index) => (
                              <option key={index + 1} value={vehicle._id}>
                                CRP-{vehicle.vehicle_crp_no}{" "}
                                {vehicle.registration_no} ({vehicle.name})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Description :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setOil}
                          type="text"
                          name="description"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of Allotment :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setOil}
                          type="date"
                          min={new Date().toISOString().substr(0, 10)}
                          defaultValue={new Date().toISOString().substr(0, 10)}
                          name="date"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Oil Type
                      </label>
                      <div className="col-sm-7">
                        <select
                          onChange={setLimitOil}
                          name="type"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          {oils.map((oil, index) => (
                            <option key={index + 1} value={oil._id}>
                              {oil.type} (Balance : {oil.balance} L)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Amount of Oil (in L) :
                      </label>
                      <div className="col-sm-7">
                        <input
                          ref={oilAmountRef}
                          max={maxOil}
                          onChange={setOil}
                          type="number"
                          name="issued_amount"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Total Cost :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setOil}
                          type="number"
                          name="cost"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Remarks :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setOil}
                          type="text"
                          name="remarks"
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
                          Allot Fuel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-3 m-1 card p-3" style={{ maxHeight: "50vh" }}>
              <Link href={"/admin/fuel/add"}>
                <Button className="w-100 mb-1 btn-warning">
                  Update Balance
                </Button>
              </Link>
              <Link href={"/admin/fuel/balance"}>
                <Button className="w-100 mb-1 btn-dark">Show Balance</Button>
              </Link>

              <Link href={"/admin/fuel/addtype"}>
                <Button className="w-100 mb-1 btn-primary">Add Oil Type</Button>
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
