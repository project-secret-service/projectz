import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Header from '../../components/Header'
import SideBar from '../../components/Sidebar'
import Scripts from '../../components/Scripts'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Router from 'next/router'

async function GetDuties() {
    const res = await axios({url: "http://localhost:3000/duty_log/", method: "GET", withCredentials: true});
    return res.data;
}


function call()
{
    <th scope="row">
                                           
    <i className="bi bi-truck"
    
                
        style={
            {
                
                color: "red",
                fontSize: "1rem"
            }
    }></i>
</th>
}


export default function Home() {
    const [duties, setDuties] = useState([]);
    useEffect(() => {
        GetDuties().then((data) => {
            setDuties(data);
        });
    }, []);
    console.log(duties);
    function OpenLink(link) {
        console.log(link);
        Router.push('/admin/duties/' + link);
    }
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

            </Head>
            <main className={
                styles.main
            }>
                <Header/>
                <SideBar/>

                <main id="main" className=" col-lg-9 main">
                    <h1>
                        All Duties
                    </h1>
                    <hr></hr>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Vehicle No</th>
                                <th scope="col">OUT TIME</th>
                                <th scope="col">DATE</th>
                                <th scope="col">Mission Satus</th>
                            </tr>
                        </thead>
                        <tbody style={
                            {cursor: "pointer"}
                        }>
                            {
                            duties.map((duty, index) => {
                                //console.log((duty.vehicle_id.vehicle_no));

                                //Extracted date from date field
                                var vv=new Date(duty.date)
                                var dat=vv.toLocaleDateString();
                                 
                                //To store the mission satus
                                var mission=duty.mission_ended
                                var v1;
                               
                               if(mission)
                               {
                                v1="completed"
                               }
                               else
                               {
                                v1="not completed"
                               }
                               
                               var outtime=new Date(duty.out_time)
                               var newoutime=outtime.toLocaleTimeString();

                                console.log(mission);
                                return (
                                    <tr key={
                                            index + 1
                                        }
                                        onClick={
                                            () => OpenLink(duty._id)
                                    }>
                                         
                                        <th scope="row">
                                           
                                            <i className="bi bi-truck" 
                                            
                                                        
                                                style={
                                                    {
                                                        
                                                        color: "red",
                                                        fontSize: "1rem"
                                                    }
                                            }></i>
                                        </th>
                                        <td>{
                                           duty.vehicle_id.vehicle_no
                                           
                                        }</td>
                                        <td>{
                                           duty.out_time.substring(11,19)
                                        }</td>
                                        <td>{
                                            dat
                                        }</td>
                                       
                                        <td>{v1}</td>
                                    </tr>
                                )
                            })
                        } </tbody>
                    </table>
                </main>

            </main>
            <Scripts/>
            <Script src="/assets/js/main.js"></Script>
           
        </>
    )
}