import { useEffect, useState, useRef } from "react";
import moment from "moment";
import Router from "next/router";
import Link from "next/link";
import { Button } from "react-bootstrap";
import {
  getOilBalance,
  allotFuel,
  getLastVoucherEntry,
} from "@/functions/apiHandlers/fuel";
import { GetVehicles } from "@/functions/apiHandlers/vehicles";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [oils, setOils] = useState([]);
  const [theoil, setTheOil] = useState({});
  const [voucherNo, setVoucherNo] = useState("");
  const [newOil, setNewFuel] = useState({});
  const [showVehicle, setShowVehicle] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [maxOil, setMaxOil] = useState(0);
  const [showFuel, setShowFuel] = useState(true);
  const [vehicle, setVehicle] = useState({});
  const [oilDetails, setOilDetails] = useState({
    name: "",
    balance: 0,
  });

  const [rate, setRate] = useState(0);

  const oilAmountRef = useRef(null);
  const oilCostRef = useRef(null);

  function setOil({ target: { name, value } }) {
    setNewFuel((newOil) => ({
      ...newOil,
      [name]: value,
      cost: rate * oilAmountRef.current.value,
      rate: rate,
    }));
  }

  function handleVehicleChange({ target: { name, value } }) {
    setNewFuel((newOil) => ({ ...newOil, [name]: value }));
    const foundElement = vehicles.find((vehicle) => vehicle._id === value);
    setOilDetails({
      name: foundElement.fuel_type.type,
      balance: foundElement.fuel_type.balance,
    });
    setVehicle(foundElement);
    if (foundElement.fuel_capacity < foundElement.fuel_type.balance) {
      setMaxOil(foundElement.fuel_capacity);
    } else {
      setMaxOil(foundElement.fuel_type.balance);
    }
  }

  function setLimitOil({ target: { name, value } }) {
    const foundElement = oils.find((oil) => oil._id === value);
    setTheOil(foundElement);
    if (foundElement) {
      setMaxOil(foundElement.balance);
      setRate(foundElement.current_rate);
    }
    setNewFuel((newOil) => ({ ...newOil, [name]: value }));
  }

  function setOilFor({ target: { name, value } }) {
    setNewFuel((newOil) => ({ ...newOil, [name]: value }));
    if (value == "vehicle_fuel") {
      setShowVehicle(true);
      setNewFuel((newOil) => ({
        ...newOil,
        vehicle: vehicles[0]._id,
        type: vehicles[0].fuel_type,
      }));
      setShowFuel(true);
    } else if (value == "vehicle_maintenance") {
      setShowVehicle(true);
      setNewFuel((newOil) => ({ ...newOil, vehicle: vehicles[0]._id }));
      setShowFuel(false);
      setMaxOil(oils[0].balance);
      setRate(oils[0].current_rate);
      setTheOil(oils[0]);
    } else {
      setShowVehicle(false);
      delete newOil.vehicle;
      setShowFuel(false);
    }
  }

  useEffect(() => {
    getOilBalance().then((fetchedOils) => {
      getLastVoucherEntry().then((lastV) => {
        GetVehicles().then((fetchedVehicles) => {
          setTheOil(fetchedOils[0]);
          setVehicle(fetchedVehicles[0]);
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
            type: fetchedVehicles[0] ? fetchedVehicles[0].fuel_type : "",
            cost: 0,
            issued_amount: 0,
            rate: fetchedOils[0] ? fetchedOils[0].current_rate : 0,
            vehicle: fetchedVehicles[0] ? fetchedVehicles[0]._id : "",
            slno: lastV.slno ? lastV.slno + 1 : 1,
            rate: fetchedVehicles[0]
              ? fetchedVehicles[0].fuel_type.current_rate
              : 0,
          }));
          setRate(fetchedVehicles[0].fuel_type.current_rate);
          
          setMaxOil(
            fetchedVehicles[0] ? fetchedVehicles[0].fuel_type.balance : 0
          );
          setOilDetails({
            name: fetchedVehicles[0].fuel_type.type,
            balance: fetchedVehicles[0].fuel_type.balance,
          });
        });
      });
    });
  }, []);

  return (
    <>
      <AdminLayout title="Allot Oil">
        <main id="main" className="col-lg-11 main mt-n2 opac-80">
          <div className="row">
            <div className="col-8 m-1">
              <div className="card p-3">
                <div className="card-body">
                  <form
                    onSubmit={(event) => {
                      allotFuel(event, newOil);
                    }}
                  >
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
                          <option value="vehicle_maintenance">
                            Vehicle Maintenance
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
                            onChange={handleVehicleChange}
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

                    {showFuel && (
                      <>
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Oil Type :
                          </label>
                          <div className="col-sm-7">
                            <b>
                              {oilDetails.name} ( Balance : {oilDetails.balance}{" "}
                              L )
                            </b>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Fuel Capacity :
                          </label>
                          <div className="col-sm-7">
                            <b>{vehicle.fuel_capacity} L</b>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Current Fuel Rate :
                          </label>
                          <div className="col-sm-7">
                            <b>&#8377; {vehicle.fuel_type?.current_rate} / L</b>
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
                      </>
                    )}

                    {!showFuel && (
                      <>
                        {" "}
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Oil Type :
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
                          <label className="col-sm-5 col-form-label">
                            Rate :
                          </label>
                          <div className="col-sm-7">
                            <b>&#8377; {rate} / L</b>
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
                              max={theoil.balance}
                              onChange={setOil}
                              type="number"
                              name="issued_amount"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Total Cost :
                      </label>
                      <div className="col-sm-7">
                        <b>&#8377; {newOil.cost}</b>
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
                          className="btn btn-success"
                          style={{ float: "right", width: "80%" }}
                        >
                          + Allot Fuel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-3 m-1 card p-3" style={{ maxHeight: "50vh" }}>
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <Link href={"/admin/fuel/balance/log"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-list-task"></i> Oil Balance Log
                </Button>
              </Link>

              <Link href={"/admin/fuel/add"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-pencil-square"></i> Update Balance
                </Button>
              </Link>
              <Link href={"/admin/fuel/balance"}>
                <Button className="w-100 mb-1 btn-light">
                  {" "}
                  <i className="bi bi-app"></i> Show Balance
                </Button>
              </Link>

              <Link href={"/admin/fuel/addtype"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-alexa"></i> Add Oil Type
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
