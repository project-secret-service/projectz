import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  return (
    <>
      <AdminLayout title="Law Book">
        <main id="main" className="main">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="card">
                  <div className="card-header">
                    <h3>Driver Maintenance for all types of Vehicles</h3>
                  </div>
                  <div className="card-body">
                    <h4>A—DAILY MAINTENANCE</h4>
                    <div className="list-group">
                      <a href="#" className="list-group-item">
                        (a) Check petrol, oil and water.
                      </a>
                      <a href="#" className="list-group-item">
                        (b) Check tire pressures and inflate if necessary.
                      </a>
                      <a href="#" className="list-group-item">
                        (c) Start engine and check lights, windshield wiper,
                        trailer lights (where provided) and horn.
                      </a>
                      <a href="#" className="list-group-item">
                        (d) Check the air filter.
                      </a>
                      <a href="#" className="list-group-item">
                        (e) Check whether the ammeter is registering and oil
                        pressure gauge is indicating.
                      </a>
                      <a href="#" className="list-group-item">
                        (f) Check the operation of brake pedal.
                      </a>
                      <a href="#" className="list-group-item">
                        (g) Check vacuum brake system if fitted. Drain water
                        from air reservoirs.
                      </a>
                      <a href="#" className="list-group-item">
                        (h) Examine for oil, petrol and water.
                      </a>
                      <a href="#" className="list-group-item">
                        (i) Listen for unusual noises, rattles and uneven
                        running of the engine.
                      </a>
                      <a href="#" className="list-group-item">
                        (j) Check for oil leaks from all assemblies and under
                        chassis.
                      </a>
                      <a href="#" className="list-group-item">
                        (k) Switch off engine.
                      </a>
                    </div>
                    <h4>
                      Half Parade - (To be done during halts between long runs):
                    </h4>
                    <div className="list-group">
                      <a href="#" className="list-group-item">
                        (a) Check oil, water and petrol and replenish if
                        necessary.
                      </a>
                      <a href="#" className="list-group-item">
                        (b) Check for oil leaks from all assemblies and under
                        chassis.
                      </a>
                      <a href="#" className="list-group-item">
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
                    <div className="list-group">
                      <a href="#" className="list-group-item">
                        (a) Examine road springs for loose U-bolts and broken
                        leaves.
                      </a>
                      <a href="#" className="list-group-item">
                        (b) If ordered, carry out frost precautions.
                      </a>
                      <a href="#" className="list-group-item">
                        (c) Enter mileage (kilometers run) and oil drawn.
                      </a>
                      <a href="#" className="list-group-item">
                        (d) Leave the vehicle clean, tidy and ready to
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
