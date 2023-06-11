import { useEffect, useState, useRef } from "react";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import {
  GetDuties,
  OpenDuty,
  GetDutiesFromDates,
} from "@/functions/apiHandlers/duties";
import Router from "next/router";
import { useReactToPrint } from "react-to-print";
import AdminLayout from "@/pages/components/admin/AdminLayout";
export default function Home() {
  const [duties, setDuties] = useState([]);
  const [ascending, setAscending] = useState(false);

  const printList = useRef(null);
  const dateFrom = useRef(null);
  const dateTo = useRef(null);

  const handleDateChange = (e) => {
    var from = dateFrom.current.value;
    var to = dateTo.current.value;
    GetDutiesFromDates(from, to).then((data) => {
      setDuties(data);
      setAscending(false);
    });
  };
  const handlePrint = useReactToPrint({
    content: () => printList.current,
  });

  useEffect(() => {
    GetDuties().then((data) => {
      if (Array.isArray(data) && data.length != 0) setDuties(data);
    });
  }, []);

  return (
    <>
      <AdminLayout title="Duties">
        <main id="main" className=" col-lg-11 main mt-0 opac-80">
          <div className="d-flex justify-content-between">
            <h1>All Duties</h1>

            <div className="d-flex" style={{ display: "inline" }}>
              <div style={{ marginRight: "10px" }}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-primary text-white"
                      id="basic-addon1"
                    >
                      From
                    </span>
                  </div>
                  <input
                    defaultValue={
                      duties[0] &&
                      dateFormat(duties[0].out_datetime, "yyyy-mm-dd")
                    }
                    ref={dateFrom}
                    type="date"
                    onChange={handleDateChange}
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>

              <div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-primary text-white"
                      id="basic-addon1"
                    >
                      To :
                    </span>
                  </div>
                  <input
                    type="date"
                    defaultValue={
                      duties[duties.length - 1] &&
                      dateFormat(
                        duties[duties.length - 1].out_datetime,
                        "yyyy-mm-dd"
                      )
                    }
                    ref={dateTo}
                    onChange={handleDateChange}
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div>
              {!ascending && (
                <Button
                  className="btn-warning"
                  onClick={() => {
                    setAscending(true);
                    setDuties(duties.reverse());
                  }}
                  style={{ marginRight: "1rem" }}
                >
                  <i className="bi bi-sort-up-alt"></i>
                  ASCENDING
                </Button>
              )}
              {ascending && (
                <Button
                  className="btn-warning"
                  onClick={() => {
                    setAscending(false);
                    setDuties(duties.reverse());
                  }}
                  style={{ marginRight: "1rem" }}
                >
                  <i className="bi bi-sort-down"></i>
                  DESCENDING
                </Button>
              )}
            </div>
            <div>
              <Button
                className="btn-success"
                onClick={handlePrint}
                style={{ marginRight: "1rem" }}
              >
                Print Duty Log
              </Button>
              <Button
                className="btn-dark"
                onClick={() => {
                  Router.back();
                }}
              >
                Back
              </Button>
            </div>
          </div>
          <Row>
            <div className="col-lg-12 m-1">
              <div className="card opac-90">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col" className="col-2">
                          Date
                        </th>
                        <th scope="col" className="col-2">
                          Duty
                        </th>
                        <th scope="col" className="col-2">
                          Vehicle
                        </th>
                        <th scope="col">KM</th>
                        <th scope="col">Bill No</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-center">
                          SignBy <br />
                          Hav/POL
                        </th>
                        <th scope="col" className="text-center">
                          Sign By <br />
                          MT/IC
                        </th>
                        <th scope="col" className="text-center">
                          Sign By <br />
                          MTO
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {duties.map((duty, index) => {
                        var mission = duty.mission_ended;
                        let color = "#D0F5BE";
                        let textColor = "#0C134F";
                        var v1;
                        if (mission) {
                          v1 = "Completed";
                          color = "#FBFFDC";
                          textColor = "green";
                        } else {
                          v1 = "Active";
                        }
                        return (
                          <tr
                            key={index + 1}
                            onClick={() => OpenDuty(duty._id)}
                          >
                            <td scope="row">
                              {duty.out_datetime &&
                                dateFormat(duty.out_datetime, "dS mmmm, yyyy")}
                            </td>
                            <td scope="row">{duty.purpose && duty.purpose}</td>

                            <td>
                              <b>
                                {duty.vehicle && duty.vehicle.registration_no},{" "}
                                {duty.vehicle && duty.vehicle.name}, CRP -(
                                {duty.vehicle && duty.vehicle.vehicle_crp_no})
                              </b>
                            </td>
                            <td scope="row">{duty.km_run && duty.km_run} km</td>
                            <td></td>
                            <td style={{ color: textColor }}>
                              {v1 === "Active" && (
                                <>
                                  <span className="blinking">Active</span>
                                </>
                              )}
                              {v1 === "Completed" && (
                                <>
                                  <span>Completed</span>
                                </>
                              )}
                            </td>

                            <td className="text-center">
                              {duty.sign_indenter && (
                                <>
                                  <b>{duty.sign_indenter.name}</b>
                                  <br />
                                  {duty.sign_indenter.designation}
                                </>
                              )}
                              {!duty.sign_indenter && (
                                <span style={{ color: "red" }}>
                                  <i className="bi bi-exclamation-diamond"></i>
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              {duty.sign_mtic && (
                                <>
                                  <b>{duty.sign_mtic.name}</b>
                                  <br />
                                  {duty.sign_mtic.designation}
                                </>
                              )}
                              {!duty.sign_mtic && (
                                <span style={{ color: "red" }}>
                                  <i className="bi bi-exclamation-diamond"></i>
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              {duty.sign_mto && (
                                <>
                                  <b>{duty.sign_mto.name}</b>
                                  <br />
                                  {duty.sign_mto.designation}
                                </>
                              )}
                              {!duty.sign_mto && (
                                <span style={{ color: "red" }}>
                                  <i className="bi bi-exclamation-diamond"></i>
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-12 m-1" style={{ display: "none" }}>
              <div
                className="card opac-90"
                style={{
                  fontSize: "0.7rem",
                }}
                ref={printList}
              >
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col" className="col-1">
                          Date
                        </th>
                        <th scope="col" className="col-2">
                          Duty
                        </th>
                        <th scope="col" className="col-2">
                          Vehicle
                        </th>
                        <th scope="col">KM</th>
                        <th scope="col">Bill No</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-center">
                          SignBy <br />
                          Hav/POL
                        </th>
                        <th scope="col" className="text-center">
                          Sign By <br />
                          MT/IC
                        </th>
                        <th scope="col" className="text-center">
                          Sign By <br />
                          MTO
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {duties.map((duty, index) => {
                        var mission = duty.mission_ended;
                        let color = "#D0F5BE";
                        let textColor = "#0C134F";
                        var v1;
                        if (mission) {
                          v1 = "Completed";
                          color = "#FBFFDC";
                          textColor = "green";
                        } else {
                          v1 = "Active";
                        }
                        return (
                          <tr
                            key={index + 1}
                            onClick={() => OpenDuty(duty._id)}
                          >
                            <td scope="row">
                              {duty.out_datetime &&
                                dateFormat(duty.out_datetime, "dS mmmm, yyyy")}
                            </td>
                            <td scope="row">{duty.purpose && duty.purpose}</td>

                            <td>
                              <b>
                                {duty.vehicle && duty.vehicle.registration_no},{" "}
                                {duty.vehicle && duty.vehicle.name}, CRP -(
                                {duty.vehicle && duty.vehicle.vehicle_crp_no})
                              </b>
                            </td>
                            <td scope="row">{duty.km_run && duty.km_run} km</td>
                            <td></td>
                            <td style={{ color: textColor }}>
                              {v1 === "Active" && (
                                <>
                                  <span className="blinking">Active</span>
                                </>
                              )}
                              {v1 === "Completed" && (
                                <>
                                  <span>Completed</span>
                                </>
                              )}
                            </td>

                            <td className="text-center">
                              {duty.sign_indenter && (
                                <>
                                  <b>{duty.sign_indenter.name}</b>
                                  <br />
                                  {duty.sign_indenter.designation}
                                </>
                              )}
                              {!duty.sign_indenter && (
                                <span style={{ color: "red" }}>
                                  <i className="bi bi-exclamation-diamond"></i>
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              {duty.sign_mtic && (
                                <>
                                  <b>{duty.sign_mtic.name}</b>
                                  <br />
                                  {duty.sign_mtic.designation}
                                </>
                              )}
                              {!duty.sign_mtic && (
                                <span style={{ color: "red" }}>
                                  <i className="bi bi-exclamation-diamond"></i>
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              {duty.sign_mto && (
                                <>
                                  <b>{duty.sign_mto.name}</b>
                                  <br />
                                  {duty.sign_mto.designation}
                                </>
                              )}
                              {!duty.sign_mto && (
                                <span style={{ color: "red" }}>
                                  <i className="bi bi-exclamation-diamond"></i>
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
