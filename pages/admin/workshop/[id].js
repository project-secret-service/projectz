import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import dateFormat from "dateformat";
import ReactToPrint from "react-to-print";
import { GetMemoDetails } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";

function printDiv(divName) {
  if (typeof document !== "undefined") {
    if (document.getElementById(divName) != null) {
      var printContents = document.getElementById(divName).innerHTML;
    }

    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}

const Post = () => {
  const [memo, setMemos] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetMemoDetails(id).then((data) => {
      setMemos(data);
    });
  }, [router.isReady]);
  const componentRef = useRef();
  return (
    <>
      <AdminLayout title={`Memo Details`}>
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <div style={{ marginTop: "-2rem ", height: "100%" }}>
            <div
              style={{
                fontSize: "1rem",
                marginTop: "1rem",
                right: 10,
                position: "absolute",
              }}
            >
              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-lg"
                  >
                    Print
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
            <div id="printableArea" ref={componentRef} className="p-0 ">
              <div
                style={{
                  fontSize: "5rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              >
                <span>MEMO DETAILS</span>
                <hr
                  style={{
                    color: "#000000",
                    backgroundColor: "#000000",
                    height: 2.5,
                  }}
                />
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">1.</th>
                    <td>Date :</td>
                    <td>
                      {memo.date &&
                        dateFormat(memo.date, "dS mmmm, yyyy - dddd")}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2.</th>
                    <td>Vehicle No :</td>
                    <td>{memo.vehicle_no}</td>
                  </tr>
                  <tr>
                    <th scope="row">3.</th>
                    <td>Vehicle Model :</td>
                    <td>{memo.vehicle_model}</td>
                  </tr>
                  <tr>
                    <th scope="row">4.</th>
                    <td>Vehicle Make :</td>
                    <td>{memo.vehicle_make}</td>
                  </tr>
                  <tr>
                    <th scope="row">5.</th>
                    <td>Vehicle Type :</td>
                    <td>{memo.vehicle_type}</td>
                  </tr>
                  <tr>
                    <th scope="row">6.</th>
                    <td>Kilometers Run :</td>
                    <td>{memo.kilometers_run}</td>
                  </tr>
                  <tr>
                    <th scope="row">7.</th>
                    <td>Condition Of Engine :</td>
                    <td>{memo.condition_of_engine}</td>
                  </tr>
                  <tr>
                    <th scope="row">8.</th>
                    <td>Defect :</td>
                    <td>{memo.defect}</td>
                  </tr>
                  <tr>
                    <th scope="row">9.</th>
                    <td>Defect Reason :</td>
                    <td>{memo.defect_reason}</td>
                  </tr>
                  <tr>
                    <th scope="row">10.</th>
                    <td>Required Parts :</td>
                    <td>{memo.required_parts}</td>
                  </tr>
                  <tr>
                    <th scope="row">11.</th>
                    <td>Availability Of Parts :</td>
                    <td>{memo.availability_of_parts == true ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th scope="row">12.</th>
                    <td>Execution Report :</td>
                    <td>{memo.execution_report}</td>
                  </tr>
                  <tr>
                    <th scope="row">13.</th>
                    <td>Remarks :</td>
                    <td>{memo.remarks}</td>
                  </tr>
                  <tr>
                    <th scope="row">14.</th>
                    <td>Designation :</td>
                    <td>{memo.designation}</td>
                  </tr>
                  <tr>
                    <th scope="row">15.</th>
                    <td>Signature :</td>
                    <td>{memo.signature == true ? "Yes" : "No"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};
export default Post;
