import { useRouter } from 'next/router'
import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Header from "../../../components/Header"
import SideBar from '../../../components/Sidebar'
import axios from "axios"
import { useEffect,useState } from 'react'

async function GetItemDetails(id){
  const res = await axios({
    url:"http://localhost:3000/inventory/items/"+id,
    method:"GET",
    withCredentials:true
  });
  return res.data;
}

const Post = () => {
  const [items,setItems] = useState({});
  const router = useRouter();
  const { id } = router.query
  useEffect(()=>{
    if(!router.isReady) return;
    const {id} = router.query
    GetItemDetails(id).then((data)=>{
      console.log(data);
      setItems(data);
    });
  }, [router.isReady]);
  
  return( 
    <>
        <Head>
          <title>Item Details</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <SideBar/> 
        <main className={styles.main}>
                      
          <div style={{ marginTop: "1rem ", marginLeft: 10, marginRight: 10,height: '80%'}}>  
            <div style={{fontSize:"4rem",marginTop: "1rem",marginBottom:"2rem"}}>
              <span>ITEM DETAILS</span>
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
                    <td> Name</td>
                    <td>{items.name}</td>
                </tr>
                <tr>
                    <th scope="row">2.</th>
                    <td>Quantity:</td>
                    <td>{items.quantity}</td>
                </tr>
                <tr>
                    <th scope="row">3.</th>
                    <td>Cost of each Item</td>
                    <td>{items.rate}</td>
                </tr>
                <tr>
                    <th scope="row">3.</th>
                    <td>Total Cost</td>
                    <td>{items.amount}</td>
                </tr>
                <tr>
                    <th scope="row">4.</th>
                    <td>Description:</td>
                    <td>{items.description}</td>
                </tr>                               
              </tbody>
            </table>
          </div>       
        </main> 
    </>
  )  
}
export default Post