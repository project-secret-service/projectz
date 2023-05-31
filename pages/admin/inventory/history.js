import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "react-datalist-input/dist/styles.css";
import { Button, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";
import router from "next/router";

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
  const [searchResults, setSearchResults] = useState(new Set());
  const [searchResultList, setSearchResultList] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    setSearchResultList(Array.from(searchResults));
  }, [searchResults]);

  async function MergeHistory() {
    const orders = await GetOrders();
    const issues = await GetIssues();

    let mergedData = [...orders, ...issues];

    mergedData.sort((a, b) => b.voucher_no.localeCompare(a.voucher_no));
    mergedData.sort((a, b) => new Date(b.date) - new Date(a.date));

    mergedData.forEach((data) => {
      data.itemString = "";
      data.items.forEach((item) => {
        data.itemString += item.item.name + ", ";
      });
      data.itemString = data.itemString.slice(0, -2);
    });

    setInventoryHistory(mergedData);
    console.log(mergedData);
  }

  function handleSearch(e) {
    let search = e.target.value;
    if (search === "") {
      setSearch(false);
      return;
    } else {
      setSearch(true);
    }

    let results = new Set();
    inventoryHistory.forEach((data) => {
      let date = dateFormat(data.date, "dS mmmm, yyyy - DDDD");

      if (data.voucher_no.toLowerCase().includes(search.toLowerCase())) {
        results.add(data);
      }
      if (data.date && date.toLowerCase().includes(search.toLowerCase())) {
        results.add(data);
      }
      if (data.itemString.toLowerCase().includes(search.toLowerCase())) {
        results.add(data);
      }

      if (data.voucher_no.split("/")[0] === "RV") {
        if ("recieve".includes(search.toLowerCase())) {
          results.add(data);
        }
      }

      if (data.voucher_no.split("/")[0] === "IV") {
        if (search.toLowerCase() === "issue") {
          results.add(data);
        }
      }
    });
    setSearchResults(results);
    console.log(results);
  }

  useEffect(() => {
    MergeHistory();
    console.log(searchResults);
  }, []);
  return (
    <>
      <title>History</title>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <Row className="p-1">
            <h1>Inventory History</h1>
          </Row>
          <div className="col-lg-12 d-flex">
            <div className="col-lg-8 card m-1 p-4">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Voucher No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Items</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                  {!search &&
                    inventoryHistory.map((data, index) => (
                      <tr
                        key={index}
                        onClick={() => {
                          router.push(`/admin/inventory/voucher/${data._id}`);
                        }}
                      >
                        <th className="col-3">{data.voucher_no}</th>
                        <td>
                          {data.date &&
                            dateFormat(data.date, "dS mmmm, yyyy - DDDD")}
                        </td>
                        <td>{data.itemString}</td>
                        <td style={{ textAlign: "center" }}>
                          {data.voucher_no.split("/")[0] === "RV" && (
                            <span style={{ color: "green" }}>RECIEVE</span>
                          )}
                          {data.voucher_no.split("/")[0] === "IV" && (
                            <span style={{ color: "red" }}>ISSUE</span>
                          )}
                        </td>
                      </tr>
                    ))}

                  {search &&
                    searchResultList.map((data, index) => (
                      <tr
                        key={index}
                        onClick={() => {
                          router.push(`/admin/inventory/voucher/${data._id}`);
                        }}
                      >
                        <th className="col-3">{data.voucher_no}</th>
                        <td>
                          {data.date &&
                            dateFormat(data.date, "dS mmmm, yyyy - DDDD")}
                        </td>
                        <td>{data.itemString}</td>
                        <td style={{ textAlign: "center" }}>
                          {data.voucher_no.split("/")[0] === "RV" && (
                            <span style={{ color: "green" }}>RECIEVE</span>
                          )}
                          {data.voucher_no.split("/")[0] === "IV" && (
                            <span style={{ color: "red" }}>ISSUE</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div
              className="col-lg-3 card p-4 m-1"
              style={{ maxHeight: "50vh" }}
            >
              <div className="row p-3">
                <input
                  onChange={handleSearch}
                  name="search"
                  type="text"
                  className="form-control"
                  placeholder="Search"
                ></input>
              </div>
              <Button
                onClick={() => {
                  router.back();
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
              <Link href={"/admin/inventory/orders/order"}>
                <Button className="w-100 mb-1 btn-light">Order an Item</Button>
              </Link>
              <Link href={"/admin/inventory/issues/issue"}>
                <Button className="w-100 mb-1 btn-info">Issue an Item</Button>
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
