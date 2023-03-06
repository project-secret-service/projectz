import {useRouter} from 'next/router'

import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Header from '../../components/Header'
import SideBar from '../../components/Sidebar'
import Scripts from '../../components/Scripts'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Router from 'next/router'
import cardstyles from '@/styles/cards.module.css'
import {Tab, Row, Col, ListGroup} from 'react-bootstrap'

async function GetVehicle(id) {
    const res = await axios({
        url: "http://localhost:3000/vehicles/" + id,
        method: "GET",
        withCredentials: true
    });
    return res.data;
}


var data = {

    "_id": "6400ad885f9f875b2a8a50fb",
    "vehicle_no": "6446",
    "vehicle_sl_no": 1,
    "name": "Hero Honda",
    "registration_no": "JH4554",
    "year_of_manufacture": 2022,
    "vehicle_type": "TWOWHEELER",
    "no_of_wheels": 2,
    "cost": 50000,
    "date_of_supply": "2023-03-09T00:00:00.000Z",
    "chasis_no": 34,
    "engine_no": 34,
    "no_of_cylinders": 4,
    "horse_power": 56,
    "size_of_sparkling_plug": 4,
    "tappet": "4",
    "circuit_breaker": "4",
    "firing_order": "4",
    "wheel_base": "4",
    "body_type": "4",
    "front": "4",
    "tyre_size": "4",
    "front_tyre_pressure": "4",
    "rear_tyre_pressure": "4",
    "battery_type": "4",
    "battery_volt": "4",
    "battery_no": "4",
    "date_of_service": "2023-03-08T00:00:00.000Z",
    "engine_first_overhaul": 4,
    "distance_before_first_overhaul": 4,
    "date_of_first_overhaul": "2023-03-10T00:00:00.000Z",
    "engine_second_overhaul": 6,
    "distance_before_second_overhaul": 44,
    "date_of_second_overhaul": "2023-03-09T00:00:00.000Z",
    "health_score": 0,
    "totalkilom": 0,
    "fuelatp": 0,
    "totalfuelused": 0,
    "kmpl": 10,
    "category": "LMV",
    "fuels": [],
    "missions": [],
    "jobCards": [],
    "defectMemos": [],
    "__v": 0

}

export default function Home() {
    const [vehicle, setVehicle] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (! router.isReady) 
            return;
        


        const {id} = router.query;
        GetVehicle(id).then((data) => {
            console.log(data);
            setVehicle(data);
        });

    }, [router.isReady]);
    return (
        <>
            <Head>
                <title>Vehicle Details</title>
                <meta name="description" content="Display All Vehicle Details"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <main className={
                styles.main
            }>
                <Header/>
                <SideBar/>

                <main id="main" className="col-lg-9 main">
                    {
                    vehicle.vehicle_no
                }
                    {
                    vehicle.vehicle_sl_no
                } </main>

            </main>
            <Scripts/>
            <Script src="/assets/js/main.js"></Script>
        </>
    )
}
