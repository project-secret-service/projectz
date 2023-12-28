import { useEffect, useRef, useState } from "react";
import { GetProfile } from "@/functions/apiHandlers/profile";

import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    GetProfile().then((data) => {
      if (data.status != 401) setUser(data.user);
    });
  }, []);

  return (
    <>
      <AdminLayout title={"Profile"}>
        {user && <main id="main" className="main col-10 mt-n2"></main>}
      </AdminLayout>
    </>
  );
}
