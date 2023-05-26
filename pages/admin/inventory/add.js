import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import "react-datalist-input/dist/styles.css";
import Head from "next/head";
import { Button, Row, Col } from "react-bootstrap";


async function addNewItem(event){
    event.preventDefault();
    // console.log(event.target.item);
    var data={
        name:   event.target.name.value,
        quantity:   event.target.quantity.value,
        rate:   event.target.rate.value,
        description:    event.target.description.value,
    }

   
    console.log(data);
    const res=await axios({
        url: "http://localhost:3000/inventory/items/add",
        withCredentials:true,
        method:"POST",
        data:data
    });
    console.log(res.data);
}
  



export default function Home() {
  

  return (
    <>
      <Head title="Add Items" />
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-11 main mt-0">
          <Row>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h1>Add New Item</h1>

                  <form onSubmit={addNewItem}>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Name :
                      </label>
                      <div className="col-sm-7">
                        <input
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
                        Cost :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="Number"
                          name="rate"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Quantity :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="quantity"
                          className="form-control"
                          placeholder="0"
                          value="0"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Description :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                        />
                      </div>
                    </div>
                    
                   

                    
                    <div className="row mb-3">
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                        >
                          Add Item
                        </button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1"
              style={{ maxHeight: "20vh" }}
            >
              <Link href={"/admin/inventory/storage"}>
                <Button className="w-100 mb-1">List Items</Button>
              </Link>
              <Link href={"/admin/inventory/history"}>
                <Button className="w-100 mb-1">History</Button>
              </Link>
              <Link href={"/admin"}>
                <Button className="w-100 mb-1">Back</Button>
              </Link>
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}