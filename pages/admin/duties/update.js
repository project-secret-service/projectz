import moment from "moment";
import { useEffect, useState } from "react";

import styles from "@/styles/Home.module.css";
import Scripts from "@/pages/components/Scripts";
import HeadAndSideBar from "@/pages/components/admin/HeadAndSideBar";
import { UpdateDutyDetails, GetOnDutyVehicles } from "@/functions/axiosApis";

export default function Home() {
  const [onDutyVehicles, setOnDutyVehicles] = useState([]);
  const [duty, setDuty] = useState({});

  useEffect(() => {
    GetOnDutyVehicles().then((data) => {
      setOnDutyVehicles(data);
      setDuty(data[0]);
    });
  }, []);

  return (
    <>
      <main className={styles.main}>
        <HeadAndSideBar title={"Update Duty"} />
        <main id="main" className="col-lg-10 main opac-80">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-body">
                <h1>Update Duty</h1>

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
                      >
                        {onDutyVehicles.map((uncompvehicle, index) => (
                          <option key={index} value={uncompvehicle._id}>
                            {"CRP-" + uncompvehicle.vehicle.vehicle_crp_no}{" "}
                            {uncompvehicle.vehicle.registration_no} {" : "}
                            {uncompvehicle.purpose}
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
        </main>
      </main>
      <Scripts />
    </>
  );
}
