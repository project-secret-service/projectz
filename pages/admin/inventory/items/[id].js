import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetItemDetails } from "@/functions/apiHandlers/inventory";
import AdminLayout from "@/components/admin/AdminLayout";

const Post = () => {
  const [items, setItems] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetItemDetails(id).then((data) => {
      setItems(data);
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={"Item Details"}>
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <div
            style={{
              marginTop: "1rem ",
              marginLeft: 10,
              marginRight: 10,
              height: "80%",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              <span>ITEM DETAILS</span>
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
                  <td> Name</td>
                  <td>{items.name}</td>
                </tr>
                <tr>
                  <th scope="row">2.</th>
                  <td>Quantity:</td>
                  <td>{items.quantity}</td>
                </tr>
                <tr>
                  <th scope="row">3.</th>
                  <td>Cost of each Item</td>
                  <td>{items.rate}</td>
                </tr>
                <tr>
                  <th scope="row">3.</th>
                  <td>Total Cost</td>
                  <td>{items.amount}</td>
                </tr>
                <tr>
                  <th scope="row">4.</th>
                  <td>Description:</td>
                  <td>{items.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};
export default Post;
