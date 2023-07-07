import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { GetItems } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";
import moment from "moment";
import axios from "axios";
import { AddIssue } from "@/functions/apiHandlers/inventory";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayItems, setDisplayItems] = useState(false);
  const [issue, setIssue] = useState({});

  const items_sno = useRef(null);
  const itemQuantity = useRef(null);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    var data = {
      ...issue,
      items: selectedItems,
    };
    AddIssue(data);
  }

  async function GetLastVoucherSNo() {
    const res = await axios({
      url: "http://localhost:3000/inventory/last_voucher/sno",
      method: "GET",
      withCredentials: true,
    });
    return res.data;
  }

  function setQuantity({ target: { name, value } }) {
    const foundItem = items.find((theitem) => theitem._id === item.id);
    if (parseInt(value) < 0) {
      itemQuantity.current.value = 0;
    }
    if (parseInt(value) > foundItem.balance) {
      itemQuantity.current.value = foundItem.balance;
    }
    setItem({
      ...item,
      [name]: itemQuantity.current.value,
      cost:
        Math.round(itemQuantity.current.value * foundItem.current_rate * 100) /
        100,
    });
  }

  function SetItem({ target: { name, value } }) {
    const foundItem = items.find((theitem) => theitem._id === value);
    itemQuantity.current.value = 0;
    setItem({
      ...item,
      [name]: value,
      current_rate: foundItem.current_rate,
      quantity: 0,
      cost:
        Math.round(itemQuantity.current.value * foundItem.current_rate * 100) /
        100,
    });
  }

  function deleteItem(index) {
    let s = selectedItems.find((item, i) => i === index);

    setIssue({
      ...issue,
      total_amount:
        Math.round(
          (parseFloat(issue.total_amount) - parseFloat(s.cost)) * 100
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

    let newItem = {
      id: item.id,
      item: item.id,
      name: name,
      quantity: item.quantity,
      cost: item.cost,
      rate: Math.round((item.cost / item.quantity) * 100) / 100,
      new_balance: parseFloat(balance) - parseFloat(item.quantity),
    };

    setSelectedItems([...selectedItems, newItem]);
    setItem({
      id: items[0]._id,
      quantity: "",
      name: items[0].name,
      current_rate: items[0].current_rate,
      cost: 0,
    });
    setIssue({
      ...issue,
      total_amount:
        Math.round(
          (parseFloat(issue.total_amount) + parseFloat(item.cost)) * 100
        ) / 100,
    });
    displayItems ? setDisplayItems(false) : setDisplayItems(true);
  }

  function SetIssue(event) {
    setIssue({
      ...issue,
      [event.target.name]: event.target.value,
    });
  }

  function showItemsFields() {
    displayItems ? setDisplayItems(false) : setDisplayItems(true);
  }

  function cancelItem() {
    setItem({
      id: items[0]._id,
      quantity: "",
    });
    displayItems ? setDisplayItems(false) : setDisplayItems(true);
  }

  async function SetInitials() {
    const items = await GetItems();
    setItems(items);
    const lastSno = await GetLastVoucherSNo();
    const voucher_no = (
      "IV/" +
      " " +
      moment().format("YYYY/MM/DD/") +
      (lastSno + 1)
    )
      .split(" ")
      .join("");

    //Set Item
    setItem({
      id: items[0]._id,
      quantity: "",
      name: items[0].name,
      current_rate: items[0].current_rate,
      cost: 0,
    });
    //Set Issue
    setIssue({
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
      <AdminLayout title={`Issue Items`}>
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
                          onChange={SetIssue}
                          defaultValue={issue.voucher_no}
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
                          onChange={SetIssue}
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
                          onChange={SetIssue}
                          defaultValue={issue.station}
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
                                  <th scope="col">Current Rate</th>
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
                                    <td>{item.quantity}</td>
                                    <td>&#8377; {item.rate}</td>
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
                          Total : <b>&#8377; {issue.total_amount}</b>
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
                                  onChange={SetItem}
                                  className="form-select"
                                  aria-label="Default select Example"
                                  defaultValue={item._id ? items._id : ""}
                                >
                                  {items.map((item, index) => (
                                    <option key={index} value={item._id}>
                                      {item.name} ( Balance : {item.balance} )
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
                                  ref={itemQuantity}
                                  onChange={setQuantity}
                                  type="number"
                                  name="quantity"
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Rate :
                              </label>
                              <div className="col-sm-7">
                                <b>&#8377; {item.current_rate}</b>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label htmlFor="inputText" className="col-sm-3">
                                Sub Total :
                              </label>
                              <div className="col-sm-7">
                                <b>&#8377; {item.cost}</b>
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
                          onChange={SetIssue}
                          type="text"
                          name="remarks"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary w-50">
                          Issue Items
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
              <Button
                className="mb-1 "
                variant="light"
                onClick={() => {
                  Router.push("/admin/inventory/history");
                }}
              >
                Inventory History
              </Button>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
