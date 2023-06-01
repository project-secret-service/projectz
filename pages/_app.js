import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';

import '@/functions/axiosApis';

export default function App({Component, pageProps}) {
    return <Component {...pageProps}/>
}
