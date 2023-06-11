import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetMemos, AddMemo } from "@/functions/apiHandlers/workshop";
import { GetVehicles } from "@/functions/apiHandlers/vehicles";
import { GetParts } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [memos, setMemos] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [defects, setDefects] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [displayParts, setDisplayParts] = useState(false);
  const [displayDefect, setDisplayDefect] = useState(false);
  const [displayJobWork, setDisplayJobWork] = useState(false);
  const [jobWorks, setJobWorks] = useState([]);
  const [jobWork, setJobWork] = useState({});
  const [memo, setMemo] = useState({});

  const parts_sno = useRef(null);
  const [parts, setParts] = useState([]);
  const jobworks_sno = useRef(null);
  const [part, setPart] = useState({});

  const defect_sno = useRef(null);
  const [defect, setDefect] = useState({
    slno: 1,
    name: "",
    reason: "",
    remedy_suggestion: "",
  });

  function SetPart(event) {
    setPart({
      ...part,
      [event.target.name]: event.target.value,
    });
  }

  function deletePart(index) {
    setSelectedParts(selectedParts.filter((part, i) => i !== index));
  }

  function AddPartToSelected(event) {
    let foundPart = parts.find((this_part) => this_part._id === part.id);
    let name = foundPart.name;
    let balance = foundPart.quantity;
    let newPart = {
      id: part.id,
      name: name,
      quantity: part.quantity,
      balance: balance,
      difference: parseInt(balance) - parseInt(part.quantity),
    };
    setSelectedParts([...selectedParts, newPart]);
    setPart({
      id: parts[0]._id,
      quantity: "",
    });
    displayParts ? setDisplayParts(false) : setDisplayParts(true);
  }

  function SetMemo(event) {
    setMemo({
      ...memo,
      [event.target.name]: event.target.value,
    });
  }

  function cancelJobWork() {
    setJobWork({
      name: "",
      description: "",
      amount: "",
    });
    displayJobWork ? setDisplayJobWork(false) : setDisplayJobWork(true);
  }

  function SetJobWork(event) {
    setJobWork({
      ...jobWork,
      [event.target.name]: event.target.value,
    });
  }

  function AddJobWork(event) {
    event.preventDefault();
    let newJobWork = {
      name: jobWork.name,
    };
    setJobWorks([...jobWorks, newJobWork]);
    setJobWork({
      name: "",
    });
    displayJobWork ? setDisplayJobWork(false) : setDisplayJobWork(true);
  }

  function showPartsFields() {
    displayParts ? setDisplayParts(false) : setDisplayParts(true);
  }

  function deleteJobWork(index) {
    setJobWorks(jobWorks.filter((jobWork, i) => i !== index));
  }

  function SetDefect(event) {
    setDefect({
      ...defect,
      [event.target.name]: event.target.value,
    });
  }

  function deleteDefect(index) {
    setDefects(defects.filter((defect, i) => i !== index));
  }

  function showDefectFields() {
    displayDefect ? setDisplayDefect(false) : setDisplayDefect(true);
  }

  function cancelPart() {
    setPart({
      id: parts[0]._id,
      quantity: "",
    });
    displayParts ? setDisplayParts(false) : setDisplayParts(true);
  }

  function cancelDefect() {
    setDefect({
      name: "",
      reason: "",
      remedy_suggestion: "",
    });
    displayDefect ? setDisplayDefect(false) : setDisplayDefect(true);
  }

  function AddDefect() {
    const thedefect = {
      name: defect.name,
      reason: defect.reason,
      remedy_suggestion: defect.remedy_suggestion,
    };
    setDefects([...defects, thedefect]);
    setDefect({
      name: "",
      reason: "",
      remedy_suggestion: "",
    });
    displayDefect ? setDisplayDefect(false) : setDisplayDefect(true);
  }

  function showJobWorkFields() {
    displayJobWork ? setDisplayJobWork(false) : setDisplayJobWork(true);
  }

  useEffect(() => {
    GetMemos().then((data) => {
      setMemos(data);
    });
    GetVehicles().then((data) => {
      setVehicles(data);
      setMemo({
        ...memo,
        vehicle: data[0]._id,
        date: new Date().toISOString().slice(0, 10),
      });
    });
    GetParts().then((data) => {
      setParts(data);
      setPart({
        id: data[0]._id,
        quantity: 0,
        name: data[0].name,
        balance: data[0].quantity,
        shortage: 0,
      });
    });
  }, []);

  return (
    <>
      <AdminLayout title={`Create Defect Memo`}>
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <h1>Create Defect Memo</h1>
          <Row>
            <div className="col-lg-8">
              <div className="card p-3">
                <div className="card-body">
                  <form
                    onSubmit={(event) => {
                      AddMemo(event, memo, selectedParts, defects, jobWorks);
                    }}
                  >
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Date :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={SetMemo}
                          defaultValue={dateFormat(new Date(), "yyyy-mm-dd")}
                          type="date"
                          name="date"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-3">Vehicle</label>
                      <div className="col-sm-7">
                        <select
                          name="vehicle"
                          className="form-select"
                          aria-label="Default select Example"
                          onChange={SetMemo}
                        >
                          {vehicles.map((vehicle, index) => (
                            <option key={index + 1} value={vehicle._id}>
                              CRP-{vehicle.vehicle_crp_no}{" "}
                              {vehicle.registration_no} ({vehicle.name})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Condition Of Engine :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={SetMemo}
                          type="text"
                          name="condition_of_engine"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className="p-3">
                        {defects[0] && (
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">Defect</th>
                                <th scope="col">Defect Reason</th>
                                <th scope="col">Remedy Suggestion</th>
                                <th
                                  style={{ textAlign: "center" }}
                                  className="col-1"
                                >
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {defects.map((defect, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{defect.name}</td>
                                  <td>{defect.reason}</td>
                                  <td>{defect.remedy_suggestion}</td>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      cursor: "pointer",
                                    }}
                                    className="col-1 bg-danger"
                                    onClick={() => deleteDefect(index)}
                                  >
                                    <span style={{ color: "white" }}>
                                      <i className="bi bi-trash"></i>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                      {displayDefect && (
                        <>
                          <div className="p-3 m-1">
                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Sl No :
                              </label>
                              <div className="col-sm-7">
                                <b ref={defect_sno}>{defects.length + 1}</b>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Defect :
                              </label>
                              <div className="col-sm-7">
                                <input
                                  onChange={SetDefect}
                                  type="text"
                                  name="name"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Defect Reason :
                              </label>
                              <div className="col-sm-7">
                                <input
                                  onChange={SetDefect}
                                  type="text"
                                  name="reason"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Remedy Suggestion :
                              </label>
                              <div className="col-sm-7">
                                <input
                                  onChange={SetDefect}
                                  type="text"
                                  name="remedy_suggestion"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div
                              className="mt-3"
                              style={{ textAlign: "right" }}
                            >
                              <Button
                                variant="success"
                                style={{ marginRight: "1rem" }}
                                onClick={AddDefect}
                              >
                                + Add Defect
                              </Button>

                              <Button variant="light" onClick={cancelDefect}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {!displayDefect && (
                      <div className="mt-3" style={{ textAlign: "right" }}>
                        <Button variant="success" onClick={showDefectFields}>
                          + Add Defect
                        </Button>
                      </div>
                    )}
                    <hr />
                    {selectedParts[0] && (
                      <div className="p-3">
                        {selectedParts[0] && (
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">Required Parts</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Availability</th>
                                <th
                                  style={{ textAlign: "center" }}
                                  className="col-1"
                                >
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedParts.map((part, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{part.name}</td>
                                  <td>{part.quantity}</td>
                                  <td>{part.balance}</td>
                                  {part.difference >= 0 && (
                                    <td style={{ color: "green" }}>
                                      Available
                                    </td>
                                  )}
                                  {part.difference < 0 && (
                                    <td style={{ color: "red" }}>
                                      Shortage :{-1 * part.difference}
                                    </td>
                                  )}

                                  <td
                                    style={{
                                      textAlign: "center",
                                      cursor: "pointer",
                                    }}
                                    className="col-1 bg-danger"
                                    onClick={() => deletePart(index)}
                                  >
                                    <span style={{ color: "white" }}>
                                      <i className="bi bi-trash"></i>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}
                    <div>
                      {displayParts && (
                        <>
                          <div className="p-3 m-1">
                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Sl No :
                              </label>
                              <div className="col-sm-7">
                                <b ref={parts_sno}>
                                  {selectedParts.length + 1}
                                </b>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label className="col-sm-3">Part Name</label>
                              <div className="col-sm-7">
                                <select
                                  name="id"
                                  onChange={SetPart}
                                  className="form-select"
                                  aria-label="Default select Example"
                                  defaultValue={part._id ? parts._id : ""}
                                >
                                  {parts.map((part, index) => (
                                    <option key={index} value={part._id}>
                                      {part.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Quantity :
                              </label>
                              <div className="col-sm-7">
                                <input
                                  onChange={SetPart}
                                  type="number"
                                  name="quantity"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div
                              className="mt-3"
                              style={{ textAlign: "right" }}
                            >
                              <Button
                                variant="success"
                                style={{ marginRight: "1rem" }}
                                onClick={AddPartToSelected}
                              >
                                + Add Part
                              </Button>

                              <Button variant="light" onClick={cancelPart}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {!displayParts && (
                      <div className="mt-3" style={{ textAlign: "right" }}>
                        <Button variant="success" onClick={showPartsFields}>
                          + Add Parts
                        </Button>
                      </div>
                    )}
                    <hr />

                    {jobWorks[0] && (
                      <div className="p-3">
                        {jobWorks[0] && (
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Job No</th>
                                <th scope="col">Job Works</th>
                                <th
                                  style={{ textAlign: "center" }}
                                  className="col-1"
                                >
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {jobWorks.map((job, index) => (
                                <tr key={index}>
                                  <th scope="row" className="col-2">
                                    {index + 1}
                                  </th>
                                  <td>{job.name}</td>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      cursor: "pointer",
                                    }}
                                    className="col-1 bg-danger"
                                    onClick={() => deleteJobWork(index)}
                                  >
                                    <span style={{ color: "white" }}>
                                      <i className="bi bi-trash"></i>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}
                    <div>
                      {displayJobWork && (
                        <>
                          <div className="p-3 m-1">
                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Job No :
                              </label>
                              <div className="col-sm-7">
                                <b ref={jobworks_sno}>{jobWorks.length + 1}</b>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Job :
                              </label>
                              <div className="col-sm-7">
                                <input
                                  onChange={SetJobWork}
                                  type="text"
                                  name="name"
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div
                              className="mt-3"
                              style={{ textAlign: "right" }}
                            >
                              <Button
                                variant="success"
                                style={{ marginRight: "1rem" }}
                                onClick={AddJobWork}
                              >
                                + Add Job Work
                              </Button>

                              <Button variant="light" onClick={cancelJobWork}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {!displayJobWork && (
                      <div className="mt-3" style={{ textAlign: "right" }}>
                        <Button variant="success" onClick={showJobWorkFields}>
                          + Add Parts
                        </Button>
                      </div>
                    )}

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Remarks :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={SetMemo}
                          type="text"
                          name="remarks"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-7">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ float: "right" }}
                        >
                          Create Defect Memo
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-3 card p-3">
              <Button
                className="mb-1"
                variant="dark"
                onClick={() => {
                  Router.back();
                }}
              >
                BACK
              </Button>
              <Button
                className="mb-1"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/");
                }}
              >
                Defect Memos
              </Button>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
