import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "@/pages/components/Header";
import SideBar from "@/pages/components/Sidebar";
import Scripts from "@/pages/components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "@/pages/components/Head";
import vehicle_styles from "@/styles/Vehicles.module.css";
import { Button, Col, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import Link from "next/link";

async function GetVehicle(id) {
  const res = await axios({
    url: "https://projectx-production.up.railway.app/vehicles/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [vehicle, setVehicle] = useState({});
  const [odometerLog, setOdometerLog] = useState([]);
  const [kmLimitError, setKmLimitError] = useState(false);

  const router = useRouter();
  function handleKmChange({ target: { name, value } }) {
    if (parseFloat(value) < vehicle.total_kilo_meter) {
      setKmLimitError(true);
    } else {
      setKmLimitError(false);
    }
  }

  async function updateKmRun() {
    let newKM = document.getElementById("km_run").value;
    if (newKM >= vehicle.total_kilo_meter) {
      const res = await axios({
        url: "https://projectx-production.up.railway.app/vehicles/" + vehicle._id + "/update_km_run",
        method: "POST",
        withCredentials: true,
        data: {
          km: newKM,
        },
      });
    }
    GetVehicle(vehicle._id).then((data) => {
      setVehicle(data);
      let odometer_log = data.odometer_log;
      odometer_log.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOdometerLog(odometer_log);
    });
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetVehicle(id).then((data) => {
      setVehicle(data);
      let odometer_log = data.odometer_log;
      odometer_log.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOdometerLog(odometer_log);
    });
  }, [router.isReady]);

  return (
    <>
      <Head title="Vehicles List" />
      <main className={styles.main}>
        <Header />
        <SideBar />
        <main id="main" className="main col-10">
          <div className="row col-12">
            <div className="row">
              <div className="col">
                <h1>Odometer History</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Last Updated</th>
                      <th scope="col">Km Run</th>
                      <th scope="col">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {odometerLog.map((km_run, index) => {
                      return (
                        <tr key={index + 1}>
                          <th scope="row">
                            {km_run.date &&
                              dateFormat(
                                km_run.date,
                                "dS mmmm, yyyy - dddd h:MM:ss TT"
                              )}
                          </th>
                          <td>{km_run.km_run} km</td>
                          <td>
                            {km_run.km_diff >= 0 && (
                              <>
                                <span style={{ color: "green" }}>
                                  {km_run.km_diff} Km
                                </span>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col" style={{ borderLeft: "1px solid black" }}>
                <div className="mb-3 col-7 text-center">
                  <div>
                    <input
                      defaultValue={vehicle.total_kilo_meter}
                      onChange={(e) => {
                        handleKmChange(e);
                      }}
                      id="km_run"
                      type="number"
                      name="name"
                      className="form-control text-center"
                    />
                  </div>
                  <br />
                  <Button className="btn-success w-100" onClick={updateKmRun}>
                    UPDATE KM
                  </Button>
                  {kmLimitError && (
                    <div className="text-center" style={{ color: "red" }}>
                      Cannot Be Less Than : {vehicle.total_kilo_meter} Km
                    </div>
                  )}
                  <br />
                  <br />
                  <Link href={"/admin/vehicles/vehicle/" + vehicle._id}>
                    <Button className="btn-primary w-100">
                      BACK TO VEHICLE
                    </Button>
                  </Link>
                </div>
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
