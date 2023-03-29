import { useRouter } from 'next/router'
import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Header from "../../components/Header"
import SideBar from '../../components/Sidebar'
import Link from "next/link"
import { Button } from "react-bootstrap"
import axios from "axios"
import { useEffect,useState } from 'react'

async function GetDriverDetails(id){
  const res = await axios({
    url:"http://localhost:3000/drivers/"+id,
    withCredentials:true,
    method:"GET"
  });
  return res.data;
}

const Post = () => {
  const [driver,setDrivers] = useState({});
  const router = useRouter();
  const { id } = router.query
  useEffect(()=>{
    if(!router.isReady) return;
    const {id} = router.query
    GetDriverDetails(id).then((data)=>{
      setDrivers(data);
      console.data
    });
  }, [router.isReady]);
  
  return( 
    <>
        
        <Header/>
        <SideBar/> 
        <main className={styles.main}>
                      
          <div style={{ marginTop: "1rem ", marginLeft: 10, marginRight: 10,height: '80%'}}>  
            <div style={{fontSize:"4rem",marginTop: "1rem",marginBottom:"2rem"}}>
              <span>DRIVER DETAILS</span>
              <hr  style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 2.5,                
                }}/>
            </div>
            <div style={{width: '3rem',   padding: '4rem',  margin: '1.8rem'}}>
              <div class="card" style={{width: "12rem",float:'left'}}>
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"  style={{width: '100%'}}
                     alt="Avatar" />
              </div>
            </div>                                 
            <table class="table">
              <tbody>
                <tr>
                    <th scope="row">1.</th>
                    <td>Sl no:</td>
                    <td>{driver.sl_no}</td>
                </tr>
                <tr>
                    <th scope="row">2.</th>
                    <td>Name:</td>
                    <td>{driver.name}</td>
                </tr>
                <tr>
                    <th scope="row">3.</th>
                    <td>Rank:</td>
                    <td>{driver.rank}</td>
                </tr>
                <tr>
                    <th scope="row">4.</th>
                    <td>License No:</td>
                    <td>{driver.license_no}</td>
                </tr>
                <tr>
                    <th scope="row">5.</th>
                    <td>Date from:</td>
                    <td>{driver.date_from}</td>
                </tr>
                <tr>
                    <th scope="row">5.</th>
                    <td>Date to:</td>
                    <td>{driver.date_to}</td>
                </tr>
                <tr>
                    <th scope="row">5.</th>
                    <td>Approved by MTO:</td>
                    <td>{driver.approval_mto}</td>
                </tr>
                                                    
              </tbody>
            </table>
          </div>       
        </main> 
    </>
  )  
}
export default Post