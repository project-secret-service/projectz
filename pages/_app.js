import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import AuthContextProvider from "@/functions/auth/AuthContextProvider";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
