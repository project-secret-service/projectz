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
  const [newOil, setNewOil] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [showVehicle, setShowVehicle] = useState(true);
  const [vehicle, setVehicle] = useState({});
  const [oil, setOil] = useState({});
  const [oils, setOils] = useState([]);
  const [maxOilValue, setMaxOilValue] = useState(0);

  const oilAmountRef = useRef();

  function setAmount({ target: { name, value } }) {
    setNewOil({
      ...newOil,
      [name]: value,
      cost: value * oil.current_rate,
      rate: oil.current_rate,
      new_balance: oil.balance - value,
    });
    console.log(value);
  }

  function handleOilForChange({ target: { name, value } }) {
    if (value == "vehicle_fuel") {
      setOil(vehicle.fuel_type);
      setShowVehicle(true);
    } else if (value == "vehicle_maintenance") {
      setOil(oils[0]);
      setShowVehicle(true);
      setVehicle(vehicles[0]);
    } else {
      delete newOil.vehicle;
      setOil(oils[0]);
      setShowVehicle(false);
    }
    setNewOil({ ...newOil, [name]: value, cost: 0, type: oils[0]._id });
  }

  function handleVehicleChange({ target: { name, value } }) {
    const foundVehicle = vehicles.find((vehicle) => vehicle._id === value);
    setVehicle(foundVehicle);
    setOil(foundVehicle.fuel_type);
    console.log(foundVehicle.fuel_type.current_rate);
    setNewOil({
      ...newOil,
      [name]: value,
      rate: vehicle.fuel_type.current_rate,
      cost: 0,
      previous_balance: vehicle.fuel_type.balance,
      new_balance: vehicle.fuel_type.balance - oilAmountRef.current.value,
    });
    oilAmountRef.current.value = null;
    if (newOil.for == "vehicle_maintenance") {
      setOil(oils[0]);
    }
  }

  function handleOilChange({ target: { name, value } }) {
    const foundOil = oils.find((oil) => oil._id === value);
    setOil(foundOil);
    setNewOil({
      ...newOil,
      [name]: value,
      rate: foundOil.current_rate,
      cost: foundOil.current_rate * oilAmountRef.current.value,
      previous_balance: foundOil.balance,
      new_balance: foundOil.balance - oilAmountRef.current.value,
    });
  }

  async function SetAllInitials() {
    const lastVoucher = await getLastVoucherEntry();
    const vehicles = await GetVehicles();
    const oils = await getOilBalance();
    setOils(oils);
    setVehicles(vehicles);
    setVehicle(vehicles[0]);
    setOil(vehicles[0].fuel_type);
    setNewOil({
      ...newOil,
      issue_voucher_no:
        "IV/POL/" +
        (lastVoucher.slno ? lastVoucher.slno + 1 : 1) +
        "/" +
        moment().format("YYYY") +
        "/MT-CTC(T&IT)",
      vehicle: vehicles[0]._id,
      for: "vehicle_fuel",
      date: new Date().toISOString().substr(0, 10),
      cost: 0,
      type: vehicles[0].fuel_type._id,
      rate: vehicles[0].fuel_type.current_rate,
      previous_balance: vehicles[0].fuel_type.balance,
    });
    setMaxOilValue(vehicles[0].fuel_type.balance);
  }

  function setDetails({ target: { name, value } }) {
    setNewOil({ ...newOil, [name]: value });
  }

  useEffect(() => {
    SetAllInitials();
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
                          defaultValue={newOil.issue_voucher_no}
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
                          onChange={handleOilForChange}
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
                          onChange={setDetails}
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
                          onChange={setDetails}
                          type="date"
                          min={new Date().toISOString().substr(0, 10)}
                          defaultValue={new Date().toISOString().substr(0, 10)}
                          name="date"
                          className="form-control"
                        />
                      </div>
                    </div>

                    {newOil.for == "vehicle_fuel" && (
                      <>
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Oil Type :
                          </label>
                          <div className="col-sm-7">
                            <b>
                              {oil.type}
                              {" ( Balance : "}
                              {oil.balance}
                              {" L )"}
                            </b>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Fuel Capacity :
                          </label>
                          <div className="col-sm-7">
                            <b>{vehicle.fuel_capacity} L </b>
                            <b>
                              ( Empty:{" "}
                              {Math.round(
                                (vehicle.fuel_capacity - vehicle.fuel) * 100
                              ) / 100}{" "}
                              L )
                            </b>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Current Fuel Rate :
                          </label>
                          <div className="col-sm-7">
                            <b>&#8377; {oil.current_rate} / L</b>
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
                              onChange={setAmount}
                              max={
                                vehicle.fuel_capacity - vehicle.fuel <
                                oil.balance
                                  ? vehicle.fuel_capacity - vehicle.fuel
                                  : oil.balance
                              }
                              type="number"
                              name="issued_amount"
                              className="form-control no-spinner"
                              step="0.01"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {newOil.for == "vehicle_maintenance" && (
                      <>
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Oil Type :
                          </label>
                          <div className="col-sm-7">
                            <select
                              onChange={handleOilChange}
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
                            Current Oil Rate :
                          </label>
                          <div className="col-sm-7">
                            <b>&#8377; {oil.current_rate} / L</b>
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
                              max={oil.balance}
                              onChange={setAmount}
                              type="number"
                              name="issued_amount"
                              className="form-control"
                              step="0.01"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {newOil.for == "other" && (
                      <>
                        <div className="row mb-3">
                          <label className="col-sm-5 col-form-label">
                            Oil Type :
                          </label>
                          <div className="col-sm-7">
                            <select
                              onChange={handleOilChange}
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
                            Current Oil Rate :
                          </label>
                          <div className="col-sm-7">
                            <b>&#8377; {oil.current_rate} / L</b>
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
                              max={oil.balance}
                              onChange={setAmount}
                              type="number"
                              name="issued_amount"
                              className="form-control"
                              step="0.01"
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
                        <b>&#8377; {newOil.cost ? newOil.cost : 0}</b>
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
                          onChange={setDetails}
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
