import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// async function GetOrders(){
//   const res=await axios({url:"http://localhost:3000/inventory/",method:"GET", withCredentials:true});
//   return res.data;
// }

export default function Home() {

  const [Fields, setFields] = useState([{ name: "", age: "" }]);

  const handleformChange = (event, index) => {
    let data = [...Fields];
    data[index][event.target.name] = event.target.value;
    setFields(data);
  };

  const submit = (e) => {
    e.preventdefault();
    console.log(Fields);
  };

  const addFields = () => {
    let object = {
      name: "",
      age: "",
    };
    setFields([...Fields,object])
  };

  
  

  return (
    <>
      <title>Order an Item</title>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0">
          <Row>
            <div>
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <h1>Order an Item</h1>

                    <form>
                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          SL NO :
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="number"
                            name="name"
                            className="form-control"
                            placeholder="25"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Recieve Voucher NO :
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="string"
                            name="vehicle_crp_no"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Date:
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="date"
                            name="registration_no"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Station:
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="text"
                            name="registration_no"
                            className="form-control"
                            placeholder="CRPF CAMP RANCHI"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-10">
                          <button
                          onClick={addFields}
                            type="submit"
                            className="btn btn-primary"
                            syle={{ float: "left" }}
                          >
                            Add an Item
                          </button>
                        </div>
                      </div>

                      <div className="Items">
                        <form onClick={submit}>

                        
                        {Fields.map((form, index) => {
                          return (
                            <div key={index}>
                            
                              <input
                                name="name"
                                placeholder="Name"
                                onChange={(event) =>
                                  handleformChange(event, index)
                                }
                                value={form.name}
                              ></input>

                              <input
                                name="age"
                                placeholder="Age"
                                onChange={(event) =>
                                  handleformChange(event, index)
                                }
                                value={form.age}
                              ></input>

                            </div>
                          )
                        })}
                        </form>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-10">
                  <button
                  onClick={submit}
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: "left" }}
                  >
                    Submit Form
                  </button>
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
