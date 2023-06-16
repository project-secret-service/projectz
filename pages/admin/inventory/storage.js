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
                    <th scope="col">SL No</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Cost of Each Item</th>
                    <th scope="col">Total Cost</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                  {items.map((item, index) => {
                    return (
                      <tr key={index + 1} onClick={() => OpenLink(item._id)}>
                        <>
                          <th scope="row">{index + 1} </th>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>Rs. {item.rate}</td>
                          <td>Rs. {item.quantity * item.rate}</td>
                          <td>
                            {item.quantity != 0 && <>Available</>}
                            {item.quantity === 0 && "Unavailable"}
                          </td>
                        </>
                      </tr>
                    );
                  })}{" "}
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
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
