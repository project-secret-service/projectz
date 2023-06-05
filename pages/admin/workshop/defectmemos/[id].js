import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import HeadAndSideBar from "@/pages/components/admin/HeadAndSideBar";
import Scripts from "@/pages/components/Scripts";
import { useEffect, useState, useRef, memo } from "react";
import axios from "axios";
import Router from "next/router";
import { Button, Row, Modal } from "react-bootstrap";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";

async function GetMemo(id) {
  const res = await axios({
    url: "http://localhost:3000/defectmemos/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function GetUserDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/defectmemos/" + id,
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

const SignatureModal = ({
  signAs,
  signTitle,
  showSign,
  setShowSign,
  memo,
  setMemo,
}) => {
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState("");
  function SetP(e) {
    setWrongPass("");
    setPassword(e.target.value);
  }
  return (
    <Modal
      show={showSign}
      onHide={() => setShowSign(false)}
      dialogClassName="modal-90w"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{signTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3">
          <label htmlFor="inputText" className="col-sm-5 col-form-label">
            Password :
          </label>
          <div className="col-sm-7">
            <input
              onChange={SetP}
              type="password"
              name="password"
              className="form-control"
            />
          </div>
        </div>
        <div
          className="row mb-3"
          style={{ justifyContent: "center", color: "red" }}
        >
          {wrongPass}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowSign(false)}>
          Close
        </Button>{" "}
        <Button
          variant="primary"
          onClick={async () => {
            const res = await axios({
              url: "http://localhost:3000/defectmemos/sign/add/" + signAs,
              withCredentials: true,
              method: "POST",
              data: {
                memoID: memo._id,
                password: password,
              },
            });
            if (res.data.status === 200) {
              GetUserDetails(memo._id).then((data) => {
                setMemo(data);
              });
              setShowSign(false);
            } else {
              setWrongPass("Wrong Password");
            }
          }}
        >
          Add Signature
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function Home() {
  const [defects, setDefects] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const [jobWorks, setJobWorks] = useState([]);
  const [memo, setMemo] = useState({});
  const [showSign, setShowSign] = useState(false);
  const [signTitle, setSignTitle] = useState("");
  const [signAs, setSignAs] = useState("");

  function showModal() {
    setShowSign(true);
  }

  const router = useRouter();

  const printCard = useRef();

  const handlePrint = useReactToPrint({
    content: () => printCard.current,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetMemo(id).then((data) => {
      setMemo(data);
      setDefects(data.defects);
      setJobWorks(data.job_works);
      setSelectedParts(data.parts);
      setVehicle(data.vehicle);
      console.log(data.vehicle);
    });
  }, [router.isReady]);

  return (
    <>
      <main className={styles.main}>
        <HeadAndSideBar title={"Defect Memo"} />
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <div className="d-flex justify-content-between">
            <h3>Defect Memo</h3>
            <div>
              {!memo.sign_simm && (
                <Button
                  variant="light"
                  onClick={() => {
                    setSignAs("sign_simm");
                    setSignTitle("Sign as SI/MM");
                    setShowSign(true);
                  }}
                  style={{ marginRight: "2rem" }}
                >
                  Sign as SI/MM
                </Button>
              )}
              {!memo.sign_mto && (
                <Button
                  variant="light"
                  onClick={() => {
                    setSignAs("sign_mto");
                    setSignTitle("Sign as MTO");
                    setShowSign(true);
                  }}
                  style={{ marginRight: "2rem" }}
                >
                  Sign as MTO
                </Button>
              )}

              <SignatureModal
                signTitle={signTitle}
                signAs={signAs}
                showSign={showSign}
                setShowSign={setShowSign}
                memo={memo}
                setMemo={setMemo}
              />
              <Button
                variant="primary"
                onClick={handlePrint}
                style={{ marginRight: "2rem" }}
              >
                Print Defect Memo
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  Router.back();
                }}
              >
                BACK
              </Button>
            </div>
          </div>

          <Row>
            <div className="col-lg-12">
              <div className="card p-3">
                <div
                  className="text-center"
                  style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
                >
                  CENTRAL RESERVE POLICE FORCE - M.T. WORKSHOP
                  <br />
                </div>
                <div
                  className="text-center"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bolder",
                    marginBottom: "1.5rem",
                  }}
                >
                  DEFECT MEMO
                  <br />
                </div>
                <div className="card-body">
                  <div>
                    <div class="row">
                      <div class="col">
                        <p>
                          Memo No : <b>{memo._id}</b>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          CRP No : <b>{vehicle.vehicle_crp_no}</b>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          Vehicle No : <b>{vehicle.registration_no}</b>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          Vehicle Name : <b>{vehicle.name}</b>
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p>
                          Date :{" "}
                          <b>{dateFormat(memo.date, "dS mmmm, yyyy - dddd")}</b>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          Model : <b>{vehicle.model}</b>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          Make : <b>{vehicle.make}</b>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          Type: <b>{vehicle.vehicle_type}</b>
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        Kilometer Run : <b>{vehicle.total_kilo_meter} km</b>
                        <br />
                        Condition Of Engine : <b>{memo.condition_of_engine}</b>
                      </div>
                      <div class="col"></div>
                      <div class="col"></div>
                      <div class="col"></div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-3"></label>
                    <div className="col-sm-7"></div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-6">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Defect</th>
                            <th scope="col">Defect Reason</th>
                            <th scope="col">Remedy Suggestion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {defects.map((defect, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{defect.name}</td>
                              <td>{defect.reason}</td>
                              <td>{defect.remedy_suggestion}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-6">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Required Parts</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Availability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedParts.map((part, index) => (
                            <tr key={index}>
                              <td>
                                ({index + 1}) {part.name}
                              </td>
                              <td>{part.quantity}</td>
                              <td>{part.balance}</td>
                              {part.difference >= 0 && (
                                <td style={{ color: "green" }}>Available</td>
                              )}
                              {part.difference < 0 && (
                                <td style={{ color: "red" }}>
                                  Shortage :{-1 * part.difference}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr />
                  {jobWorks.length != 0 && (
                    <div className="col-12">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Job No</th>
                            <th scope="col">Job Works</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobWorks.map((job, index) => (
                            <tr key={index}>
                              <th scope="row" className="col-2">
                                {index + 1}
                              </th>
                              <td className="col-8">{job.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {jobWorks.length == 0 && (
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-1">
                        Job Works :
                      </label>
                      <div className="col-sm-7">
                        <b>No Job Works</b>
                      </div>
                    </div>
                  )}

                  <div className="row mb-3">
                    <div className="col-sm-7">
                      Remarks : <b>{memo.remarks}</b>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around text-center">
                  <div>
                    {memo.sign_simm && (
                      <>
                        <p>
                          Digitally Signed By <br />
                          <b>
                            {memo.sign_simm.name} <br />
                          </b>
                          {memo.sign_simm.designation}
                        </p>
                      </>
                    )}
                    {!memo.sign_simm && (
                      <>
                        <p>
                          Signature <br />
                          Designation
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    {memo.sign_mto && (
                      <>
                        <p>
                          {" "}
                          Digitally Signed By <br />
                          <b>
                            {memo.sign_mto.name} <br />
                          </b>
                          {memo.sign_mto.designation}
                        </p>
                      </>
                    )}
                    {!memo.sign_mto && (
                      <>
                        <p>
                          Signature <br />
                          Designation
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <div style={{ display: "none" }}>
            <div className="card p-3" ref={printCard}>
              <div
                className="text-center"
                style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
              >
                CENTRAL RESERVE POLICE FORCE - M.T. WORKSHOP
                <br />
              </div>
              <div
                className="text-center"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bolder",
                  marginBottom: "1.5rem",
                }}
              >
                DEFECT MEMO
                <br />
              </div>
              <div
                className="card-body"
                style={{
                  fontSize: "0.8rem",
                }}
              >
                <div>
                  <div class="row">
                    <div class="col">
                      <p>
                        Memo No : <b>{memo._id}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        CRP No : <b>{vehicle.vehicle_crp_no}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        Vehicle No : <b>{vehicle.registration_no}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        Vehicle Name : <b>{vehicle.name}</b>
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p>
                        Date :{" "}
                        <b>{dateFormat(memo.date, "dS mmmm, yyyy - dddd")}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        Model : <b>{vehicle.model}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        Make : <b>{vehicle.make}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        Type: <b>{vehicle.vehicle_type}</b>
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      Kilometer Run : <b>{vehicle.total_kilo_meter} km</b>
                      <br />
                      Condition Of Engine : <b>{memo.condition_of_engine}</b>
                    </div>
                    <div class="col"></div>
                    <div class="col"></div>
                    <div class="col"></div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-3"></label>
                  <div className="col-sm-7"></div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl No</th>
                          <th scope="col">Defect</th>
                          <th scope="col">Defect Reason</th>
                          <th scope="col">Remedy Suggestion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {defects.map((defect, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{defect.name}</td>
                            <td>{defect.reason}</td>
                            <td>{defect.remedy_suggestion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-6">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Required Parts</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Balance</th>
                          <th scope="col">Availability</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedParts.map((part, index) => (
                          <tr key={index}>
                            <td>
                              ({index + 1}) {part.name}
                            </td>
                            <td>{part.quantity}</td>
                            <td>{part.balance}</td>
                            {part.difference >= 0 && (
                              <td style={{ color: "green" }}>Available</td>
                            )}
                            {part.difference < 0 && (
                              <td style={{ color: "red" }}>
                                Shortage :{-1 * part.difference}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr />
                {jobWorks.length != 0 && (
                  <div className="col-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Job No</th>
                          <th scope="col">Job Works</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobWorks.map((job, index) => (
                          <tr key={index}>
                            <th scope="row" className="col-2">
                              {index + 1}
                            </th>
                            <td className="col-8">{job.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {jobWorks.length == 0 && (
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-1">
                      Job Works :
                    </label>
                    <div className="col-sm-7">
                      <b>No Job Works</b>
                    </div>
                  </div>
                )}

                <div className="row mb-3">
                  <div className="col-sm-7">
                    Remarks : <b>{memo.remarks}</b>
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-around text-center"
                style={{
                  fontSize: "0.8rem",
                }}
              >
                <div>
                  {memo.sign_simm && (
                    <>
                      <p>
                        Digitally Signed By <br />
                        <b>
                          {memo.sign_simm.name} <br />
                        </b>
                        {memo.sign_simm.designation}
                      </p>
                    </>
                  )}
                  {!memo.sign_simm && (
                    <>
                      <p>
                        Signature <br />
                        Designation
                      </p>
                    </>
                  )}
                </div>
                <div>
                  {memo.sign_mto && (
                    <>
                      <p>
                        {" "}
                        Digitally Signed By <br />
                        <b>
                          {memo.sign_mto.name} <br />
                        </b>
                        {memo.sign_mto.designation}
                      </p>
                    </>
                  )}
                  {!memo.sign_mto && (
                    <>
                      <p>
                        Signature <br />
                        Designation
                      </p>
                    </>
                  )}
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
