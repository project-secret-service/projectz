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

function setFuel(fuel, fuelCapacity) {
  if (fuel <= fuelCapacity) {
    let fuelPercentage = ((fuel / fuelCapacity) * 100).toFixed(2);
    const fuelPercent = document.getElementById("fuel_percentage");
    fuelPercent.innerText = fuelPercentage + "%";
    const fuelDetails = document.getElementById("fuel_details");
    fuelDetails.innerText = fuel + "L/" + fuelCapacity + "L";
    document.querySelectorAll(".fuel-box")[0].children[1].style.height =
      100 - fuelPercentage + "%";
    document.querySelectorAll(".fuel-box")[0].children[2].style.height =
      fuelPercentage + "%";
    if (fuelPercentage <= 20) {
      document.querySelectorAll(
        ".fuel-box"
      )[0].children[2].style.backgroundColor = "red";
    } else {
      document.querySelectorAll(
        ".fuel-box"
      )[0].children[2].style.backgroundColor = "#80ff00";
    }
  }
}

async function GetVehicle(id) {
  const res = await axios({
    url: "http://localhost:3000/vehicles/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [vehicle, setVehicle] = useState({});
  const [fuelLog, setFuelLog] = useState([]);
  const [fuelLimitError, setFuelLimitError] = useState(false);

  const router = useRouter();

  function handleFuelChange({ target: { name, value } }) {
    if (parseFloat(value) > vehicle.fuel_capacity) {
      setFuelLimitError(true);
    } else {
      setFuelLimitError(false);
    }
  }
  async function updateFuel() {
    let newFuel = document.getElementById("new_fuel").value;
    const res = await axios({
      url: "http://localhost:3000/vehicles/" + vehicle._id + "/fuel_update",
      method: "POST",
      withCredentials: true,
      data: {
        fuel: newFuel,
      },
    });
    setFuel(parseFloat(newFuel), vehicle.fuel_capacity);
    GetVehicle(vehicle._id).then((data) => {
      setVehicle(data);
      let fuel_log = data.fuel_log;
      fuel_log.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFuelLog(fuel_log);
      setFuel(data.fuel, data.fuel_capacity);
    });
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetVehicle(id).then((data) => {
      setVehicle(data);
      let fuel_log = data.fuel_log;
      fuel_log.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFuelLog(fuel_log);
      setFuel(data.fuel, data.fuel_capacity);
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
                <h1>Fuel History</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Last Updated</th>
                      <th scope="col">Fuel</th>
                      <th scope="col">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fuelLog.map((fuel, index) => {
                      return (
                        <tr key={index + 1}>
                          <th scope="row">
                            {fuel.date &&
                              dateFormat(
                                fuel.date,
                                "dS mmmm, yyyy - dddd h:MM:ss TT"
                              )}
                          </th>
                          <td>{fuel.current_fuel} L</td>
                          <td>
                            {fuel.fuel_diff < 0 && (
                              <>
                                <span style={{ color: "red" }}>
                                  {fuel.fuel_diff} L
                                </span>
                              </>
                            )}
                            {fuel.fuel_diff >= 0 && (
                              <>
                                <span style={{ color: "green" }}>
                                  {fuel.fuel_diff} L
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
                <div className="row p-3">
                  <div
                    className={`${vehicle_styles.fuel_box} col-4 p-2 m-1 fuel-box text-center`}
                    style={{ height: "400px" }}
                  >
                    <div className={vehicle_styles.fuel_text}>
                      Fuel
                      <p id="fuel_percentage">50%</p>
                      <p id="fuel_details"></p>
                    </div>
                    <div className={vehicle_styles.fuel_empty}> </div>
                    <div className={vehicle_styles.fuel_percent}> </div>
                  </div>
                  <div className="mb-3 col-7 text-center">
                    <div>
                      <input
                        onChange={(e) => {
                          handleFuelChange(e);
                        }}
                        id="new_fuel"
                        type="number"
                        name="name"
                        className="form-control"
                      />
                    </div>
                    <br />
                    <Button className="btn-success w-100" onClick={updateFuel}>
                      UPDATE FUEL
                    </Button>
                    {fuelLimitError && (
                      <div className="text-center" style={{ color: "red" }}>
                        Fuel Limit : {vehicle.fuel_capacity} L
                      </div>
                    )}
                    <br />
                    <br/>
                    <Link href={"/admin/vehicles/vehicle/" + vehicle._id}>
                      <Button
                        className="btn-primary w-100"
                        onClick={updateFuel}
                      >
                        BACK TO VEHICLE
                      </Button>
                    </Link>
                  </div>
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
