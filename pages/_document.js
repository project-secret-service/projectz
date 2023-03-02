import {Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script'
import Scripts from './components/Scripts'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <link href="/assets/img/favicon.png" rel="icon"/>
                <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon"/>
                <link href="https://fonts.gstatic.com" rel="preconnect"/>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"/>
                <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
                <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"/>
                <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet"/>
                <link href="/assets/vendor/quill/quill.snow.css" rel="stylesheet"/>
                <link href="/assets/vendor/quill/quill.bubble.css" rel="stylesheet"/>
                <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet"/>
                <link href="/assets/vendor/simple-datatables/style.css" rel="stylesheet"/>
                <link href="/assets/css/style.css" rel="stylesheet"/>
            </Head>
            <body>
                <Main/>
               
                <NextScript/>
            </body>
        </Html>
    )
}
