import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import dateFormat from "dateformat";
import { Row, Button, Modal } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { getVoucher, AddSignToVoucher } from "@/functions/apiHandlers/fuel";
import AdminLayout from "@/components/admin/AdminLayout";

const SignatureModal = ({
  signAs,
  signTitle,
  showSign,
  setShowSign,
  voucher,
  setVoucher,
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
            const res = await AddSignToVoucher(signAs, voucher._id, password);
            if (res.data.status === 200) {
              getVoucher(voucher._id).then((data) => {
                setVoucher(data);
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

const Post = () => {
  const router = useRouter();
  const [voucher, setVoucher] = useState({});
  const [signAs, setsignAs] = useState("");
  const [signTitle, setSignTitle] = useState("");
  const [showSign, setShowSign] = useState(false);
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    getVoucher(id).then((data) => {
      setVoucher(data);
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={`Voucher No : ${voucher.voucher_no}`}>
        <main id="main" className="col-11 mt-n2 row opac-80">
          <Row>
            <div className="col-8 m-1 card">
              <div className="col-12 p-5" ref={printRef}>
                {voucher.recieved && (
                  <div>
                    <h1 className="josefin-sans">Recieved Voucher</h1>
                    <hr />
                    To be completed by the Recieving Officer <br />
                    <br />
                    <p>
                      Recieve Voucher No : <b> {voucher.recieve_voucher_no}</b>
                    </p>
                    <p>
                      Unit/Estt : <b>M.T.O. CTC (T&IT)</b>
                    </p>
                    <p>
                      Station : <b>CRPF Dhurva Ranchi</b>
                    </p>
                    <p>
                      Date :{" "}
                      <b>
                        {voucher.date &&
                          dateFormat(voucher.date, "dS mmmm, yyyy - dddd")}
                      </b>
                    </p>
                    <p>
                      The articles enumerated below have been issued from{" "}
                      <b>Fuel Stock M.T.O. CTC (T&IT) </b>
                      in Part/Full compliance with
                    </p>
                    <p>
                      The articles enumerated below have been expended/issued
                      and demanded under the authority of
                    </p>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Rate</th>
                          <th scope="col">Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row" className="col-1">
                            1
                          </th>
                          <td>
                            {voucher.type.type}

                            {voucher.for === "vehicle_fuel" && (
                              <>
                                {voucher.description &&
                                  "For " + voucher.description}{" "}
                                in
                                <b>
                                  {" "}
                                  {voucher.vehicle.vehicle_crp_no},{" "}
                                  {voucher.vehicle.registration_no},{" "}
                                  {voucher.vehicle.name}
                                </b>
                              </>
                            )}
                            {voucher.for === "vehicle_maintainance" && (
                              <>
                                {voucher.description &&
                                  "For " + voucher.description}{" "}
                                in
                                <b>
                                  {" CRP-("}
                                  {voucher.vehicle.vehicle_crp_no}
                                  {"), "}
                                  {voucher.vehicle.registration_no},{" "}
                                  {voucher.vehicle.name}
                                </b>
                              </>
                            )}
                          </td>
                          <td>{voucher.recieved_amount}</td>
                          <td>{voucher.cost / voucher.recieved_amount}</td>
                          <td>{voucher.cost}</td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <p>
                      Remarks : <b>{voucher.remarks}</b>
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {voucher.sign_polhavaldar && (
                          <>
                            Digitally Signed By <br />
                            <b>{voucher.sign_polhavaldar.name}, </b>
                            <br />
                            <b>{voucher.sign_polhavaldar.designation}</b>
                          </>
                        )}
                        {!voucher.sign_polhavaldar && (
                          <>
                            Signature of POL
                            <br /> Havaldar
                          </>
                        )}
                      </div>
                      <div>
                        {voucher.sign_mtic && (
                          <>
                            Digitally Signed By <br />
                            <b>{voucher.sign_mtic.name}, </b>
                            <br />
                            <b>{voucher.sign_mtic.designation}</b>
                          </>
                        )}
                        {!voucher.sign_mtic && (
                          <>
                            Signature of Incharge
                            <br />
                            MT Section
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {voucher.issued && (
                  <div>
                    <h1 className="josefin-sans">Issue Voucher</h1>
                    <hr />
                    To be completed by the Issuing Officer <br />
                    <br />
                    <p>
                      Issue Voucher No : <b> {voucher.issue_voucher_no}</b>
                    </p>
                    <p>
                      Unit/Estt : <b>M.T.O. CTC (T&IT)</b>
                    </p>
                    <p>
                      Station : <b>CRPF Dhurva Ranchi</b>
                    </p>
                    <p>
                      Date :{" "}
                      <b>
                        {voucher.date &&
                          dateFormat(voucher.date, "dS mmmm, yyyy - dddd")}
                      </b>
                    </p>
                    <p>
                      The articles enumerated below have been issued from{" "}
                      <b>Fuel Stock M.T.O. CTC (T&IT) </b>
                      in Part/Full compliance with
                    </p>
                    <p>
                      The articles enumerated below have been expended/issued
                      and demanded under the authority of
                    </p>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Rate</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row" className="col-1">
                            1
                          </th>
                          <td className="col-5">
                            <b>{voucher.type.type}</b>

                            {voucher.for === "vehicle_fuel" && (
                              <>
                                {" "}
                                {voucher.description &&
                                  "For " + voucher.description}{" "}
                                in
                                <b>
                                  {" CRP-("}
                                  {voucher.vehicle.vehicle_crp_no}{"), "}
                                  {voucher.vehicle.registration_no},{" "}
                                  {voucher.vehicle.name}
                                </b>
                              </>
                            )}
                            {voucher.for === "vehicle_maintainance" && (
                              <>
                                {voucher.description &&
                                  "For " + voucher.description}{" "}
                                in
                                <b>
                                  {" CRP-("}
                                  {voucher.vehicle.vehicle_crp_no}
                                  {"), "}
                                  {voucher.vehicle.registration_no},{" "}
                                  {voucher.vehicle.name}
                                </b>
                              </>
                            )}
                          </td>
                          <td>{voucher.issued_amount} L</td>
                          <td>&#8377;{voucher.cost / voucher.issued_amount}</td>
                          <td> &#8377;{voucher.cost}</td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <p>
                      Remarks : <b>{voucher.remarks}</b>
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {voucher.sign_polhavaldar && (
                          <>
                            Digitally Signed By <br />
                            <b>{voucher.sign_polhavaldar.name}, </b>
                            <br />
                            <b>{voucher.sign_polhavaldar.designation}</b>
                          </>
                        )}
                        {!voucher.sign_polhavaldar && (
                          <>
                            Signature of POL
                            <br /> Havaldar
                          </>
                        )}
                      </div>
                      <div>
                        {voucher.sign_mtic && (
                          <>
                            Digitally Signed By <br />
                            <b>{voucher.sign_mtic.name}, </b>
                            <br />
                            <b>{voucher.sign_mtic.designation}</b>
                          </>
                        )}
                        {!voucher.sign_mtic && (
                          <>
                            Signature of Incharge
                            <br />
                            MT Section
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-3 m-1 card p-3">
              <Button
                onClick={() => {
                  router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <Button onClick={handlePrint} className="w-100 mb-3 btn-primary">
                Print Voucher
              </Button>

              {!voucher.sign_mtic && (
                <Button
                  className="mb-1 btn-light"
                  onClick={() => {
                    setsignAs("sign_mtic");
                    setSignTitle("Sign as MT Incharge");
                    setShowSign(true);
                  }}
                >
                  Sign as MT Incharge
                </Button>
              )}
              {!voucher.sign_polhavaldar && (
                <Button
                  className="btn-light mb-1"
                  onClick={() => {
                    setsignAs("sign_polhavaldar");
                    setSignTitle("Sign as POL Havaldar");
                    setShowSign(true);
                  }}
                >
                  Sign as POL Havaldar
                </Button>
              )}

              <SignatureModal
                signTitle={signTitle}
                signAs={signAs}
                showSign={showSign}
                setShowSign={setShowSign}
                voucher={voucher}
                setVoucher={setVoucher}
              />
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
};
export default Post;
