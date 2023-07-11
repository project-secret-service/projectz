import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetMemos, AddMemo } from "@/functions/apiHandlers/workshop";
import { GetVehicles } from "@/functions/apiHandlers/vehicles";
import { GetParts } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const [inspection, setInspection] = useState({});
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

  async function GetInspection(id) {
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/inspection/" + id,
      withCredentials: true,
    });
    return res.data;
  }

  async function GetLastMemoSlNo() {
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/defectmemos/lastslno",
      withCredentials: true,
    });
    return res.data;
  }

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
    let foundInSelectedParts = selectedParts.find(
      (selectedPart) => selectedPart.id == part.id
    );
    if (foundInSelectedParts) {
      alert("Part Already Added");
      return;
    }
    let foundPart = parts.find((this_part) => this_part._id === part.id);
    let name = foundPart.name;
    let balance = foundPart.balance;
    let newPart = {
      id: part.id,
      name: name,
      quantity: part.quantity,
      unit: foundPart.smallest_unit.name,
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
    if (defect.name == "" || defect.reason == "") {
      alert("Please Fill All The Fields");
      return;
    }
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

  async function setInitials(id) {
    const inspection = await GetInspection(id);
    setInspection(inspection);

    let default_defects = [];
    for (let key in inspection) {
      if (
        key == "engine" ||
        key == "transmission" ||
        key == "chassis" ||
        key == "electrical" ||
        key == "lubrication"
      ) {
        for (let key2 in inspection[key]) {
          let defect = inspection[key][key2];
          console.log(defect.label.split(". ")[1] + ": " + defect.description);
          default_defects.push({
            name: defect.label.split(". ")[1] + ": " + defect.description,
            reason: "",
            remedy_suggestion: "",
          });
        }
      }
    }

    setDefects(default_defects);

    const last_slno = await GetLastMemoSlNo();
    setMemo({
      ...memo,
      slno: last_slno + 1,
      memo_no:
        "DM/" +
        new Date().toISOString().slice(0, 4) +
        "/" +
        new Date().toISOString().slice(5, 7) +
        "/" +
        (last_slno + 1).toString().padStart(5, "0"),
      vehicle: inspection.vehicle._id,
      vehicle_name: `CRP-${inspection.vehicle.vehicle_crp_no}
      ${inspection.vehicle.registration_no} (${inspection.vehicle.name})`,
      date: new Date().toISOString().slice(0, 10),
    });

    const parts = await GetParts();
    setParts(parts);
    setPart({
      id: parts[0]._id,
      quantity: 0,
      name: parts[0].name,
      balance: parts[0].quantity,
      shortage: 0,
    });
  }

  function EditDefect(index) {
    setDefect({
      name: defects[index].name,
      reason: defects[index].reason,
      remedy_suggestion: defects[index].remedy_suggestion,
    });

    console.log({
      name: defects[index].name,
      reason: defects[index].reason,
      remedy_suggestion: defects[index].remedy_suggestion,
    });
    setDisplayDefect(true);
    setDefects(defects.filter((defect, i) => i !== index));
  }

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    setInitials(id);
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={`Create Defect Memo`}>
        <main id="main" className="col-lg-11 main mt-n2 opac-80">
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
                        Memo No :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={SetMemo}
                          defaultValue={memo.memo_no}
                          type="text"
                          name="memo_no"
                          className="form-control"
                        />
                      </div>
                    </div>

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
                      <label className="col-sm-3">Vehicle :</label>
                      <div className="col-sm-7">
                        <b>{memo.vehicle_name}</b>
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
                      <div>
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
                                  Edit
                                </th>
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
                                    className="col-1 bg-warning"
                                    onClick={() => EditDefect(index)}
                                  >
                                    <span style={{ color: "white" }}>
                                      <i class="bi bi-pencil-square"></i>
                                    </span>
                                  </td>
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
                                  defaultValue={defect.name}
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
                                  defaultValue={defect.reason}
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
                                  defaultValue={defect.remedy_suggestion}
                                  type="text"
                                  name="remedy_suggestion"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
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
                      <div style={{ textAlign: "right" }}>
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
                                  <td>
                                    {part.quantity} {part.unit}
                                  </td>
                                  <td>
                                    {part.balance} {part.unit}
                                  </td>
                                  {part.difference >= 0 && (
                                    <td style={{ color: "green" }}>
                                      Available
                                    </td>
                                  )}
                                  {part.difference < 0 && (
                                    <td style={{ color: "red" }}>
                                      Shortage :{-1 * part.difference}{" "}
                                      {part.unit}
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
                          + Add Jobs
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
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections");
                }}
              >
                <i className="bi bi-card-checklist"></i> Inspections
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections/add");
                }}
              >
                <i className="bi bi-plus-circle"></i> Add Inspection Report
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/");
                }}
              >
                <i className="bi bi-card-list"></i> Defect Memos
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards");
                }}
              >
                <i className="bi bi-credit-card-2-front"></i> Job Cards
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards/add");
                }}
              >
                <i className="bi bi-plus-circle"></i> Add Job Card
              </Button>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
