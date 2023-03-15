import Head from 'next/head'
import Image from 'next/image'
import {Inter} from "next/font/google"
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Link from 'next/link'
import {Button} from 'react-bootstrap'

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

            </Head>
            <main className={`${
                styles.main
            } c`}>
                {/*    
    <Header/>
    <SideBar/> */}
                
               <div className={styles.landing_page}>
                    <Image className={styles.landing_page_image} src="/assets/img/3.jpg" alt="The langing Image background"  layout ='fill' objectFit='cover' objectPosition='center'/> 
                    <div className={styles.landing_page_content}>
                        <Image  src='/assets/img/CRPF-1.png'alt="landing page center image" width={200} height={200}/>
                        <Link href={'/login/'}>
                            <Button  className={styles.landing_page_button} variant="dark" >Enter</Button>
                        </Link>
                    </div>
               </div>
                                       
                
                

               


                {/* <Footer/> */}

                <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
                    <i className="bi bi-arrow-up-short"></i>
                </a>


                {/* <Scripts/> */}
                <Script src="/assets/js/main.js"></Script>
            </main>
        </>
    )
}