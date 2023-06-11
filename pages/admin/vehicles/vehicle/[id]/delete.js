import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import vehicle_styles from "@/styles/Vehicles.module.css";
import { Button, Col, Row } from "react-bootstrap";
import Router from "next/router";
import { GetVehicle, deleteVehicle } from "@/functions/apiHandlers/vehicles";
import AdminLayout from "@/pages/components/admin/AdminLayout";

export default function Home() {
  const [vehicle, setVehicle] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetVehicle(id).then((data) => {
      setVehicle(data);
    });
  }, [router.isReady]);
  return (
    <>
      <AdminLayout title={`Delete Vehicle`}>
        <main id="main" className="col-lg-11 main mt-0 opac-80">
          <Row>
            <Col lg="4" className="card m-2 p-5 text-center">
              <img
                src="/assets/img/car-icon-png-4258.png"
                width="80%"
                className="m-auto"
              />
              <div>
                <h4 className={vehicle_styles.vehicle_name}>{vehicle.name}</h4>
                <h4 className={vehicle_styles.vehicle_name}>
                  CRP : ({vehicle.vehicle_crp_no})
                </h4>
                REG No: {vehicle.registration_no}
              </div>
            </Col>
            <Col lg="6" className="card m-2 p-5 text-center">
              <span style={{ color: "red" }}>
                Are You Sure You Want To Delete
              </span>{" "}
              <br></br>
              <b>VEHICLE : {vehicle.name}</b>
              <b>CRP NO : {vehicle.vehicle_crp_no}</b>
              <b>REG NO : {vehicle.registration_no}</b>
              <br></br>
              <div>
                <Button
                  className="btn-success m-1"
                  onClick={() => {
                    deleteVehicle(vehicle._id);
                  }}
                >
                  YES
                </Button>
                <Button
                  className="btn-danger m-1"
                  onClick={() => {
                    Router.back();
                  }}
                >
                  NO
                </Button>
              </div>
            </Col>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
