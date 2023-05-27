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

async function GetVehicles() {
  const res = await axios({
    url: "http://localhost:3000/vehicles/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

async function GetlastEntry() {
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/last1",
    method: "GET",
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
}

async function updatebalance(data) {
  console.log(data);
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/add",
    withCredentials: true,
    method: "POST",
    data: data,
  });
  console.log(res.data);
  return res.data;
}

function sucessful() {
  toast.success("Sucessfully Added");
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;
}
function unsucessful() {
  toast.error("Server Error");
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;
}
function greaterval()
{
  toast.error("Balance insuffiecient");
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;

} 
async function updabalance(event) {}




export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [lastentry, setlasteENtry] = useState({});
  // const [particularvehicles, setnewVehicles] = useState([]);
  const [errors, setErrors] = useState({ vehicle_sl_no: "" });
  async function addFuel(event) {
    event.preventDefault();
    var va;
    if(lastentry.balance==null)
    va=0;
    else
    va=parseInt(lastentry.balance);
  
    // console.log(s)
    var data = {
      Name_of_store: event.target.name.value,
      Date: event.target.date_of_travel.value,
      voucher_no: event.target.voucher.value,
      from_whom_received_to_whom_issued: event.target.from_whom.value,
      recived: event.target.recived.value,
      recivedd:true,
      issueed:false,
      balance: va+parseInt(event.target.recived.value),
      signature_of_pol_havaldar: event.target.approvedha.value,
      signature_of_mto: event.target.approvedmt.value,
      remarks: event.target.remarks.value,
      slno:lastentry.slno+1,
      last:true,
    };
    var data1 = {
      last:false,
     };
  
    console.log(data);
    const res = await axios({
      url: "http://localhost:3000/oilstockregister/update/"+lastentry._id,
      withCredentials: true,
      method: "PUT",
      data: data1,
    });
    
    console.log(res.data);
    if (res.status == 200) {
      sucessful();
      
  
      updatebalance(data);
    } else unsucessful();
  }

  async function allotFuel(event) {
    event.preventDefault();
    var va;
    if(lastentry.balance==null)
    va=0;
    else
    va=parseInt(lastentry.balance);
  
    // console.log(s)
    if(parseInt(lastentry.balance)< parseInt(event.target.issued.value))
    {greaterval()}
    else
    {
    var data = {
      vehicle_id: event.target.vehicle_no.value,
      Date: event.target.date.value,
      voucher_no: event.target.voucher1.value,
      issued: event.target.issued.value,
      balance: va-parseInt(event.target.issued.value),
      signature_of_pol_havaldar: event.target.approvedha1.value,
      signature_of_mto: event.target.approvedmt1.value,
      remarks: event.target.remarks1.value,
      slno:lastentry.slno+1,
      last:true,
      recivedd:false,
      issueed:true,
    };
  
    console.log(data);
    var data1 = {
      last:false,
     };
    const res = await axios({
      url: "http://localhost:3000/oilstockregister/update/"+lastentry._id,
      withCredentials: true,
      method: "PUT",
      data: data1,
    });
   
    console.log(res.data);
    if (res.status == 200) {
      sucessful();
    
  
      updatebalance(data);
    } else unsucessful();
  }}
  useEffect(() => {
    GetVehicles().then((data) => {
      setVehicles(data);
    });
    GetlastEntry().then((data) => {
      setlasteENtry(data);
      console.log(lastentry.balance);
    });
  }, []);
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
};
  return (
    <>
     
      <title>Add Fuel</title>

      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0">
         
        <div class="d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h1>Allot Fuel</h1>

                  <form onSubmit={allotFuel}>
                    <ToastContainer />

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Vehicle Number :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="vehicle_no"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          {vehicles.map((vehicle, index) => (
                            <option key={index + 1} value={vehicle._id}>
                              CRP - {vehicle.vehicle_crp_no}{" "}
                              {vehicle.registration_no}
                            </option>
                          ))}{" "}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of Allocation:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="date"
                          name="date"
                          min={disablePastDate()}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Balance :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="balance1"
                          defaultValue={lastentry.balance}
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Issued :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="issued"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Voucher No.:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="voucher1"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Approved by havaldar :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="approvedha1"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="true">Approved</option>
                          <option value="false">Not Approved</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Approved by mto :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="approvedmt1"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="true">Approved</option>
                          <option value="false">Not Approved</option>
                        </select>
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
                          type="text"
                          name="remarks1"
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
                          Allot Fuel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
         
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
