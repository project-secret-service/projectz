import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "@/pages/components/Header";
import SideBar from "@/pages/components/Sidebar";
import Scripts from "@/pages/components/Scripts";
import { useEffect, useState } from "react";
import Head from "@/pages/components/Head";
import { Button, Col, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetVehicle } from "@/functions/apiHandlers/vehicles";

export default function Home() {
  const [vehicle, setVehicle] = useState({});
  const [odometerLog, setOdometerLog] = useState([]);

  const router = useRouter();

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
        <main id="main" className="main col-10 mt-0 opac-80">
          <h1 className="josefin-sans">Odometer History</h1>
          <div className="row col-12">
            <div className="row">
              <div className="col-8 card m-1 p-5">
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
                                "dS mmmm, yyyy - DDDD h:MM TT"
                              )}
                          </th>
                          <td>{km_run.km_run} km</td>
                          <td>
                            {km_run.km_diff >= 0 && (
                              <>
                                <span style={{ color: "green" }}>
                                  +{km_run.km_diff} Km
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
              <div className="col-3 m-1 card p-3" style={{ maxHeight: "40vh" }}>
                <Button
                  className="btn-primary w-100"
                  onClick={() => {
                    router.back();
                  }}
                >
                  BACK
                </Button>
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
