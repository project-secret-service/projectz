import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import Footer from "../components/Footer";
import Scripts from "../components/Scripts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header
          parentCallback={(data) => {
            console.log(data);
          }}
        />

        <SideBar title="dashboard" />

        <main id="main" className="main">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <div class="card">
                  <div class="card-header">
                    <h3>Driver Maintenance for all types of Vehicles</h3>
                  </div>
                  <div class="card-body">
                    <h4>A—DAILY MAINTENANCE</h4>
                    <div class="list-group">
                      <a href="#" class="list-group-item">
                        (a) Check petrol, oil and water.
                      </a>
                      <a href="#" class="list-group-item">
                        (b) Check tire pressures and inflate if necessary.
                      </a>
                      <a href="#" class="list-group-item">
                        (c) Start engine and check lights, windshield wiper,
                        trailer lights (where provided) and horn.
                      </a>
                      <a href="#" class="list-group-item">
                        (d) Check the air filter.
                      </a>
                      <a href="#" class="list-group-item">
                        (e) Check whether the ammeter is registering and oil
                        pressure gauge is indicating.
                      </a>
                      <a href="#" class="list-group-item">
                        (f) Check the operation of brake pedal.
                      </a>
                      <a href="#" class="list-group-item">
                        (g) Check vacuum brake system if fitted. Drain water
                        from air reservoirs.
                      </a>
                      <a href="#" class="list-group-item">
                        (h) Examine for oil, petrol and water.
                      </a>
                      <a href="#" class="list-group-item">
                        (i) Listen for unusual noises, rattles and uneven
                        running of the engine.
                      </a>
                      <a href="#" class="list-group-item">
                        (j) Check for oil leaks from all assemblies and under
                        chassis.
                      </a>
                      <a href="#" class="list-group-item">
                        (k) Switch off engine.
                      </a>
                    </div>
                    <h4>
                      Half Parade - (To be done during halts between long runs):
                    </h4>
                    <div class="list-group">
                      <a href="#" class="list-group-item">
                        (a) Check oil, water and petrol and replenish if
                        necessary.
                      </a>
                      <a href="#" class="list-group-item">
                        (b) Check for oil leaks from all assemblies and under
                        chassis.
                      </a>
                      <a href="#" class="list-group-item">
                        (c) Visually check tires to see that they are correctly
                        inflated and check tread for pieces of lint, stone and
                        glass, lodged in the road. If present, they will be
                        removed.
                      </a>
                    </div>
                    <h4>
                      Last Parade - (To be done after the vehicle has returned
                      from day duty):
                    </h4>
                    <p>Do all checks shown in Half Parade, and in addition</p>
                    <div class="list-group">
                      <a href="#" class="list-group-item">
                        (a) Examine road springs for loose U-bolts and broken
                        leaves.
                      </a>
                      <a href="#" class="list-group-item">
                        (b) If ordered, carry out frost precautions.
                      </a>
                      <a href="#" class="list-group-item">
                        (c) Enter mileage (kilometers run) and oil drawn.
                      </a>
                      <a href="#" class="list-group-item">
                        (d) Leave the vehicle clean, tidy and ready to
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}