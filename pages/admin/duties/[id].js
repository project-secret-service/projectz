import { useRouter } from "next/router";
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import dateFormat from "dateformat";
import { Row, Button, Modal } from "react-bootstrap";
import { GetDutyDetails, AddDutySign } from "@/functions/apiHandlers/duties";
import AdminLayout from "@/components/admin/AdminLayout";

const SignatureModal = ({
  signAs,
  signTitle,
  showSign,
  setShowSign,
  duty,
  setDuty,
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
          onClick={() => {
            AddDutySign(duty._id, password, signAs).then((data) => {
              if (data === "ok") {
                GetDutyDetails(duty._id).then((data) => {
                  setDuty(data);
                });
                setShowSign(false);
              } else {
                setWrongPass("Wrong Password");
              }
            });
          }}
        >
          Add Signature
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Post = () => {
  const [duty, setDuty] = useState({});
  const [signAs, setsignAs] = useState("");
  const [signTitle, setSignTitle] = useState("");
  const [showSign, setShowSign] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetDutyDetails(id).then((data) => {
      setDuty(data);
    });
  }, [router.isReady]);
  const componentRef = useRef();
  return (
    <>
      <AdminLayout title={`Duty Details`}>
        <main id="main" className="col-11 mt-n2 row">
          <div className="col-9 opac-80">
            <div id="printableArea" className="p-5 card">
              <div
                style={{
                  fontSize: "1.5rem",
                  marginTop: "1rem",
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                <span className="josefin-sans">
                  Central Reserve Police Force Vehicle Indent and Order
                </span>
                <hr
                  style={{
                    color: "#000000",
                    backgroundColor: "#000000",
                    height: 2.5,
                  }}
                />
              </div>
              {duty.vehicle && (
                <div className="p-1" id="duty_details">
                  <Row>
                    <p>
                      <b>{duty.vehicle.vehicle_type}</b> on Payment/Regimental/
                      Govt. duty at
                      <b>
                        {duty.out_datetime &&
                          dateFormat(duty.out_datetime, " hh:MM TT ")}
                      </b>
                      hrs on
                      <b>
                        {duty.out_datetime &&
                          dateFormat(
                            duty.out_datetime,
                            " dS mmmm, yyyy - dddd"
                          )}
                      </b>
                    </p>{" "}
                    <p>
                      For the purpose of <b>{duty.purpose}</b>
                    </p>
                    <p>
                      The vehicle should report at
                      <br /> Place : <b>CTC (IT & T)</b>
                      <br />
                      Date :
                      <b>
                        {duty.date &&
                          dateFormat(duty.date, " dS mmmm, yyyy - dddd")}
                      </b>
                    </p>
                    <p style={{ textAlign: "right" }}>
                      {duty.sign_indenter && (
                        <>
                          Digitally Signed By <br />
                          <b>{duty.sign_indenter.name}, </b>
                          <b>{duty.sign_indenter.designation}</b>
                        </>
                      )}
                      {!duty.sign_indenter && (
                        <span>Signature and Designation of Indenter</span>
                      )}
                    </p>
                    <p
                      style={{ textAlign: "center", fontSize: "1.2rem" }}
                      className="josefin-sans"
                    >
                      ORDER
                    </p>
                    <p>
                      Detailed CRPF Vehicle No :{" "}
                      <b>{duty.vehicle.registration_no}, </b>
                      <b>{duty.vehicle.name}, </b>
                      <b>CRP - ({duty.vehicle.vehicle_crp_no})</b> for Above
                      Purpose
                    </p>
                    <p>
                      Place : <b>CTC (IT & T)</b>
                      <br />
                      Date :
                      <b>
                        {duty.date &&
                          dateFormat(duty.date, " dS mmmm, yyyy - dddd")}
                      </b>
                    </p>
                    <p style={{ textAlign: "right" }}>
                      {duty.sign_mto && (
                        <>
                          Digitally Signed By <br />
                          <b>{duty.sign_mto.name}, </b>
                          <b>{duty.sign_mto.designation}</b>
                        </>
                      )}
                      {!duty.sign_mto && <span>Signature of M.T.O.</span>}
                    </p>
                    <p>
                      Transport Indent No - <b>{duty.indent_no},</b> Dated :{" "}
                      <b>
                        {" "}
                        {duty.date &&
                          dateFormat(duty.date, " dS mmmm, yyyy - dddd")}
                        {", "}
                      </b>
                      CRPF Vehicle No : <b>{duty.vehicle.registration_no}</b>
                      {", "}
                      Detailed on{" "}
                      <b>
                        {duty.date &&
                          dateFormat(duty.date, " dS mmmm, yyyy - dddd")}{" "}
                      </b>
                      at{" "}
                      <b>{duty.date && dateFormat(duty.date, " hh:MM TT")} </b>
                      Driver's name{" "}
                      <b>
                        {duty.driver.name} ( {duty.driver.license_no} )
                      </b>{" "}
                      Nature of duty......
                    </p>
                    <p>
                      Place : <b>CTC (IT & T)</b>
                      <br />
                      Date :
                      <b>
                        {duty.date &&
                          dateFormat(duty.date, " dS mmmm, yyyy - dddd")}
                      </b>
                    </p>
                    <p style={{ textAlign: "right" }}>
                      {duty.sign_mtic && (
                        <>
                          Digitally Signed By <br />
                          <b>{duty.sign_mtic.name}, </b>
                          <b>{duty.sign_mtic.designation}</b>
                        </>
                      )}
                      {!duty.sign_mtic && <span>Signature of MT I/C</span>}
                    </p>
                    {duty.mission_ended && (
                      <>
                        {" "}
                        <p>
                          The vehicle mentioned above arived at{" "}
                          <b>
                            {duty.in_datetime &&
                              dateFormat(duty.in_datetime, "hh:MM TT")}{" "}
                          </b>
                          hrs on{" "}
                          <b>
                            {duty.in_datetime &&
                              dateFormat(
                                duty.in_datetime,
                                "dS mmmm, yyyy - dddd"
                              )}
                          </b>{" "}
                          <br />
                          Total Kms Run: <b>{duty.km_run} km</b> ,
                          <br />
                          Damage if any...... ,<br />
                          and was dismissed at.......
                        </p>
                        <p style={{ textAlign: "right" }}>
                          {duty.sign_indentingoffice && (
                            <>
                              Digitally Signed By <br />
                              <b>{duty.sign_indentingoffice.name}, </b>
                              <b>{duty.sign_indentingoffice.designation}</b>
                            </>
                          )}
                          {!duty.sign_indentingoffice && (
                            <span>
                              Signature of Indenting Office With Designation
                            </span>
                          )}
                        </p>
                      </>
                    )}
                  </Row>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "none" }}>
            <div className="col-12 card" ref={componentRef}>
              <div id="printableArea" className="p-5">
                <div
                  style={{
                    fontSize: "1.5rem",
                    marginTop: "1rem",
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <span className="josefin-sans">
                    Central Reserve Police Force Vehicle Indent and Order
                  </span>
                  <hr
                    style={{
                      color: "#000000",
                      backgroundColor: "#000000",
                      height: 2.5,
                    }}
                  />
                </div>
                {duty.vehicle && (
                  <div className="p-1" id="duty_details">
                    <Row>
                      <p>
                        <b>{duty.vehicle.vehicle_type}</b> on
                        Payment/Regimental/ Govt. duty at
                        <b>
                          {duty.out_datetime &&
                            dateFormat(duty.out_datetime, " hh:MM TT ")}
                        </b>
                        hrs on
                        <b>
                          {duty.out_datetime &&
                            dateFormat(
                              duty.out_datetime,
                              " dS mmmm, yyyy - dddd"
                            )}
                        </b>
                      </p>{" "}
                      <p>
                        For the purpose of <b>{duty.purpose}</b>
                      </p>
                      <p>
                        The vehicle should report at
                        <br /> Place : <b>CTC (IT & T)</b>
                        <br />
                        Date :
                        <b>
                          {duty.date &&
                            dateFormat(duty.date, " dS mmmm, yyyy - dddd")}
                        </b>
                      </p>
                      <p style={{ textAlign: "right" }}>
                        {duty.sign_indenter && (
                          <>
                            Digitally Signed By <br />
                            <b>{duty.sign_indenter.name}, </b>
                            <b>{duty.sign_indenter.designation}</b>
                          </>
                        )}
                        {!duty.sign_indenter && (
                          <span>Signature and Designation of Indenter</span>
                        )}
                      </p>
                      <p
                        style={{ textAlign: "center", fontSize: "1.2rem" }}
                        className="josefin-sans"
                      >
                        ORDER
                      </p>
                      <p>
                        Detailed CRPF Vehicle No :{" "}
                        <b>{duty.vehicle.registration_no}, </b>
                        <b>{duty.vehicle.name}, </b>
                        <b>CRP - ({duty.vehicle.vehicle_crp_no})</b> for Above
                        Purpose
                      </p>
                      <p>
                        Place : <b>CTC (IT & T)</b>
                        <br />
                        Date :
                        <b>
                          {duty.date &&
                            dateFormat(duty.date, " dS mmmm, yyyy - dddd")}
                        </b>
                      </p>
                      <p style={{ textAlign: "right" }}>
                        {duty.sign_mto && (
                          <>
                            Digitally Signed By <br />
                            <b>{duty.sign_mto.name}, </b>
                            <b>{duty.sign_mto.designation}</b>
                          </>
                        )}
                        {!duty.sign_mto && <span>Signature of M.T.O.</span>}
                      </p>
                      <p>
                        Transport Indent No - <b>{duty.indent_no},</b> Dated :{" "}
                        <b>
                          {" "}
                          {duty.date &&
                            dateFormat(duty.date, " dS mmmm, yyyy - dddd")}
                          {", "}
                        </b>
                        CRPF Vehicle No : <b>{duty.vehicle.registration_no}</b>
                        {", "}
                        Detailed on{" "}
                        <b>
                          {duty.date &&
                            dateFormat(duty.date, " dS mmmm, yyyy - dddd")}{" "}
                        </b>
                        at{" "}
                        <b>
                          {duty.date && dateFormat(duty.date, " hh:MM TT")}{" "}
                        </b>
                        Driver's name{" "}
                        <b>
                          {duty.driver.name} ( {duty.driver.license_no} )
                        </b>{" "}
                        Nature of duty......
                      </p>
                      <p>
                        Place : <b>CTC (IT & T)</b>
                        <br />
                        Date :
                        <b>
                          {duty.date &&
                            dateFormat(duty.date, " dS mmmm, yyyy - dddd")}
                        </b>
                      </p>
                      <p style={{ textAlign: "right" }}>
                        {duty.sign_mtic && (
                          <>
                            Digitally Signed By <br />
                            <b>{duty.sign_mtic.name}, </b>
                            <b>{duty.sign_mtic.designation}</b>
                          </>
                        )}
                        {!duty.sign_mtic && <span>Signature of MT I/C</span>}
                      </p>
                      {duty.mission_ended && (
                        <>
                          {" "}
                          <p>
                            The vehicle mentioned above arived at{" "}
                            <b>
                              {duty.in_datetime &&
                                dateFormat(duty.in_datetime, "hh:MM TT")}{" "}
                            </b>
                            hrs on{" "}
                            <b>
                              {duty.in_datetime &&
                                dateFormat(
                                  duty.in_datetime,
                                  "dS mmmm, yyyy - dddd"
                                )}
                            </b>{" "}
                            <br />
                            Total Kms Run: <b>{duty.km_run} km</b> ,
                            <br />
                            Damage if any...... ,<br />
                            and was dismissed at.......
                          </p>
                          <p style={{ textAlign: "right" }}>
                            {duty.sign_indentingoffice && (
                              <>
                                Digitally Signed By <br />
                                <b>{duty.sign_indentingoffice.name}, </b>
                                <b>{duty.sign_indentingoffice.designation}</b>
                              </>
                            )}
                            {!duty.sign_indentingoffice && (
                              <span>
                                Signature of Indenting Office With Designation
                              </span>
                            )}
                          </p>
                        </>
                      )}
                    </Row>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card p-3">
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <ReactToPrint
                trigger={() => (
                  <button className="btn btn-primary mb-1">Print</button>
                )}
                content={() => componentRef.current}
              />

              <br />
              {!duty.sign_indenter && (
                <Button
                  className="btn-light mb-1"
                  onClick={() => {
                    setsignAs("sign_indenter");
                    setSignTitle("Sign as Indenter");
                    setShowSign(true);
                  }}
                >
                  Sign as Indenter
                </Button>
              )}

              {!duty.sign_mto && (
                <Button
                  className="btn-light mb-1"
                  onClick={() => {
                    setsignAs("sign_mto");
                    setSignTitle("Sign as MTO");
                    setShowSign(true);
                  }}
                >
                  Sign as MTO
                </Button>
              )}

              {!duty.sign_mtic && (
                <Button
                  className="btn-light mb-1"
                  onClick={() => {
                    setsignAs("sign_mtic");
                    setSignTitle("Sign as MT I/C");
                    setShowSign(true);
                  }}
                >
                  Sign as MT I/C
                </Button>
              )}

              {!duty.sign_indentingoffice && duty.mission_ended && (
                <Button
                  className="btn-light mb-1"
                  onClick={() => {
                    setsignAs("sign_indentingoffice");
                    setSignTitle("Sign as Indenting Office");
                    setShowSign(true);
                  }}
                >
                  Sign as Intending Office
                </Button>
              )}

              <hr />
              {!duty.mission_ended && (
                <>
                  <Button
                    className="btn-light mb-1"
                    onClick={() => {
                      Router.push("/admin/duties/" + duty._id + "/update");
                    }}
                  >
                    Update Duty
                  </Button>
                </>
              )}

              <SignatureModal
                signTitle={signTitle}
                signAs={signAs}
                showSign={showSign}
                setShowSign={setShowSign}
                duty={duty}
                setDuty={setDuty}
              />
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};
export default Post;
