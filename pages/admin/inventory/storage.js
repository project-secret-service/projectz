import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Header from '../../components/Header'
import SideBar from '../../components/Sidebar'
import Scripts from '../../components/Scripts'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Link from "next/link";
import Router from 'next/router'
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { Button,Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
    return (
        <>
            <title>Storage</title>
            <main className={
                styles.main
            }>

                <Header/>
                <SideBar/>

                <main id="main" className="col-lg-11 main mt-0">
          <Row>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h1>Storage</h1>

                  <form>
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
                        Vehicle CRP No :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="vehicle_crp_no"
                          className="form-control"
                          // onChange={() => CheckCrpNo(this)}
                        />
                        {/* <p>{errors.vehicle_crp_no} </p> */}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-5 col-form-label">
                        Select Vehicle Type :
                      </label>
                      <div className="col-sm-7">
                        <select
                          name="vehicle_type"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="TWOWHEELER">2 Wheeler</option>
                          <option value="3TONNER">3 Tonner</option>
                          <option value="BUS">Bus</option>
                          <option value="LMV">Car</option>
                          <option value="LMV">Gypsy</option>
                          <option value="HMV">Tractor</option>
                          <option value="HMV">Truck</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Vehicle Registration No:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="registration_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Cost of Vehicle :
                      </label>
                      <div className="col-sm-7">
                        <input
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
                        No of Wheels :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="no_of_wheels"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Year of Manufacture :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="year_of_manufacture"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date Recieved into Service :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="date"
                          name="date_of_service"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Chasis Number :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="chasis_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Engine Number:
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="engine_no"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Number of Cylinders :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="no_of_cylinders"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Horse Power :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="horse_power"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Size of Sparkling Plugs :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="size_of_sparkling_plug"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Tappet Adjustments :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="tappet"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Circuit Breaker Point Adjustment :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="circuit_breaker"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Firing Order :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="firing_order"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Wheel Base :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="wheel_base"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Type of Body :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="string"
                          name="body_type"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Front :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="front"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Size of Tyre :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="tyre_size"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Tyre Pressure Front Wheels :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="front_tyre_pressure"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Tyre Pressure Rear Wheels :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="rear_tyre_pressure"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Battery No :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="battery_no"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Battery Type :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="battery_type"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Battery Voltage :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="battery_volt"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of Supply :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="date"
                          name="date_of_supply"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Engine Number after First Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="engine_first_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Distance travelled before First Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="distance_before_first_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of First Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="date"
                          name="date_of_first_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Engine Number after Second Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="engine_second_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Distance travelled before Second Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="distance_before_second_overhaul"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Date of Second Overhaul :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="date"
                          name="date_of_second_overhaul"
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
                          Submit Form
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-3 card p-4 m-1" style={{maxHeight:"10vh"}}>
              <Link href={"/admin/vehicles"}>
                <Button className="w-100 mb-1">List Vehicles</Button>
              </Link>
            </div>
          </Row>
        </main>
    </main>
    <Scripts />
    <Script src="/assets/js/main.js"></Script>

    </>
    )
        
    
}