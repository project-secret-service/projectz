import { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { GetVehicles } from "@/functions/apiHandlers/vehicles";
import dateFormat from "dateformat";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  chassisChecks,
  electricalChecks,
  engineChecks,
  lubricantsChecks,
  transmissionChecks,
} from "@/components/admin/inspection/checkBoxes";
import axios from "axios";

async function GetInspection(id) {
  const res = await axios({
    method: "get",
    url: `http://localhost:3000/inspection/${id}`,
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [inspection, setInspection] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetInspection(id).then((data) => {
      setInspection(data);
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={`Inspect Vehicle`}>
        <main
          id="main"
          className="col-lg-10 main opac-80"
          style={{
            marginTop: "-2rem",
          }}
        >
          <Row>
            <div className="col-lg-8 card p-3 m-1">
              <div>
                <div className="card-body">
                  <form>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        {" "}
                        <i class="bi bi-calendar-week"></i> Date
                      </label>
                      <div className="col-sm-7">
                        :{" "}
                        <b>
                          {inspection.date &&
                            dateFormat(inspection.date, "dS mmmm, yyyy")}
                        </b>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        <i class="bi bi-house-gear-fill"></i> Maintaining Unit
                      </label>
                      <div className="col-sm-7">
                        : <b>{inspection.maintaining_unit}</b>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        <i className="bi bi-car-front"></i> Vehicle Number
                      </label>
                      <div className="col-sm-7">
                        :{" "}
                        <b>
                          {" "}
                          {"CRP - ("}
                          {inspection.vehicle &&
                            inspection.vehicle.vehicle_crp_no}
                          {") "}-{" "}
                          {inspection.vehicle && inspection.vehicle.name} -{" "}
                          {inspection.vehicle &&
                            inspection.vehicle.registration_no}
                        </b>
                      </div>
                    </div>

                    <hr />
                    <div id="inspection_engine_section">
                      ENGINE :{" "}
                      {engineChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {!inspection.engine && (
                              <>
                                {item.label}{" "}
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={item.value}
                                  id={item.id}
                                  defaultChecked={item.defaultChecked}
                                  disabled
                                />
                              </>
                            )}
                            {inspection.engine &&
                              !(item.value in inspection.engine) && (
                                <>{item.label}</>
                              )}
                            {inspection.engine &&
                              item.value in inspection.engine && (
                                <span
                                  style={{
                                    color: "#9f0505db",
                                  }}
                                >
                                  {item.label}
                                </span>
                              )}
                            {inspection.engine &&
                              !(item.value in inspection.engine) && (
                                <>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item.value}
                                    id={item.id}
                                    defaultChecked={item.defaultChecked}
                                    disabled
                                  />
                                </>
                              )}
                          </label>
                        </div>
                      ))}
                      <div>
                        {inspection &&
                          inspection.engine &&
                          Object.entries(inspection.engine).map(
                            ([key, value]) => (
                              <div
                                className="form-check"
                                style={{ margin: "1rem" }}
                              >
                                {value.label} : <b> {value.description}</b>
                              </div>
                            )
                          )}
                      </div>
                    </div>

                    <hr />
                    <div id="inspection_transmission_section">
                      TRANSMISSION ETC. :{" "}
                      {transmissionChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {!inspection.transmission && (
                              <>
                                {item.label}{" "}
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={item.value}
                                  id={item.id}
                                  defaultChecked={item.defaultChecked}
                                  disabled
                                />
                              </>
                            )}
                            {inspection.transmission &&
                              !(item.value in inspection.transmission) && (
                                <>{item.label}</>
                              )}
                            {inspection.transmission &&
                              item.value in inspection.transmission && (
                                <span
                                  style={{
                                    color: "#9f0505db",
                                  }}
                                >
                                  {item.label}
                                </span>
                              )}
                            {inspection.transmission &&
                              !(item.value in inspection.transmission) && (
                                <>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item.value}
                                    id={item.id}
                                    defaultChecked={item.defaultChecked}
                                    disabled
                                  />
                                </>
                              )}
                          </label>
                        </div>
                      ))}
                      <div>
                        <div>
                          {inspection.transmission &&
                            Object.entries(inspection.transmission).map(
                              ([key, value]) => (
                                <div
                                  className="form-check"
                                  style={{ margin: "1rem" }}
                                >
                                  {value.label} : <b> {value.description}</b>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div id="inspection_electrical_section">
                      ELECTRICAL:{" "}
                      {electricalChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {!inspection.electrical && (
                              <>
                                {item.label}{" "}
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={item.value}
                                  id={item.id}
                                  defaultChecked={item.defaultChecked}
                                  disabled
                                />
                              </>
                            )}
                            {inspection.electrical &&
                              !(item.value in inspection.electrical) && (
                                <>{item.label}</>
                              )}
                            {inspection.electrical &&
                              item.value in inspection.electrical && (
                                <span
                                  style={{
                                    color: "#9f0505db",
                                  }}
                                >
                                  {item.label}
                                </span>
                              )}
                            {inspection.electrical &&
                              !(item.value in inspection.electrical) && (
                                <>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item.value}
                                    id={item.id}
                                    defaultChecked={item.defaultChecked}
                                    disabled
                                  />
                                </>
                              )}
                          </label>
                        </div>
                      ))}
                      <div>
                        {inspection.electrical &&
                          Object.entries(inspection.electrical).map(
                            ([key, value]) => (
                              <div
                                className="form-check"
                                style={{ margin: "1rem" }}
                              >
                                {value.label} : <b> {value.description}</b>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    <hr />
                    <div id="inspection_lubrication_section">
                      LUBRICATION & CLEANLINESS -{" "}
                      {lubricantsChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {!inspection.lubrication && (
                              <>
                                {item.label}{" "}
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={item.value}
                                  id={item.id}
                                  defaultChecked={item.defaultChecked}
                                  disabled
                                />
                              </>
                            )}
                            {inspection.lubrication &&
                              !(item.value in inspection.lubrication) && (
                                <>{item.label}</>
                              )}
                            {inspection.lubrication &&
                              item.value in inspection.lubrication && (
                                <span
                                  style={{
                                    color: "#9f0505db",
                                  }}
                                >
                                  {item.label}
                                </span>
                              )}
                            {inspection.lubrication &&
                              !(item.value in inspection.lubrication) && (
                                <>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item.value}
                                    id={item.id}
                                    defaultChecked={item.defaultChecked}
                                    disabled
                                  />
                                </>
                              )}
                          </label>
                        </div>
                      ))}
                      <div>
                        {inspection.lubrication &&
                          Object.entries(inspection.lubrication).map(
                            ([key, value]) => (
                              <div
                                className="form-check"
                                style={{ margin: "1rem" }}
                              >
                                {value.label} : <b> {value.description}</b>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    <hr />
                    <div id="inspection_chassis_section">
                      CHASSIS HULL BODY :{" "}
                      {chassisChecks.map((item) => (
                        <div
                          className="form-check"
                          style={{
                            display: "inline-block",
                            marginRight: "3rem",
                          }}
                          key={item.id}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={item.id}
                            style={{ display: "inline" }}
                          >
                            {!inspection.chassis && (
                              <>
                                {item.label}{" "}
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={item.value}
                                  id={item.id}
                                  defaultChecked={item.defaultChecked}
                                  disabled
                                />
                              </>
                            )}
                            {inspection.chassis &&
                              !(item.value in inspection.chassis) && (
                                <>{item.label}</>
                              )}
                            {inspection.chassis &&
                              item.value in inspection.chassis && (
                                <span
                                  style={{
                                    color: "#9f0505db",
                                  }}
                                >
                                  {item.label}
                                </span>
                              )}
                            {inspection.chassis &&
                              !(item.value in inspection.chassis) && (
                                <>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item.value}
                                    id={item.id}
                                    defaultChecked={item.defaultChecked}
                                    disabled
                                  />
                                </>
                              )}
                          </label>
                        </div>
                      ))}
                      <div>
                        {inspection.chassis &&
                          Object.entries(inspection.chassis).map(
                            ([key, value]) => (
                              <div
                                className="form-check"
                                style={{ margin: "1rem" }}
                              >
                                {value.label} : <b> {value.description}</b>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Tools & Accessories:
                      </label>
                      <div className="col-sm-7">
                        : <b>{inspection.tools_accessories}</b>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Marks and Action Taken by M.TO/Coy Commander/OC/Dett
                      </label>
                      <div className="col-sm-7">
                        : <b>{inspection.marks_and_actions}</b>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Road Test
                      </label>
                      <div className="col-sm-7">
                        : <b>{inspection.road_test}</b>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Special Fittings, Equipments, etc.
                      </label>
                      <div className="col-sm-7">
                        : <b>{inspection.special_fittings}</b>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Vehicle Records (Log Book, Inspection Report, etc.)
                      </label>
                      <div className="col-sm-7">
                        : <b>{inspection.vehicle_records}</b>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Inspection Remarks
                      </label>
                      <div className="col-sm-7">
                        : <b>{inspection.inspection_remarks}</b>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-3 card m-1 p-3">
              <Button
                variant="dark"
                onClick={() => {
                  Router.back();
                }}
              >
                BACK
              </Button>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
