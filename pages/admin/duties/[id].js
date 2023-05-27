import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import dateFormat from "dateformat";
import { Row, Col } from "react-bootstrap";
async function GetUserDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/duty_log/" + id,
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

const Post = () => {
  const [duty, setDuty] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetUserDetails(id).then((data) => {
      setDuty(data);
      console.log(data);
    });
  }, [router.isReady]);
  const componentRef = useRef();
  return (
    <>
      <Head>
        <title>User Details</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SideBar />
      <main className={styles.main}>
        <div className="col-8 opac-80">
          <div
            style={{
              fontSize: "1rem",
              marginTop: "1rem",
              right: "10rem",
              position: "absolute",
              backgroundColor: "#fffddb",
            }}
          >
            <ReactToPrint
              trigger={() => <button className="btn btn-primary">Print</button>}
              content={() => componentRef.current}
            />
          </div>

          <div id="printableArea" ref={componentRef} className="p-5 card">
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
                        dateFormat(duty.out_datetime, " dS mmmm, yyyy - dddd")}
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
                    Signature and Designation of Indenter
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
                  <p style={{ textAlign: "right" }}>Signature of M.T.O.</p>
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
                    Detailed on..... at..... Driver's name..... Nature of
                    duty......
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
                  <p style={{ textAlign: "right" }}>Signature of MT I/C</p>
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
                        Signature of Indenting Office With Designation
                      </p>
                    </>
                  )}
                </Row>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default Post;
