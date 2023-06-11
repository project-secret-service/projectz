
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

    //get Item String
    history.forEach((data) => {
      let quantity = 0;
      //Get Quantity of Items inside history where The Item ID is item._id
      data.items.forEach((this_item) => {
        if (this_item.item._id === id) {
          quantity += this_item.quantity;
        }
      });
      data.quantity = quantity;

      if (data.voucher_no.split("/")[0] === "RV") data.isRV = true;
      else data.isIV = true;
    });
    history.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
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
    if (!router.isReady) return;
    const { id } = router.query;
    GetItemDetails(id).then((data) => {
      setItem(data);
    });
    ItemHistory(id);
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={`Inventory History - ${item.name}`}>
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <Row className="p-1">
            <h1>Inventory History - {item.name}</h1>
          </Row>
          <div className="col-lg-12 d-flex">
            <div className="col-lg-8 card m-1 p-4">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Voucher No</th>
                    <th scope="col">Date</th>
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
                        <td style={{ textAlign: "center" }}>
                          {data.isRV && (
                            <span style={{ color: "green" }}>
                              +{data.quantity}
                            </span>
                          )}
                          {data.isIV && (
                            <span style={{ color: "red" }}>
                              -{data.quantity}
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {data.isRV && (
                            <span style={{ color: "green" }}>RECIEVE</span>
                          )}
                          {data.isIV && (
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
                        <td style={{ textAlign: "center" }}>
                          {data.isRV && (
                            <span style={{ color: "green" }}>RECIEVE</span>
                          )}
                          {data.isIV && (
                            <span style={{ color: "red" }}>ISSUE</span>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {data.isRV && (
                            <span style={{ color: "green" }}>RECIEVE</span>
                          )}
                          {data.isIV && (
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
