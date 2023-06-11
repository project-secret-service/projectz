
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";
import router from "next/router";
import { GetOrders, GetIssues } from "@/functions/apiHandlers/inventory";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [inventoryHistory, setInventoryHistory] = useState([]);
  const searchFilterRef = useRef();
  const [searchResultList, setSearchResultList] = useState([]);
  const [search, setSearch] = useState(false);

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
  }

  function handleSearchFilter({ target: { name, value } }) {
    let searchFilter = searchFilterRef.current.value;
    if (searchFilter != "recieve" && searchFilter != "issue") {
      setSearch(false);
      return;
    }
    setSearch(true);
    if (searchFilter == "recieve") {
      setSearchResultList(
        inventoryHistory.filter(
          (data) => data.voucher_no.split("/")[0] === "RV"
        )
      );
    }
    if (searchFilter == "issue") {
      setSearchResultList(
        inventoryHistory.filter(
          (data) => data.voucher_no.split("/")[0] === "IV"
        )
      );
    }
  }
  function handleSearch({ target: { name, value } }) {
    let search = value;
    let searchFilter = searchFilterRef.current.value;
    if (search === "") {
      setSearch(false);
      return;
    }
    setSearch(true);
    if (searchFilter == "voucher_no") {
      setSearchResultList(
        inventoryHistory.filter((data) =>
          data.voucher_no.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "date") {
      setSearchResultList(
        inventoryHistory.filter((data) =>
          dateFormat(data.date, "dS mmmm, yyyy - DDDD")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "items") {
      setSearchResultList(
        inventoryHistory.filter((data) =>
          data.itemString.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }

  useEffect(() => {
    MergeHistory();
  }, []);

  return (
    <>
      <AdminLayout title={`Inventory History`}>
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

              <select
                className="form-select text-center"
                ref={searchFilterRef}
                aria-label="Default select example"
                onChange={handleSearchFilter}
                defaultValue={"name"}
              >
                <option value="voucher_no">Voucher No</option>
                <option value="date">Date</option>
                <option value="items">Items</option>
                <option value="recieve">Recieve</option>
                <option value="issue">Issue</option>
              </select>
              <hr></hr>
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
      </AdminLayout>
    </>
  );
}
