import { useRef, useEffect, useState } from "react";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetVehicles } from "@/functions/apiHandlers/vehicles";
import { GetParts } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [card, setCard] = useState({});
  const [fetchedParts, setFetchedParts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [parts, setParts] = useState([]);
  const [part, setPart] = useState({
    id: "",
    quantity: "",
  });

  const quantityRef = useRef(null);
  const [selectedPartIDs, setSelectedPartIDs] = useState(new Set());
  const [showPartsFields, setShowPartsFields] = useState(false);

  async function createJobCard(event) {
    event.preventDefault();
  }

  function ShowPartsFields() {
    setShowPartsFields(true);
  }

  function SetPart(event) {
    setPart({
      ...part,
      [event.target.name]: event.target.value,
    });
  }

  function AddPartToUsedParts() {
    if (selectedPartIDs.has(part.id)) {
      alert("Part already added");
      return;
    }
    setSelectedPartIDs(new Set([...selectedPartIDs, part.id]));
    let foundPart = fetchedParts.find((p) => p._id == part.id);
    part.name = foundPart ? foundPart.name : "";
    part.balance = foundPart ? foundPart.quantity : "";
    if (part.quantity > part.balance) {
      alert("Quantity is greater Than Balance");
      return;
    }
    setParts([...parts, part]);
    setPart({
      id: part.id,
      quantity: "",
    });
    setShowPartsFields(false);
  }

  function CancelAddPart() {
    setShowPartsFields(false);
  }

  useEffect(() => {
    GetVehicles().then((data) => {
      setVehicles(data);
    });
    GetParts().then((data) => {
      setFetchedParts(data);
      setPart({
        ...part,
        id: data[0]._id,
        quantity: 0,
        balance: data[0].quantity,
      });
    });
  }, []);

  return (
    <>
      <AdminLayout title={`Create Job Card`}>
        <main
          id="main"
          className="col-lg-11 main opac-90"
          style={{
            marginTop: "-2rem",
          }}
        >
          <Row>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={createJobCard}>
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Date :
                      </label>
                      <div className="col-sm-7">
                        <input
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
                        Mechanic Name :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="mechanic_name"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Particular Work :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="particular_work"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Part</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" className="col-1 text-center">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {parts.map((part, index) => (
                            <tr key={index + 1}>
                              <th scope="row">{index + 1}</th>
                              <td>{part.name}</td>
                              <td>{part.quantity}</td>
                              <td className="col-1 text-center">
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    let newParts = parts.filter(
                                      (p) => p.id != part.id
                                    );
                                    setParts(newParts);
                                    let newSelectedPartIDs = new Set(
                                      selectedPartIDs
                                    );
                                    newSelectedPartIDs.delete(part.id);
                                    setSelectedPartIDs(newSelectedPartIDs);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {showPartsFields && (
                      <div className="row mb-3">
                        <label className="col-sm-3">Parts Used : </label>
                        <div className="col-sm-7">
                          <select
                            onChange={SetPart}
                            name="id"
                            className="form-select"
                            aria-label="Default select Example"
                          >
                            {fetchedParts.map((part, index) => (
                              <option key={index + 1} value={part._id}>
                                {part.name} (Bal: {part.quantity})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-sm-2">
                          <input
                            onChange={SetPart}
                            ref={quantityRef}
                            type="number"
                            name="quantity"
                            className="form-control"
                            placeholder="Quantity"
                          />
                        </div>
                      </div>
                    )}

                    <div style={{ textAlign: "right" }}>
                      {!showPartsFields && (
                        <Button
                          className="btn-success"
                          onClick={ShowPartsFields}
                        >
                          + Add Used Part
                        </Button>
                      )}
                      {showPartsFields && (
                        <>
                          <Button
                            className="btn-success"
                            style={{ marginRight: "10px" }}
                            onClick={AddPartToUsedParts}
                          >
                            + Add Part
                          </Button>
                          <Button
                            className="btn-danger"
                            onClick={CancelAddPart}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                    <br />
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Work Order Number :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="work_order_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Remarks :
                      </label>
                      <div className="col-sm-7">
                        <input
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
                          + Create Job Card
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="card col-3 p-3">
              <button
                className="btn btn-dark mb-1"
                style={{ float: "left" }}
                onClick={() => Router.back()}
              >
                BACK
              </button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections");
                }}
              >
                <i class="bi bi-card-checklist"></i> Inspections
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections/add");
                }}
              >
                <i class="bi bi-plus-circle"></i> Add Inspection Report
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/");
                }}
              >
                <i class="bi bi-card-list"></i> Defect Memos
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/add");
                }}
              >
                <i class="bi bi-plus-circle"></i> Add Memo
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards");
                }}
              >
                <i class="bi bi-credit-card-2-front"></i> Job Cards
              </Button>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
