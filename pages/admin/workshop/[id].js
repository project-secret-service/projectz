import { useRouter } from 'next/router'
import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Header from "../../components/Header"
import SideBar from '../../components/Sidebar'
import axios from "axios"
import { useEffect,useState } from 'react'

async function GetMemoDetails(id){
  const res = await axios({
    url:"http://localhost:3000/defectmemos/"+id,
    withCredentials:true,
    method:"GET"
  });
  return res.data;
}

const Post = () => {
  const [memo,setMemos] = useState({});
  const router = useRouter();
  const { id } = router.query
  useEffect(()=>{
    if(!router.isReady) return;
    const {id} = router.query
    GetMemoDetails(id).then((data)=>{
      console.log(data);
      setMemos(data);
      console.data
    });
  }, [router.isReady]);
  
  return( 
    <>
        <Head>
          <title>Memo Details</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <SideBar/> 
        <main className={styles.main}>
                      
          <div style={{ marginTop: "1rem ", marginLeft: 10, marginRight: 10,height: '80%'}}>  
            <div style={{fontSize:"4rem",marginTop: "1rem",marginBottom:"2rem"}}>
              <span>MEMO DETAILS</span>
              <hr  style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 2.5,                
                }}/>
            </div>                                
            <table className="table">
              <tbody>
                <tr>
                    <th scope="row">1.</th>
                    <td>Date :</td>
                    <td>{memo.date}</td>
                </tr>
                <tr>
                    <th scope="row">2.</th>
                    <td>Vehicle No :</td>
                    <td>{memo.vehicle_no}</td>
                </tr>
                <tr>
                    <th scope="row">3.</th>
                    <td>Vehicle Model :</td>
                    <td>{memo.vehicle_model}</td>
                </tr>
                <tr>
                    <th scope="row">4.</th>
                    <td>Vehicle Make :</td>
                    <td>{memo.vehicle_make}</td>
                </tr>
                <tr>
                    <th scope="row">5.</th>
                    <td>Vehicle Type :</td>
                    <td>{memo.vehicle_type}</td>
                </tr>
                <tr>
                    <th scope="row">6.</th>
                    <td>Kilometers Run :</td>
                    <td>{memo.kilometers_run}</td>
                </tr>
                <tr>
                    <th scope="row">7.</th>
                    <td>Condition Of Engine :</td>
                    <td>{memo.condition_of_engine}</td>
                </tr>
                <tr>
                    <th scope="row">8.</th>
                    <td>Defect :</td>
                    <td>{memo.defect}</td>
                </tr>
                <tr>
                    <th scope="row">9.</th>
                    <td>Defect Reason :</td>
                    <td>{memo.defect_reason}</td>
                </tr>
                <tr>
                    <th scope="row">10.</th>
                    <td>Required Parts :</td>
                    <td>{memo.required_parts}</td>
                </tr>
                <tr>
                    <th scope="row">11.</th>
                    <td>Availability Of Parts :</td>
                    <td>{memo.availability_of_parts}</td>
                </tr>
                <tr>
                    <th scope="row">12.</th>
                    <td>Execution Report :</td>
                    <td>{memo.execution_report}</td>
                </tr>
                <tr>
                    <th scope="row">13.</th>
                    <td>Remarks :</td>
                    <td>{memo.remarks}</td>
                </tr>
                <tr>
                    <th scope="row">14.</th>
                    <td>Designation :</td>
                    <td>{memo.designation}</td>
                </tr>
                <tr>
                    <th scope="row">15.</th>
                    <td>Signature :</td>
                    <td>{memo.signature}</td>
                </tr>
                                                    
              </tbody>
            </table>
          </div>       
        </main> 
    </>
  )  
}
export default Post