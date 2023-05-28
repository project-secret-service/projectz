import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-datalist-input/dist/styles.css";
import { Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Router, { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  async function addOilType(event) {
    event.preventDefault();
    const data = {
      type: event.target.type.value,
    };

    const res = await axios({
      url: "http://localhost:3000/oilbalance/add_oil_type",
      withCredentials: true,
      method: "POST",
      data: data,
    });
    if (res.data.status == 200) {
      router.push("/admin/fuel/balance");
    }
    console.log(res.data);
  }
  return (
    <>
      <title>Add Fuel</title>

      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-10 main mt-0 opac-80">
          <div class="d-flex">
            <div className="col-12">
              <h1>Add Oil Type</h1>
              <Row>
                <div className="card col-8 m-1">
                  <div className="card-body">
                    <form onSubmit={addOilType}>
                      <ToastContainer />
                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Name Of Oil
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="text"
                            name="type"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-10">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ float: "right", width: "50%" }}
                          >
                            Add Oil Type
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-3 card m-1 p-3">
                  <Link href={"/admin/fuel/add"}>
                    <Button className="w-100 mb-1 btn-warning">
                      Update Balance
                    </Button>
                  </Link>
                  <Link href={"/admin/fuel/allot"}>
                    <Button className="w-100 mb-1 btn-dark">Allot Fuel</Button>
                  </Link>

                  <Link href={"/admin/fuel/balance"}>
                    <Button className="w-100 mb-1 btn-primary">
                      Show Balance
                    </Button>
                  </Link>
                </div>
              </Row>
            </div>
          </div>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
