import { useEffect, useState, useRef } from "react";
import moment from "moment";
import Link from "next/link";
import { Button } from "react-bootstrap";
import {
  getOilBalance,
  getLastVoucherEntry,
  addFuel,
} from "@/functions/apiHandlers/fuel";
import AdminLayout from "@/components/admin/AdminLayout";
import Router from "next/router";

export default function Home() {
  const [oils, setOils] = useState([]);
  const [voucherNo, setVoucherNo] = useState("");
  const [newFuel, setNewFuel] = useState({});

  const AmountRef = useRef(null);
  const CostRef = useRef(null);

  function setFuel({ target: { name, value } }) {
    setNewFuel((newFuel) => ({
      ...newFuel,
      [name]: value,
      rate: Number(
        Math.round(CostRef.current.value / AmountRef.current.value + "e3") +
          "e-3"
      ),
    }));
  }

  useEffect(() => {
    getOilBalance().then((data) => {
      getLastVoucherEntry().then((lastRV) => {
        setOils(data);
        setVoucherNo(
          "RV/POL/" +
            (lastRV.slno ? lastRV.slno + 1 : 1) +
            "/" +
            moment().format("YYYY") +
            "/MT-CTC(T&IT)"
        );
        setNewFuel((newFuel) => ({
          ...newFuel,
          recieve_voucher_no:
            "RV/POL/" +
            (lastRV.slno ? lastRV.slno + 1 : 1) +
            "/" +
            moment().format("YYYY") +
            "/MT-CTC(T&IT)",
          date: moment().format("YYYY-MM-DD"),
          type: data[0] ? data[0]._id : "",
          cost: 0,
          recieved_amount: 0,
          slno: lastRV.slno ? lastRV.slno + 1 : 1,
        }));
      });
    });
  }, []);

  return (
    <>
      <AdminLayout title={`Update Oil Balance`}>
        <main id="main" className="col-lg-11 main mt-n2 opac-80">
          <div className="row">
            <div className="col-8 m-1">
              <div className="card p-5">
                <div className="card-body">
                  <form
                    onSubmit={() => {
                      addFuel(event, newFuel);
                    }}
                  >
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Voucher No.:
                      </label>
                      <div className="col-sm-7">
                        <input
                          defaultValue={voucherNo}
                          type="text"
                          name="recieve_voucher_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Name of Store:
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setFuel}
                          type="text"
                          name="name"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of purchase:
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setFuel}
                          type="date"
                          min={new Date().toISOString().substr(0, 10)}
                          defaultValue={new Date().toISOString().substr(0, 10)}
                          name="date_of_travel"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Oil Type
                      </label>
                      <div className="col-sm-7">
                        <select
                          onChange={setFuel}
                          name="type"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          {oils.map((oil, index) => (
                            <option key={index + 1} value={oil._id}>
                              {oil.type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Amount of Oil (in L) :
                      </label>
                      <div className="col-sm-7">
                        <input
                          ref={AmountRef}
                          onChange={setFuel}
                          type="number"
                          name="recieved_amount"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Total Cost :
                      </label>
                      <div className="col-sm-7">
                        <input
                          ref={CostRef}
                          onChange={setFuel}
                          type="number"
                          name="cost"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Current Rate :
                      </label>
                      <div className="col-sm-7">
                        <b>&#8377; {newFuel.rate ? newFuel.rate : 0} / L</b>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Remarks :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setFuel}
                          type="text"
                          name="remarks"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ float: "right" }}
                        >
                          Add Fuel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-3 m-1 card p-3" style={{ maxHeight: "50vh" }}>
              <Button
                className="w-100 mb-1 btn-dark"
                onClick={() => {
                  Router.back();
                }}
              >
                BACK
              </Button>
              <hr />

              <Link href={"/admin/fuel/balance/log"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-list-task"></i> Oil Balance Log
                </Button>
              </Link>

              <Link href={"/admin/fuel/balance"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-app"></i> Show Balance
                </Button>
              </Link>

              <Link href={"/admin/fuel/addtype"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-alexa"></i> Add Oil Type
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
