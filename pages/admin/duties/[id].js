import { useRouter } from 'next/router'
import Head from "next/head"
//import styles from "@/styles/Vehicles.module.css"
//import Navbar from "../components/navbar"
//import Footer from "../components/footer"
import Link from "next/link"
import { Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios"

async function GetDuties(id){
  const res= await axios({
        url:'http://localhost:3000/duty_log/'+id,
        withCredentials:true,
        method:"GET"
  });
  return res.data;
}

export default function AdminDashboard(){
  const router = useRouter()
  
  const [duty,setDuty]=useState({});
  useEffect(()=>{
    if(!router.isReady) return;
    const { id } = router.query
    GetDuties(id).then((data)=>{
          console.log(data);
          setDuty(data);
      });
  }, [router.isReady]);

  return(
      <>
      <h1>hello</h1>
      </>
)
  }