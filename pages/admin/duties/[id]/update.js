import moment from "moment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UpdateDutyDetails, ActiveDuty } from "@/functions/apiHandlers/duties";
import AdminLayout from "@/pages/components/admin/AdminLayout";

export default function Home() {
  const [duty, setDuty] = useState({});
  const router = useRouter();

  async function SetAllDetails(id) {
    let data = await ActiveDuty(id);
    if (!data) return router.push("/admin/duties");
    setDuty(data);
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    SetAllDetails(id);
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={"Update Duty"}>
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
                      <b>
                        CRP-(
                        {duty.vehicle && duty.vehicle.vehicle_crp_no}){", "}
                        {duty.vehicle && duty.vehicle.registration_no}
                        {", "}
                        {duty.vehicle && duty.vehicle.name}
                      </b>
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
                          duty.vehicle && duty.vehicle.total_kilo_meter
                        }
                        min={duty.vehicle && duty.vehicle.total_kilo_meter}
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
                        defaultValue={duty.vehicle && duty.vehicle.fuel}
                        max={duty.vehicle && duty.vehicle.fuel_capacity}
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
        </main>
      </AdminLayout>
    </>
  );
}
