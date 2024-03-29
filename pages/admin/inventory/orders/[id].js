import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";
import { GetOrderDetails } from "@/functions/apiHandlers/inventory";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetOrderDetails(id).then((data) => {
      setOrder(data);
      setItems(data.items);
      let total_cost = 0;
      data.items.forEach((item) => {
        total_cost = total_cost + item.amount;
      });
      setTotalCost(total_cost);
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={`Order Details`}>
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <Row className="col-9">
            <div className="col-10">
              <div className="bg-light col-12 p-5" ref={componentRef}>
                <div
                  style={{
                    marginTop: "1rem ",
                    marginLeft: 10,
                    marginRight: 10,
                    height: "80%",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      marginTop: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <span>Recieve Voucher Details</span>
                    <hr
                      style={{
                        color: "#000000",
                        backgroundColor: "#000000",
                        height: 2.5,
                      }}
                    />
                  </div>
                  <div className="row mb-1">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      SL NO :
                    </label>
                    <div className="col-sm-7">
                      <h5>{order.sno}</h5>
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Recieve Voucher NO :
                    </label>
                    <div className="col-sm-7">
                      <h5>{order.voucher_no}</h5>
                    </div>
                  </div>

                  <div className="row mb-1">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Date:
                    </label>
                    <div className="col-sm-7">
                      <h5>{order.date}</h5>
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
                      <h5>{order.station}</h5>
                    </div>
                  </div>

                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item </th>
                        <th scope="col">Price of each item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.item.name}</td>
                          <td>{item.rate}</td>
                          <td>{item.quantity}</td>
                          <td>{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  <br />

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-5 col-form-label"
                    >
                      Total Cost : <b>&#8377; {totalCost}</b>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div>
                  <Button
                    variant="dark"
                    type="button"
                    className="w-100 mb-3 mt-5"
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
                </div>
                {/* <button className="w-100 mb-1 btn-success" onClick={handlePrint}>
              Print this out!
            </button> */}
              </div>
            </div>
            <div className="col-2">
              <Link href={"/admin/inventory/storage"}>
                <Button>Items</Button>
              </Link>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
