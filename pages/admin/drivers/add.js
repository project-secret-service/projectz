import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import styless from '@/styles/Profile.module.css'
import Script from 'next/script'
import Header from '../../components/Header'
import SideBar from '../../components/Sidebar'
import Scripts from '../../components/Scripts'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Router from 'next/router'
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';

async function GetUsers() {
    const res = await axios({url: "https://projectx-production.up.railway.app/drivers/", method: "GET", withCredentials: true});
    return res.data;
}


async function addNewDriver(event) {
    event.preventDefault();
    console.log(event.target.driver);
    var data = {
        sl_no : event.target.sl_no.value,
        name : event.target.name.value,
        license_no : event.target.license_no.value,
        date_from : event.target.date_from.value,
        date_to : event.target.date_to.value,
        rank: event.target.rank.value
    }

    const res = await axios({url: "https://projectx-production.up.railway.app/drivers/add", withCredentials: true, method: "POST", data: data});
    console.log(res.data);
}

export default function Home() {
    const [drivers, setDrivers] = useState([]);
    const [errors, setErrors] = useState({sl_no: ""})
    useEffect(() => {
        GetUsers().then((data) => {
            setDrivers(data);
        });
    }, []);


    function OpenLink(link) {
        console.log(link);
        Router.push('/admin/drivers/' + link);
    }

    return (
        <>
            <Head>
                <title>Add Driver</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

            </Head>
            <main className={
                styles.main
            }>
                <Header/>
                <SideBar/>

                <main id="main" className="col-lg-10 main">
                    <div className="col-lg-10">

                        <div className="card">
                            <div className="card-body">
                                <h1>Add New Driver</h1>
                                <hr  style={{
                                    color: '#000000',
                                    backgroundColor: '#000000',
                                    height: 1.5,
                                    padding:'.2rem'              
                                }}/>

                                {/* <div className={styless.container}>
                                    <div className={styless.pictureContainer}>
                                        <div className={styless.picture}>
                                            <input type="file" id="image_input" accept="image/png , image/jpg" />
                                            <div id="display_image"></div>
                                        </div>
                                        <h4>Choose Picture</h4>
                                    </div>
                                </div> */}
                                
                                
                                <form onSubmit={addNewDriver}>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-5 col-form-label">Sl no:</label>
                                        <div className="col-sm-7">
                                            <input type="number" name='sl_no' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-5 col-form-label">Name :</label>
                                        <div className="col-sm-7">
                                            <input type="text" name='name' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-5 col-form-label">Rank:</label>
                                        <div className="col-sm-7">
                                            <input type="text" name='rank' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-5 col-form-label">License No:</label>
                                        <div className="col-sm-7">
                                            <input type="string" name='license_no' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-5 col-form-label">Date From:</label>
                                        <div className="col-sm-2">
                                            <input type="date" name='date_from' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-5 col-form-label">Date To:</label>
                                        <div className="col-sm-2">
                                            <input type="date" name='date_to' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-5 col-form-label">Approved by MTO:</label>
                                        <div className="col-sm-3">
                                            <input type="text" name='approval_mto' className="form-control"/>
                                            
                                        </div>
                                    </div>


                                    <div className="row mb-3">
                                        <div className="col-sm-10">
                                            <button type="submit" className="btn btn-primary"
                                                style={{float: "right"}}>
                                                    Add Driver
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

            </main>
            <Scripts/>
            <Script src="/assets/js/main.js"></Script>
        </>
    )
}
