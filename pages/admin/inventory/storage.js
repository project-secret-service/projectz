import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { GetItems } from "@/functions/apiHandlers/inventory";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GetItems().then((data) => {
      console.log(data);
      setItems(data);
    });
  }, []);

  function OpenLink(link) {
    Router.push("/admin/inventory/item/" + link + "/history");
  }

  return (
    <>
      <AdminLayout title={"Inventory"}>
        <main
          id="main"
          className="col-11 main opac-90"
          style={{
            marginTop: "-2rem",
          }}
        >
          <div className="col-lg-12 d-flex">
            <div className="col-lg-8 card m-1 p-4">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Total Value</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                  {items.map((item, index) => {
                    return (
                      <tr key={index + 1} onClick={() => OpenLink(item._id)}>
                        <>
                          <th scope="row">{index + 1} </th>
                          <th>{item.name}</th>
                          <td>
                            {item.balance} {item.smallest_unit?.name}
                          </td>
                          <td>&#8377; {item.current_rate}</td>
                          <td>
                            &#8377;{" "}
                            {Math.round(
                              item.balance * item.current_rate * 100
                            ) / 100}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.balance != 0 && (
                              <>
                                <i
                                  className="bi bi-archive-fill"
                                  style={{ color: "green" }}
                                ></i>
                              </>
                            )}
                            {item.balance === 0 && (
                              <>
                                <i
                                  className="bi bi-archive-fill"
                                  style={{ color: "red" }}
                                ></i>
                              </>
                            )}
                          </td>
                        </>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-lg-3 card p-4 m-1">
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <hr />
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
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
