import moment from "moment";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Scripts from "@/pages/components/Scripts";
import HeadAndSideBar from "@/pages/components/admin/HeadAndSideBar";
import {
  UpdateDutyDetails,
  GetOnDutyVehicles,
} from "@/functions/apiHandlers/duties";
import Router from "next/router";
import { DutiesRightSideMenu } from "@/pages/components/admin/duties";

export default function Home() {
  const [onDutyVehicles, setOnDutyVehicles] = useState([]);
  const [duty, setDuty] = useState({});

  async function SetAllDetails() {
    let data = await GetOnDutyVehicles();
    setOnDutyVehicles(data);
    setDuty(data[0]);
  }

  async function changeDuty({ target: { name, value } }) {
    let newDuty = onDutyVehicles.find((thisDuty) => {
      return thisDuty._id == value;
    });
    setDuty(newDuty);
  }
  useEffect(() => {
    SetAllDetails();
  }, []);

  return (
    <>
      <main className={styles.main}>
        <HeadAndSideBar title={"Update Duty"} />
        <main id="main" className="col-lg-11 main opac-80 row">
          <h1>Update Duty</h1>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <form
                  onSubmit={(e) => {
                    UpdateDutyDetails(e, duty);
                  }}
                >
                  <div className="row mb-3">
                    <label className="col-sm-5 col-form-label">
                      Vehicle Number :
                    </label>
                    <div className="col-sm-7">
                      <select
                        name="vehicle_no"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={changeDuty}
                      >
                        {onDutyVehicles.map((uncompvehicle, index) => (
                          <option key={index} value={uncompvehicle._id}>
                            {"CRP-" + uncompvehicle.vehicle.vehicle_crp_no}{" "}
                            {uncompvehicle.vehicle.registration_no} {" : "}
                            {uncompvehicle.vehicle.name}
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
                      Purpose :
                    </label>
                    <div className="col-sm-7">
                      <b>{duty && duty.purpose}</b>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      In Time And Date:
                    </label>
                    <div className="col-sm-7">
                      <input
                        defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
                        type="datetime-local"
                        name="in_datetime"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Meter Count:
                    </label>
                    <div className="col-sm-7">
                      <input
                        defaultValue={
                          duty && duty.vehicle && duty.vehicle.total_kilo_meter
                        }
                        min={
                          duty && duty.vehicle && duty.vehicle.total_kilo_meter
                        }
                        type="number"
                        name="meter_count"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Fuel :
                    </label>
                    <div className="col-sm-7">
                      <input
                        defaultValue={duty && duty.vehicle && duty.vehicle.fuel}
                        max={duty && duty.vehicle && duty.vehicle.fuel_capacity}
                        min={0}
                        type="number"
                        name="fuel"
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
                        Complete Duty / End Mission
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-3 card p-3">
            <DutiesRightSideMenu disable={"update_duties"} />
          </div>
        </main>
      </main>
      <Scripts />
    </>
  );
}
