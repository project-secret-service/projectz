import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function GetuncompVehicles() {
  const res = await axios({
    url: "http://localhost:3000/duty_log/uncompleted",
    method: "GET",
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
}
function sucessful() {
  toast.success("Sucessfully Update");
  <ToastContainer
    position="top-center"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;
}
function unsucessful() {
  toast.error("Server Error");
  <ToastContainer
    position="top-center"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;
}

export default function Home() {
  const [uncompvehicles, setuncompVehicles] = useState([]);
  const [duty, setDuty] = useState({});
  const router = useRouter();
  async function UpdateDetails(event) {
    event.preventDefault();
    var data = {
      in_datetime: event.target.in_datetime.value,
      km_run: event.target.km_run.value,
      fuel: event.target.fuel.value,
      meter_count: event.target.meter_count.value,
      mission_ended: true,
    };

    console.log(data);

    const res = await axios({
      url: "http://localhost:3000/duty_log/update/" + duty._id,
      withCredentials: true,
      method: "PUT",
      data: data,
    });

    if (res.status == 200) {
      sucessful();
      router.push("/admin/duties");
    } else unsucessful();
  }
  useEffect(() => {
    GetuncompVehicles().then((data) => {
      setuncompVehicles(data);
      setDuty(data[0]);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-10 main opac-80">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-body">
                <h1>Update Duty</h1>

                <form onSubmit={UpdateDetails}>
                  <ToastContainer />

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
                        {uncompvehicles.map((uncompvehicle, index) => (
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
                      Km Run :
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="number"
                        name="km_run"
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
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
