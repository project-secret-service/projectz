import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import {
  GetItemHistory,
  GetItemDetails,
} from "@/functions/apiHandlers/inventory";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [inventoryHistory, setInventoryHistory] = useState([]);
  const [item, setItem] = useState({});
  const searchFilterRef = useRef();
  const [searchResultList, setSearchResultList] = useState([]);
  const [search, setSearch] = useState(false);
  const router = useRouter();

  async function ItemHistory(id) {
    const history = await GetItemHistory(id);
    history.forEach((voucher) => {
      const item = voucher.items.find((item) => item.item._id == id);
      voucher.change_quantity = item.quantity_in_smallest_unit
        ? item.quantity_in_smallest_unit
        : item.quantity;
      voucher.new_balance = item.new_balance;
    });
    history.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    console.log(history);
    setInventoryHistory(history);
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
          (voucher) => voucher.voucher_no.split("/")[0] === "RV"
        )
      );
    }
    if (searchFilter == "issue") {
      setSearchResultList(
        inventoryHistory.filter(
          (voucher) => voucher.voucher_no.split("/")[0] === "IV"
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
        inventoryHistory.filter((voucher) =>
          voucher.voucher_no.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "date") {
      setSearchResultList(
        inventoryHistory.filter((voucher) =>
          dateFormat(voucher.date, "dS mmmm, yyyy - DDDD")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "items") {
      setSearchResultList(
        inventoryHistory.filter((voucher) =>
          voucher.itemString.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetItemDetails(id).then((item) => {
      setItem(item);
    });
    ItemHistory(id);
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={`Inventory History - ${item.name}`}>
        <main
          id="main"
          className="col-lg-11 main  opac-80"
          style={{
            marginTop: "-2rem",
          }}
        >
          <div className="col-lg-12 d-flex">
            <div className="col-lg-8 card m-1 p-4">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Voucher No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Balance</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Change
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                  {!search &&
                    inventoryHistory.map((voucher, index) => (
                      <tr
                        key={index}
                        onClick={() => {
                          router.push(
                            `/admin/inventory/voucher/${voucher._id}`
                          );
                        }}
                      >
                        <th className="col-3">{voucher.voucher_no}</th>
                        <td>
                          {voucher.date &&
                            dateFormat(
                              voucher.date,
                              "dS mmmm, yyyy - DDDD - hh:MM TT"
                            )}
                        </td>
                        <td>{voucher.new_balance}</td>
                        <td style={{ textAlign: "center" }}>
                          {voucher.isRecieve && (
                            <span style={{ color: "green" }}>
                              +{voucher.change_quantity}
                            </span>
                          )}
                          {voucher.isIssue && (
                            <span style={{ color: "red" }}>
                              -{voucher.change_quantity}
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {voucher.isRecieve && (
                            <span style={{ color: "green" }}>
                              <i className="bi bi-box-arrow-in-down"></i>
                            </span>
                          )}
                          {voucher.isIssue && (
                            <span style={{ color: "red" }}>
                              <i className="bi bi-box-arrow-up"></i>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}

                  {search &&
                    searchResultList.map((voucher, index) => (
                      <tr
                        key={index}
                        onClick={() => {
                          router.push(
                            `/admin/inventory/voucher/${voucher._id}`
                          );
                        }}
                      >
                        <th className="col-3">{voucher.voucher_no}</th>
                        <td>
                          {voucher.date &&
                            dateFormat(
                              voucher.date,
                              "dS mmmm, yyyy - DDDD - hh:MM TT"
                            )}
                        </td>
                        <td>{voucher.new_balance}</td>
                        <td style={{ textAlign: "center" }}>
                          {voucher.isRecieve && (
                            <span style={{ color: "green" }}>
                              +{voucher.change_quantity}
                            </span>
                          )}
                          {voucher.isIssue && (
                            <span style={{ color: "red" }}>
                              -{voucher.change_quantity}
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {voucher.isRecieve && (
                            <span style={{ color: "green" }}>
                              <i className="bi bi-box-arrow-in-down"></i>
                            </span>
                          )}
                          {voucher.isIssue && (
                            <span style={{ color: "red" }}>
                              <i className="bi bi-box-arrow-up"></i>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div
              className="col-lg-3 card p-4 m-1"
              style={{ maxHeight: "70vh" }}
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
              <hr />
              <Link href={"/admin/inventory/storage"}>
                <Button className="w-100 mb-1 btn-light">Storage</Button>
              </Link>
              <Link href={"/admin/inventory/history"}>
                <Button className="w-100 mb-1 btn-light">History</Button>
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
              <hr />
              <div className="mb-3 text-center">
                Balance and Changes are in Smallest Unit:{" "}
                <b>{item.smallest_unit?.name}</b>
              </div>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
