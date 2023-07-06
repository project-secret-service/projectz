import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import { useRef } from "react";
import moment from "moment";
import {
  GetOrders,
  LastOrder,
  GetItems,
} from "@/functions/apiHandlers/inventory";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const componentRef = useRef();
  const [sno, setsno] = useState(1);
  const [Items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [item, setItem] = useState({});
  const formRef = useRef(null);
  const [voucher_no, setVoucherNo] = useState("");
  const [order, setOrder] = useState({});
  const [showItemForm, setShowItemForm] = useState(false);

  function AddToSelectedItems() {
    setSelectedItems([...selectedItems, item]);
    setItem({});
    setShowItemForm(false);
  }

  function setI({ target: { name, value } }) {

  }

  useEffect(() => {
    GetItems().then((data) => {
      setItems(data);
    });
    LastOrder().then((data) => {
      if (data == null) {
        data = 0;
      }
      setsno(data + 1);
      var s = document.getElementById("sl_no");
      s.value = data + 1;
      setOrder({ ...order, sno: data + 1 });

      const voucher_no = (
        "RV/" +
        " " +
        moment().format("YYYY/MM/DD/") +
        (data + 1)
      )
        .split(" ")
        .join("");

      setVoucherNo(voucher_no);
      setOrder({ ...order, voucher_no: voucher_no + 1 });
    });
  }, []);

  const station = "CRPF CAMP RANCHI";

  return (
    <>
      <AdminLayout title={`Order Items`}>
        <main
          id="main"
          className="col-lg-10 main opac-80"
          style={{
            marginTop: "-2rem",
          }}
        >
          <Row>
            <div className="col-8">
              <form ref={formRef}>
                <div>
                  <div>
                    <div className="card p-5">
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
                            Recieve Voucher NO :
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
                              type="date"
                              name="date"
                              className="form-control"
                              defaultValue={moment().format("YYYY-MM-DD")}
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
                              defaultValue={station}
                            />
                          </div>
                        </div>
                        {selectedItems.length > 0 && (
                          <div>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Item</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Rate</th>
                                  <th scope="col">SubTotal</th>
                                  <th scope="col" className="col-1 text-center">
                                    Delete
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedItems.map((item, index) => (
                                  <tr>
                                    <th scope="row">1</th>
                                    <td></td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td className="col-1 text-center">
                                      <Button variant="danger">Delete</Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {!showItemForm && (
                          <div className="row mb-3">
                            <div className="mt-2">
                              <button
                                type="button"
                                className="btn btn-success"
                                style={{ float: "right", marginRight: "2rem" }}
                                onClick={() => {
                                  setShowItemForm(!showItemForm);
                                }}
                              >
                                + Add an Item
                              </button>
                            </div>
                          </div>
                        )}

                        {showItemForm && (
                          <div className="col-lg 11">
                            <div>
                              <div className="p-3 m-3 border">
                                <div className="row mb-0">
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-5 col-form-label"
                                  >
                                    Name:
                                  </label>
                                  <div className="col-sm-7">
                                    <select
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
                                              onChange={setI}
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
                                      name={"rate"}
                                      type="number"
                                      defaultValue={150}
                                      className="form-control"
                                      placeholder="Enter the cost of one item"
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
                                      name={"quantity"}
                                      defaultValue={1}
                                      type="number"
                                      className="form-control"
                                      placeholder="Enter the number of Items"
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
                                      name={"amount"}
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
                                      name={"description"}
                                      className="form-control"
                                      placeholder="Add remark"
                                    ></input>
                                  </div>
                                  <br />
                                  <br />
                                  {showItemForm && (
                                    <div className="row mb-3">
                                      <div
                                        className="mt-2"
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                        }}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-success m-1 w-50"
                                          onClick={() => {
                                            AddToSelectedItems();
                                            setShowItemForm(!showItemForm);
                                          }}
                                        >
                                          + Add this Item
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-danger m-1 w-50"
                                        >
                                          Delete this Item
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
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
      </AdminLayout>
    </>
  );
}
