import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

import { Provider } from "react-redux";
import store from "@/functions/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
