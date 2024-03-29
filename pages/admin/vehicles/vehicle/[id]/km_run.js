import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetVehicle } from "@/functions/apiHandlers/vehicles";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [vehicle, setVehicle] = useState({});
  const [odometerLog, setOdometerLog] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetVehicle(id).then((data) => {
      if (data.status === 200) {
        let vehicle = data.vehicle;
        setVehicle(vehicle);
        let odometer_log = vehicle.odometer_log;
        odometer_log.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOdometerLog(odometer_log);
      }
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={`Odometer History`}>
        <main id="main" className="main col-11 mt-n2 opac-80">
          <div className="row col-12">
            <div className="row">
              <div className="col-8 card m-1 p-4">
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
                  className="btn-dark w-100"
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
      </AdminLayout>
    </>
  );
}
