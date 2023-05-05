import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import "react-datalist-input/dist/styles.css";
import { Button, Row } from 'react-bootstrap';
import Link from "next/link";



async function GetMemos() {
  const res = await axios({
    url: "http://localhost:3000/defectmemos/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function createDefectMemo(event) {
  event.preventDefault();
  var data = {
    vehicle_no: event.target.vehicle_no.value,
    vehicle_model: event.target.vehicle_model.value,
    vehicle_make: event.target.vehicle_make.value,
    vehicle_type: event.target.vehicle_type.value,
    date: event.target.date.value,
    kilometers_run: event.target.kilometers_run.value,
    condition_of_engine: event.target.condition_of_engine.value,
    signature: event.target.signature.value,
    designation: event.target.designation.value,
    vehicle_no: event.target.vehicle_no.value,
    vehicle_model: event.target.vehicle_model.value,
    vehicle_make: event.target.vehicle_make.value,
    vehicle_type: event.target.vehicle_type.value,
    date: event.target.date.value,
    kilometers_run: event.target.kilometers_run.value,
    condition_of_engine: event.target.condition_of_engine.value,
    signature: event.target.signature.value,
    designation: event.target.designation.value,
    defect: event.target.defect.value,
    defect_reason: event.target.defect_reason.value,
    suggestion: event.target.suggestion.value,
    required_parts: event.target.required_parts.value,
    availability_of_parts: event.target.availability_of_parts.value,
    execution_report: event.target.execution_report.value,
    remarks: event.target.remarks.value
  };

  console.log(data);

  const res = await axios({
    url: "http://localhost:3000/defectmemos/add",
    withCredentials: true,
    method: "POST",


    data: data,
  });
  console.log(res.data);
}

export default function Home() {
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    GetMemos().then((data) => {
      setMemos(data);
    });
  }, []);
  function OpenLink(link) {
    console.log(link);
    Router.push('/admin/workshop/' + link);
  }
  return (
    <>
      <Head>
        <title>Defect Memo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />
        <main id="main" className="col-lg-10 main mt-0">
          <Row>
            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                  <h1>Create Defect Memo</h1>
                  <hr
                    style={{
                      color: "#000000",
                      backgroundColor: "#000000",
                      height: 1.5,
                      padding: ".1rem",
                    }}
                  />
                  <Scrollbars style={{ width: 700, height: 600 }}>
                    <form onSubmit={createDefectMemo}>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Date :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="date"
                            name="date"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Vehicle No :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="vehicle_no"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Vehicle Model :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="vehicle_model"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Vehicle Make :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="vehicle_make"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Vehicle Type :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="number"
                            name="vehicle_type"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          kilometers Run :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="number"
                            name="kilometers_run"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Condition Of Engine :
                        </label>
                        <div className="col-sm-5">
                          <input type="text" name="condition_of_engine" className="form-control" />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Defect :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="defect"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Defect Reason :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="defect_reason"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Suggestion :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="suggestion"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Required Parts :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="required_parts"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Availability Of Parts :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="bool"
                            name="availability_of_parts"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Execution Report :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="execution_report"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Remarks :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="remarks"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Signature :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="bool"
                            name="signature"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Designation :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name="designation"
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
                  </Scrollbars>
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{ float: "left" }}
                onClick={() => Router.back()}>
                Go Back
              </button>
            </div>
            <div className="col-lg-5">
              <div className="card">
                <div className="card-body">
                  <h1>Defect Memo List</h1>
                  <hr
                    style={{
                      color: "#000000",
                      backgroundColor: "#000000",
                      height: 1.5,
                      padding: ".1rem",
                    }}
                  />
                  <Scrollbars style={{ width: 490, height: 600 }}>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Sl No.</th>
                          <th scope="col">Date</th>
                          <th scope="col">Vehicle No</th>
                          <th scope="col">KM Run</th>
                          <th scope="col">Condition Of Engine</th>
                        </tr>
                      </thead>
                      <tbody style={
                        { cursor: "pointer" }
                      }>
                        {
                          memos.map((memo, index) => {
                            return (
                              <tr key={
                                index + 1
                              }
                                onClick={
                                  () => OpenLink(memo._id)
                                }>
                                <th scope="row">
                                  {index + 1}
                                </th>
                                <td>{
                                  memo.date.substring(0, 10)
                                }</td>
                                <td>{
                                  memo.vehicle_no
                                }</td>
                                <td>{
                                  memo.kilometers_run
                                }</td>
                                <td>{memo.condition_of_engine}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </Scrollbars>
                </div>
              </div>
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
