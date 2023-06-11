import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../../nossr/Map"), {
  ssr: false,
});

import { GetUser } from "@/functions/loginAPI";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    GetUser().then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      <AdminLayout title={`Welcome ${user.name}`}>
        <main id="main" className="main col-10 mt-0">
          <MapWithNoSSR />
        </main>
      </AdminLayout>
    </>
  );
}
