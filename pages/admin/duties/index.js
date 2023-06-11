import { useEffect, useState, useRef } from "react";
import { Row } from "react-bootstrap";
import { GetDutiesDesc, OpenDuty } from "@/functions/apiHandlers/duties";
import { DutiesRightSideMenu } from "@/components/admin/duties";
import AdminLayout from "@/components/admin/AdminLayout";
import dateFormat from "dateformat";
// import faker from "faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  // Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
  // Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "No of Duties Per Day",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

function Home() {
  const [duties, setDuties] = useState([]);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Duties",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    GetDutiesDesc().then((data) => {
      if (data.status != 401) {
        setDuties(data);
        data.sort((a, b) => {
          return new Date(a.out_datetime) - new Date(b.out_datetime);
        });
        const temp = {};
        data.forEach((duty) => {
          temp[dateFormat(duty.out_datetime, "dS, mmmm")] = 0;
        });
        data.forEach((duty) => {
          temp[dateFormat(duty.out_datetime, "dS, mmmm")]++;
        });
        let label = Array.from(Object.keys(temp));
        let no_of_vehicles = Array.from(Object.values(temp));
        setData({
          labels: label,
          datasets: [
            {
              label: "No of Duties",
              data: no_of_vehicles,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              pointStyle: "circle",
              pointRadius: 10,
              pointHoverRadius: 15,
            },
          ],
        });
      }
    });
  }, []);

  return (
    <>
      <AdminLayout title={"All Duties"}>
        <main id="main" className=" col-lg-11 main mt-0">
          <div className="d-flex justify-content-between"></div>
          <Row>
            <div className="col-lg-8">
              <div className="row m-1">
                <div className="col card p-3">
                  Today
                  <div className="row">
                    <div
                      className="p-3 col-4 text-center m-1"
                      style={{
                        backgroundColor: "#ebe2e578",
                        borderRadius: "50%",
                        paddingBottom: "50%",
                      }}
                    >
                      <span style={{ fontSize: "2.5rem", color: "red" }}>
                        12
                      </span>
                    </div>
                    <div className="p-3 col-7">
                      <span style={{ fontSize: "1.5rem", color: "#564282" }}>
                        Vehicles On Duty
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-around">
                    <span>Vehicles Available </span>:
                    <span
                      style={{
                        float: "right",
                        color: "green",
                      }}
                    >
                      10
                    </span>
                  </div>
                </div>
                <div className="col card m-1 p-3">Hello</div>
                <div className="col card m-1 p-3">Hello</div>
              </div>
              <div className="card p-5">
                <Line options={options} data={data} />
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1 opac-80"
              style={{ maxHeight: "70vh" }}
            >
              <DutiesRightSideMenu disable={"all_duties"} />
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}

export default Home;
