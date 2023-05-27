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
import dateFormat from "dateformat";

async function GetOrders() {
  const res = await axios({
    url: "http://localhost:3000/inventory/all_orders",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function GetIssues() {
  const res = await axios({
    url: "http://localhost:3000/inventory/all_issues",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [inventoryHistory, setInventoryHistory] = useState([]);
  async function MergeHistory() {
    const orders = await GetOrders();
    const issues = await GetIssues();

    let mergedData = [...orders, ...issues];

    mergedData.sort((a, b) => b.voucher_no.localeCompare(a.voucher_no));
    mergedData.sort((a, b) => new Date(b.date) - new Date(a.date));

    setInventoryHistory(mergedData);
  }
  useEffect(() => {
    MergeHistory();
  }, []);
  return (
    <>
      <title>History</title>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <Row className="p-1">
            <h1>History</h1>
          </Row>
          <div className="col-lg-12 d-flex">
            <div className="col-lg-8 card m-1 p-4">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col"> S NO</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type of Voucher</th>
                    <th scope="col">Voucher no</th>
                  </tr>
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                  {inventoryHistory.map((data, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {data.date &&
                          dateFormat(data.date, "dS mmmm, yyyy - dddd")}
                      </td>
                      <td>
                        {data.voucher_no.split("/")[0] === "RV" && <>Recieve Voucher</>}
                        {data.voucher_no.split("/")[0] === "IV" && <>Issue Voucher</>}
                      </td>
                      <td>{data.voucher_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="col-lg-3 card p-4 m-1"
              style={{ maxHeight: "30vh" }}
            >
              <Link href={"/admin/inventory/add"}>
                <Button className="w-100 mb-1 btn-success">
                  Create new Item
                </Button>
              </Link>
              <Link href={"/admin/inventory/storage"}>
                <Button className="w-100 mb-1 btn-secondary">List Items</Button>
              </Link>
              <Link href={"/admin/inventory/issue"}>
                <Button className="w-100 mb-1 btn-light">Order an Item</Button>
              </Link>
              <Link href={"/admin/inventory/issues/issue"}>
                <Button className="w-100 mb-1 btn-info">Issue an Item</Button>
              </Link>
              <Link href={"/admin"}>
                <Button className="w-100 mb-1 btn-dark">Back</Button>
              </Link>
            </div>
          </div>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
