import { useEffect, useState } from "react";
import Router from "next/router";
import { GetInspectionHistory } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "react-bootstrap";
import dateFormat from "dateformat";

export default function Home() {
  const [inspectionsHistory, setInspectionsHistory] = useState([]);
  useEffect(() => {
    GetInspectionHistory().then((data) => {
      if (data.length == 0) {
        return;
      }
      setInspectionsHistory(data);
    });
  }, []);

  return (
    <>
      <AdminLayout title={"Inspection History"}>
        <main
          id="main"
          className="col-lg-11 main row"
          style={{
            marginTop: "-2rem",
          }}
        >
          <div className="col-8">
            <div className="card p-3">
              {inspectionsHistory.length != 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Vehicle</th>
                      <th scope="col">Defects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectionsHistory.map((inspection, index) => {
                      let defects = "";
                      if (
                        inspection.engine &&
                        Object.keys(inspection.engine).length > 0
                      )
                        defects += "Engine, ";
                      if (
                        inspection.transmission &&
                        Object.keys(inspection.transmission).length > 0
                      )
                        defects += "Transmission, ";
                      if (
                        inspection.electrical &&
                        Object.keys(inspection.electrical).length > 0
                      )
                        defects += "Electrical, ";
                      if (
                        inspection.chassis &&
                        Object.keys(inspection.chassis).length > 0
                      )
                        defects += "Chaissis, ";
                      if (
                        inspection.lubrication &&
                        Object.keys(inspection.lubrication).length > 0
                      )
                        defects += "Lubrication , ";
                      defects = defects.substring(0, defects.length - 2);
                      return (
                        <tr
                          key={index}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            Router.push(
                              "/admin/workshop/inspections/" + inspection._id
                            );
                          }}
                        >
                          <th scope="row">{index + 1}</th>
                          <td>
                            {dateFormat(
                              inspection.date,
                              "dS mmmm, yyyy - DDDD"
                            )}
                          </td>
                          <td>{inspection.vehicle.name}</td>
                          <td>{defects}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <b>
                  No Inspections Found !
                  <br />
                  Please add an Inspection Reports to view them here .
                </b>
              )}
            </div>
          </div>
          <div className="col-3 card p-3">
            <Button
              className="mb-1"
              variant="dark"
              onClick={() => {
                Router.back();
              }}
            >
              BACK
            </Button>
            <hr />
            <Button
              className="mb-1 btn-light"
              onClick={() => {
                Router.push("/admin/workshop/inspections/add");
              }}
            >
              <i className="bi bi-plus-circle"></i> Add Inspection Report
            </Button>
            <hr />
            <Button
              className="mb-1 btn-light"
              onClick={() => {
                Router.push("/admin/workshop/defectmemos/");
              }}
            >
              <i className="bi bi-card-list"></i> Defect Memos
            </Button>
            <Button
              className="mb-1 btn-light"
              onClick={() => {
                Router.push("/admin/workshop/defectmemos/add");
              }}
            >
              <i className="bi bi-plus-circle"></i> Add Memo
            </Button>
            <hr />
            <Button
              className="mb-1 btn-light"
              onClick={() => {
                Router.push("/admin/workshop/jobcards");
              }}
            >
              <i className="bi bi-credit-card-2-front"></i> Job Cards
            </Button>
            <Button
              className="mb-1 btn-light"
              onClick={() => {
                Router.push("/admin/workshop/jobcards/add");
              }}
            >
              <i className="bi bi-plus-circle"></i> Add Job Card
            </Button>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
