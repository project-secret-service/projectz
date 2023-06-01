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


import { Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function GetIssues() {
  const res = await axios({
    url: "http://localhost:3000/inventory/items",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [Fields, setFields] = useState([
    {
      name: "",
      rate: "",
      quantity: "",
      amount: "",
      description: "",
      items: [],
    },
  ]);

  const [error, setError] = useState([]);
  const [arrayOfItemIds, setArrayOfItemIds] = useState([]);

  const [arrayOfFields, setArrayOfFields] = useState([1]);

  const [Items, setItems] = useState([]);
  useEffect(() => {
    GetIssues().then((data) => {
      setItems(data);
    });
  }, []);

  const handleformChange = (event, index) => {
      document.getElementsByName("amount" + (index + 1))[0].value =
      document.getElementsByName("rate" + (index + 1))[0].value *
      document.getElementsByName("quantity" + (index + 1))[0].value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const l = arrayOfFields.length;
    let items = [];
    for (let i = 1; i <= l; i++) {
      let name = document.getElementsByName("name" + i)[0].value;
      let rate = document.getElementsByName("rate" + i)[0].value;
      let quantity = document.getElementsByName("quantity" + i)[0].value;
      let amount = document.getElementsByName("amount" + i)[0].value;
      let description = document.getElementsByName("description" + i)[0].value;
      let item = {
        name: name,
        rate: rate,
        quantity: quantity,
        amount: amount,
        description: description,
      };
      items.push(item);
    }
    setFields({ items: items });
    IssueItems(e, items);
  };

  async function IssueItems(event, items) {
    event.preventDefault();
    var data = {
      issueVoucherNo: event.target.issue_voucher_no.value,
      date: event.target.date.value,
      station: event.target.station.value,
      items: items,
    };
    const res = await axios({
      url: "http://localhost:3000/inventory/issue/add",
      method: "POST",
      withCredentials: true,
      data: data,
    });
  };

  function checkId({ target: { name, value } }) {
    var ids = new Set();
    for (let i = 0; i < arrayOfFields.length; i++) {
      var id = document.getElementsByName("name" + (i + 1))[0].value;
      ids.add(id);
    }
    if (ids.size === arrayOfFields.length) {
      setError("");
    } else {
      setError("Contains Duplicate Items");
    }
  };
  const addFields = () => {
    setArrayOfFields([...arrayOfFields, 1]);
  
  };

  const removeField = (index) => {
    const values = [...arrayOfFields];
 
    values.splice(index, 1);
    setArrayOfFields(values);
  };
  
  return (
    <>
      <title>Issue Item</title>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0">
          <Row>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-body">
                      <h1>Issue Item</h1>
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
                            value="1"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Issue Voucher NO :
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="string"
                            name="recieve_voucher_no"
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
                          Station:
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="text"
                            name="station"
                            className="form-control"
                            placeholder="CRPF CAMP RANCHI"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-10">
                          <button
                            onClick={addFields}
                            type="button"
                            className="btn btn-primary"
                            style={{ float: "left" }}
                          >
                            Add an Item
                          </button>
                        </div>
                      </div>

                      <div className="Items col-lg 11">
                        {arrayOfFields.map((fields, index) => {
                          return (
                            <div key={index}>
                              <div className="Items border p-3 m-3">
                                <div className="row mb-0">
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    Name:
                                  </label>
                                  <div className="col-sm-7">
                                    <select
                                      name={"name" + (index + 1)}
                                      onChange={(e) => checkId(e)}
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      {/* <option value={form.name}>
                                        Fuel Filter Stainer
                                      </option> */}
                                      {Items.map((item, index) => {
                                        return (
                                          <option key={index} value={item._id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>

                                <div className="row mb-3 mt-3">
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    Rate:
                                  </label>
                                  <div className="col-sm-7">
                                    <input
                                      name={"rate" + (index + 1)}
                                      type="number"
                                      defaultValue={0}
                                      className="form-control"
                                      placeholder="Enter the cost of one item"
                                      onChange={(event) =>
                                        handleformChange(event, index)
                                      }
                                    ></input>
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    Quantity:
                                  </label>
                                  <div className="col-sm-7">
                                    <input
                                      name={"quantity" + (index + 1)}
                                      defaultValue={0}
                                      type="number"
                                      className="form-control"
                                      placeholder="Enter the number of Items"
                                      onChange={(event) =>
                                        handleformChange(event, index)
                                      }
                                    ></input>
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    Amount:
                                  </label>
                                  <div className="col-sm-7">
                                    <input
                                      name={"amount" + (index + 1)}
                                      type="number"
                                      className="form-control"
                                      readOnly
                                    ></input>
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    Description:
                                  </label>
                                  <div className="col-sm-7">
                                    <input
                                      name={"description" + (index + 1)}
                                      className="form-control"
                                      placeholder="Add remark"
                                    ></input>
                                  </div>

                                  <button
                                    onClick={() => removeField(index)}
                                    type="button"
                                    className="btn btn-warning m-2"
                                    style={{ float: "right" }}
                                  >
                                    Delete this Item
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ color: "red" }}>{error}</div>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <button
                      // onClick={notify}
                      type="submit"
                      className="btn btn-primary"
                      style={{ float: "left" }}
                    >
                      Submit Form
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
