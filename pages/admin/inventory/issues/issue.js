import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../../components/Header";
import SideBar from "../../../components/Sidebar";
import Scripts from "../../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";

async function GetIssues() {
  const res = await axios({
    url: "http://localhost:3000/inventory/items",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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

  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const [error, setError] = useState([]);
  const [sno, setsno] = useState(1);
  const [arrayOfItemIds, setArrayOfItemIds] = useState([]);
  const [arrayOfFields, setArrayOfFields] = useState([1]);
  const [Items, setItems] = useState([]);
  const formRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [voucher_no, setVoucherNo] = useState("");
  const [issue, setIssue] = useState({});

  function setO({ target: { name, value } }) {
    setIssue({ ...issue, [name]: value });
  }

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  useEffect(() => {
    GetIssues().then((data) => {
      setItems(data);
    });
    LastIssue().then((data) => {
      setsno(data + 1);
      var s = document.getElementById("sl_no");
      s.value = data + 1;
      setIssue({ ...issue, sno: data + 1 });

      const voucher_no = (
        "IV/" +
        " " +
        moment().format("YYYY/MM/DD/") +
        (data + 1)
      )
        .split(" ")
        .join("");

      setVoucherNo(voucher_no);
      setIssue({ ...issue, voucher_no: voucher_no + 1 });
    });
    setIssue({ ...issue, date: currentDate });
  }, []);

  const handleformChange = (event, index) => {
    document.getElementsByName("amount" + (index + 1))[0].value =
      document.getElementsByName("rate" + (index + 1))[0].value *
      document.getElementsByName("quantity" + (index + 1))[0].value;
  };

  const handleSubmit = (e) => {
    const l = arrayOfFields.length;
    let items = [];
    for (let i = 1; i <= l; i++) {
      let name = document.getElementsByName("name" + i)[0].value;
      let rate = document.getElementsByName("rate" + i)[0].value;
      let quantity = document.getElementsByName("quantity" + i)[0].value;
      let amount = document.getElementsByName("amount" + i)[0].value;
      let description = document.getElementsByName("description" + i)[0].value;
      let item = {
        item: name,
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  async function IssueItems(event, items) {
    event.preventDefault();
    var data = {
      sno: sno,
      voucher_no: voucher_no,
      date: currentDate,
      station: "CRPF CAMP RANCHI",
      items: items,
    };
    const res = await axios({
      url: "http://localhost:3000/inventory/issue/add",
      method: "POST",
      withCredentials: true,
      data: data,
    });
    if (res.data.status === 200) {
      Router.push("/admin/inventory/voucher/" + res.data.issue_id);
    }
  }

  async function GetItemDetails(id) {
    const res = await axios({
      url: "http://localhost:3000/inventory/items/" + id,
      method: "GET",
      withCredentials: true,
    });
    return res.data;
  }

  function checkId({ target: { name, value } }) {
    var ids = new Set();
    for (let i = 0; i < arrayOfFields.length; i++) {
      var id = document.getElementsByName("name" + (i + 1))[0].value;
      ids.add(id);
    }
    if (ids.size === arrayOfFields.length) {
      setIssue({ ...issue, [name]: value });
      GetItemDetails(value).then((data) => {
        let i = name.match(/[a-zA-Z]+|[0-9]+/g)[1];
        var rate_input = document.getElementsByName("rate" + i)[0];
        rate_input.value = data.rate;
        document.getElementsByName("amount" + i)[0].value =
          document.getElementsByName("rate" + i)[0].value *
          document.getElementsByName("quantity" + i)[0].value;
      });
      setError("");
    } else {
      setError("Contains Duplicate Items");
    }
  }

  const addFields = () => {
    setArrayOfFields([...arrayOfFields, 1]);
  };

  const removeField = (index) => {
    const values = [...arrayOfFields];
    values.splice(index, 1);
    setArrayOfFields(values);
  };
  const notify = () => {
    toast.success("🦄 form submitted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const print = () => {
    window.print();
  };

  async function LastIssue() {
    const res = await axios({
      url: "http://localhost:3000/inventory/issue",
      method: "GET",
      withCredentials: true,
    });

    return res.data;
  }

  const station = "CRPF CAMP RANCHI";

  return (
    <>
      <title>Issue Item</title>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-10 main mt-0 opac-80">
          <Row>
            <h1>Issue an Item</h1>
            <div className="col-7">
              <form ref={formRef}>
                <div>
                  <div>
                    <div className="card">
                      <div className="card-body">
                        <div className="row mb-3">
                          <label
                            htmlFor="inputText"
                            className="col-sm-5 col-form-label"
                          >
                            SL NO :
                          </label>
                          <div className="col-sm-7">
                            <input
                              id="sl_no"
                              type="number"
                              name="sl_no"
                              className="form-control"
                              placeholder="25"
                              defaultValue={sno}
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
                              defaultValue={voucher_no}
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
                              onChange={setO}
                              type="date"
                              name="date"
                              className="form-control"
                              defaultValue={currentDate}
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
                              onChange={setO}
                              type="text"
                              name="station"
                              className="form-control"
                              defaultValue={station}
                            />
                          </div>
                        </div>
                        {/* <hr /> */}
                        <div className="row mb-3">
                          <div className="mt-2">
                            <button
                              onClick={addFields}
                              type="button"
                              className="btn btn-success"
                              style={{ float: "right", marginRight: "2rem" }}
                            >
                              + Add an Item
                            </button>
                          </div>
                        </div>
                        {/* <hr /> */}

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
                                        {Items &&
                                          Items.map((item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item._id}
                                                defaultValue={item._id}
                                              >
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
                                        defaultValue={150}
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
                                        defaultValue={1}
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
                                        defaultValue={150}
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
                                      className="btn btn-danger m-auto w-50 mt-3"
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
                      <div style={{ color: "red", textAlign: "center" }}>
                        {error}
                      </div>
                      <div className="text-center">
                        <div>
                          <div>
                            <Button
                              variant="dark"
                              type="button"
                              className="w-50 mb-3 mt-3"
                              onClick={handleShow}
                            >
                              Submit
                            </Button>

                            <Modal
                              show={showModal}
                              onHide={handleClose}
                              centered // Add the 'centered' prop to vertically center the modal
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Attention</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <p>
                                  Please check the Issue voucher and then
                                  proceed
                                </p>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="info"
                                  type="submit"
                                  onClick={handleSubmit}
                                >
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-3 card p-4" style={{ maxHeight: "30vh" }}>
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <Link href={"/admin/inventory/add"}>
                <Button className="w-100 mb-1 btn-success">
                  Create new Item
                </Button>
              </Link>
              <Link href={"/admin/inventory/storage"}>
                <Button className="w-100 mb-1 btn-secondary">List Items</Button>
              </Link>
              <Link href={"/admin/inventory/history"}>
                <Button className="w-100 mb-1 btn-light">History</Button>
              </Link>
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
