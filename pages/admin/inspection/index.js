import { useEffect, useState } from "react";
import Router from "next/router";
import { GetInspectionHistory } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [inspection, setInspectionHistory] = useState([]);
  useEffect(() => {
    GetInspectionHistory().then((data) => {
      setInspectionHistory(data);
    });
  }, []);
  function OpenLink(link) {
    Router.push("/admin/inspection/" + link);
  }
  return (
    <>
      <AdminLayout title={"Inspection History"}>
        <main id="main" className=" col-lg-9 main">
          <h1>Inspection History</h1>
          <hr
            style={{
              color: "#000000",
              backgroundColor: "#000000",
              height: 2.5,
              borderColor: "#000000",
            }}
          />
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vehicle No</th>
                <th scope="col">Date</th>
                <th scope="col">Remarks</th>
              </tr>
            </thead>
            <tbody style={{ cursor: "pointer" }}></tbody>
          </table>
        </main>
      </AdminLayout>
    </>
  );
}
