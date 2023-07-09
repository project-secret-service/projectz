import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetItems } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";
import moment from "moment";
import axios from "axios";
import { AddOrder } from "@/functions/apiHandlers/inventory";
import Link from "next/link";
import { fraction, multiply, inv, string } from "mathjs";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayItems, setDisplayItems] = useState(false);
  const [order, setOrder] = useState({});

  const items_sno = useRef(null);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    var data = {
      ...order,
      items: selectedItems,
    };
    AddOrder(data);
  }

  async function GetLastVoucherSNo() {
    const res = await axios({
      url: "http://localhost:3000/inventory/last_voucher/sno",
      method: "GET",
      withCredentials: true,
    });
    return res.data;
  }

  function SetItem(event) {
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  }

  function SetItemName(event) {
    let foundItem = items.find((item) => item._id === event.target.value);

    setItem({
      ...item,
      [event.target.name]: event.target.value,
      units: foundItem.units,
      current_unit: foundItem.units[0]?.name,
    });
  }

  function deleteItem(index) {
    let s = selectedItems.find((item, i) => i === index);

    setOrder({
      ...order,
      total_amount:
        Math.round(
          (parseFloat(order.total_amount) - parseFloat(s.cost)) * 100
        ) / 100,
    });
    setSelectedItems(selectedItems.filter((item, i) => i !== index));
  }

  function AddItemToSelected(event) {
    let foundItem = items.find((this_item) => this_item._id === item.id);
    let foundInSelectedItems = selectedItems.find(
      (this_item) => this_item.id === item.id
    );
    if (foundInSelectedItems) {
      alert("Item already added");
      return;
    }
    let name = foundItem.name;
    let balance = foundItem.balance;
    let smallestUnit = foundItem.units[0];
    let quantity = item.quantity_in_unit;
    let rate = Math.round((item.cost / item.quantity_in_unit) * 100) / 100;
    let cost = item.cost;
    if (item.current_unit != smallestUnit.name) {
      let conversion_factor = inv(
        fraction(
          smallestUnit.conversions.find((c) => c.to_unit === item.current_unit)
            ?.conversion_factor
        )
      );
      quantity = string(
        fraction(string(multiply(quantity, conversion_factor)))
      );
      rate = string(fraction(string(multiply(rate, inv(conversion_factor)))));

      console.log(quantity, rate, cost);
    }
    let newItem = {
      id: item.id,
      item: item.id,
      name: name,

      quantity: quantity,
      cost: item.cost,
      rate: rate,

      quantity_in_unit: item.quantity_in_unit,
      current_unit: item.current_unit ? item.current_unit : "",
      rate_per_unit:
        Math.round((item.cost / item.quantity_in_unit) * 100) / 100,

      last_balance: parseFloat(balance),
      new_balance: parseFloat(balance) + parseFloat(quantity),
    };

    console.log(newItem);

    setSelectedItems([...selectedItems, newItem]);
    setItem({
      id: items[0]._id,
      current_unit: items[0].units[0]?.name,
      units: items[0].units,
      quantity_in_unit: "",
    });
    setOrder({
      ...order,
      total_amount:
        Math.round(
          (parseFloat(order.total_amount) + parseFloat(item.cost)) * 100
        ) / 100,
    });
    displayItems ? setDisplayItems(false) : setDisplayItems(true);
  }

  function SetOrder(event) {
    setOrder({
      ...order,
      [event.target.name]: event.target.value,
    });
  }

  function showItemsFields() {
    displayItems ? setDisplayItems(false) : setDisplayItems(true);
  }

  function cancelItem() {
    setItem({
      id: items[0]._id,
      quantity_in_unit: "",
    });
    displayItems ? setDisplayItems(false) : setDisplayItems(true);
  }

  async function SetInitials() {
    const items = await GetItems();
    setItems(items);
    const lastSno = await GetLastVoucherSNo();
    const voucher_no = (
      "RV/" +
      " " +
      moment().format("YYYY/MM/DD/") +
      (lastSno + 1)
    )
      .split(" ")
      .join("");

    setItem({
      id: items[0]._id,
      quantity_in_unit: "",
      name: items[0].name,
      units: items[0].units,
      current_unit: items[0].units[0].name,
    });

    setOrder({
      voucher_no: voucher_no,
      date: dateFormat(new Date(), "yyyy-mm-dd"),
      station: "CRPF Dhurva Ranchi",
      total_amount: 0,
      sno: lastSno + 1,
    });
  }

  useEffect(() => {
    GetItems().then((data) => {
      SetInitials();
    });
  }, []);

  return (
    <>
      <AdminLayout title={`Order Items`}>
        <main id="main" className="col-lg-11 main mt-n2 opac-80">
          <Row>
            <div className="col-lg-8">
              <div className="card p-3">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Voucher No :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={SetOrder}
                          defaultValue={order.voucher_no}
                          type="text"
                          name="voucher_no"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Date :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={SetOrder}
                          defaultValue={dateFormat(new Date(), "yyyy-mm-dd")}
                          type="date"
                          name="date"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Station :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={SetOrder}
                          defaultValue={order.station}
                          type="text"
                          name="station"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <hr />
                    {selectedItems[0] && (
                      <>
                        <div className="p-3">
                          {selectedItems[0] && (
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Sl No</th>
                                  <th scope="col">Required Items</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Rate</th>
                                  <th scope="col">Sub Total</th>
                                  <th
                                    style={{ textAlign: "center" }}
                                    className="col-1"
                                  >
                                    Delete
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedItems.map((item, index) => (
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>
                                      {item.quantity_in_unit}{" "}
                                      {item.current_unit}
                                    </td>
                                    <td>
                                      &#8377; {item.rate_per_unit} /{" "}
                                      {item.current_unit}
                                    </td>
                                    <td>&#8377; {item.cost}</td>

                                    <td
                                      style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                      className="col-1 bg-danger"
                                      onClick={() => deleteItem(index)}
                                    >
                                      <span style={{ color: "white" }}>
                                        <i className="bi bi-trash"></i>
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          Total : <b>&#8377; {order.total_amount}</b>
                        </div>
                      </>
                    )}
                    <div>
                      {displayItems && (
                        <>
                          <div className="p-3 m-1">
                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Sl No :
                              </label>
                              <div className="col-sm-7">
                                <b ref={items_sno}>
                                  {selectedItems.length + 1}
                                </b>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label className="col-sm-3">Item Name</label>
                              <div className="col-sm-7">
                                <select
                                  name="id"
                                  onChange={SetItemName}
                                  className="form-select"
                                  aria-label="Default select Example"
                                  defaultValue={item._id ? items._id : ""}
                                >
                                  {items.map((item, index) => (
                                    <option key={index} value={item._id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Quantity :
                              </label>
                              <div className="col-sm-7">
                                <input
                                  onChange={SetItem}
                                  type="number"
                                  name="quantity_in_unit"
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Unit :
                              </label>
                              <div className="col-sm-7">
                                <select
                                  name="current_unit"
                                  onChange={SetItem}
                                  className="form-select"
                                  aria-label="Default select Example"
                                >
                                  {item.units &&
                                    item.units.map((unit, index) => (
                                      <option key={index} value={unit.name}>
                                        {unit.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Cost :
                              </label>
                              <div className="col-sm-7">
                                <input
                                  onChange={SetItem}
                                  type="number"
                                  name="cost"
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div
                              className="mt-3"
                              style={{ textAlign: "right" }}
                            >
                              <Button
                                variant="success"
                                style={{ marginRight: "1rem" }}
                                onClick={AddItemToSelected}
                              >
                                + Add Item
                              </Button>

                              <Button variant="light" onClick={cancelItem}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {!displayItems && (
                      <div className="mt-3" style={{ textAlign: "right" }}>
                        <Button variant="success" onClick={showItemsFields}>
                          + Add Items
                        </Button>
                      </div>
                    )}
                    <hr />

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-3">
                        Remarks :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={SetOrder}
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
                          Create Order
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-3 card p-3">
              <Button
                className="mb-1"
                variant="dark"
                onClick={() => {
                  Router.back();
                }}
              >
                BACK
              </Button>
              <hr />
              <Link href={"/admin/inventory/storage"}>
                <Button className="w-100 mb-1 btn-light">Storage</Button>
              </Link>
              <Link href={"/admin/inventory/history"}>
                <Button className="w-100 mb-1 btn-light">
                  Inventory History
                </Button>
              </Link>
              <Link href={"/admin/inventory/orders/order"}>
                <Button className="w-100 mb-1 btn-light">Order Items</Button>
              </Link>
              <Link href={"/admin/inventory/issues/issue"}>
                <Button className="w-100 mb-1 btn-light">Issue Items</Button>
              </Link>
              <Link href={"/admin/inventory/add"}>
                <Button className="w-100 mb-1 btn-light">
                  Create New Item
                </Button>
              </Link>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
