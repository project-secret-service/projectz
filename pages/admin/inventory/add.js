import Router from "next/router";
import Link from "next/link";
import { Button, Row, Col } from "react-bootstrap";
import { addNewItem } from "@/functions/apiHandlers/inventory";
import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { fraction, multiply } from "mathjs";

export default function Home() {
  const [item, setItem] = useState({});
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState({});
  const [showUnitInputs, setShowUnitInputs] = useState(false);
  const [smallestUnit, setSmallestUnit] = useState({});

  function showUnit() {
    setShowUnitInputs(true);
  }

  function setItemUnit({ target: { name, value } }) {
    setUnit({ ...unit, [name]: value });
  }

  function AddToUnits() {
    let newUnit = {
      ...unit,
      conversions: [],
    };
    if (!units[0]) {
      setItem({
        ...item,
        name: item.name,
        smallest_unit: newUnit.name,
      });
      setSmallestUnit(newUnit);
      setUnits([...units, newUnit]);
      setUnit({
        name: "",
        to_unit: unit.name,
      });
      setShowUnitInputs(false);
      return;
    }

    let convertToUnit = unit.to_unit;
    let quantity = unit.quantity;

    let conversion = {
      to_unit: convertToUnit,
      conversion_factor: quantity,
    };
    newUnit.conversions = [conversion];

    //Add Reverse Conversion to Convert To Unit
    let foundUnit = units.find((item) => item.name === convertToUnit);
    if (foundUnit) {
      let reverseConversion = {
        to_unit: newUnit.name,
        conversion_factor: "1/" + quantity,
      };
      foundUnit.conversions = [...foundUnit.conversions, reverseConversion];
      console.log(foundUnit);
    }

    //Find Smallest Unit in To Unit
    let to_smallest = foundUnit.conversions.find(
      (item) => item.to_unit === smallestUnit.name
    );

    let newUnits = units;

    if (to_smallest) {
      let conversion = {
        to_unit: to_smallest.to_unit,
        conversion_factor: multiply(to_smallest.conversion_factor, quantity),
      };
      newUnit.conversions = [...newUnit.conversions, conversion];
      let reverseConversion = {
        to_unit: newUnit.name,
        conversion_factor: "1/" + conversion.conversion_factor,
      };
      let smallestUnitName = to_smallest.to_unit;

      let smallestUnit = newUnits.find(
        (item) => item.name === smallestUnitName
      );
      smallestUnit.conversions = [
        ...smallestUnit.conversions,
        reverseConversion,
      ];
    }

    setUnits([...newUnits, newUnit]);
    setUnit({
      name: "",
      to_unit: units[0].name,
    });
    setShowUnitInputs(false);
  }

  function CancelUnit() {
    setUnit({});
    setShowUnitInputs(false);
  }

  function setItemValue({ target: { name, value } }) {
    setItem({ ...item, [name]: value });
  }

  return (
    <>
      <AdminLayout title={`Add New Item`}>
        <main id="main" className="col-lg-11 main mt-n2 opac-80">
          <Row>
            <div className="col-lg-8">
              <div className="card p-5">
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      let data = {
                        ...item,
                        units: units,
                      };
                      addNewItem(e, data);
                    }}
                  >
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-3 col-form-label"
                      >
                        Name :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setItemValue}
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-3 col-form-label"
                      >
                        Description :
                      </label>
                      <div className="col-sm-7">
                        <input
                          onChange={setItemValue}
                          type="text"
                          name="description"
                          className="form-control"
                          placeholder="Enter Description"
                        />
                      </div>
                    </div>{" "}
                    <hr />
                    <div>
                      {units[0] && (
                        <>
                          <h5>Unit Conversion</h5>{" "}
                          <div className="mb-3">
                            {units.map((unit, index) => (
                              <div key={index} className="p-1 m-1">
                                <b> {unit.name} </b>
                                {unit.conversions[0] && (
                                  <>
                                    :{" "}
                                    {unit.conversions.map(
                                      (conversion, index) => (
                                        <span key={index}>
                                          {conversion.conversion_factor}{" "}
                                          {conversion.to_unit}{" "}
                                          {index !==
                                            unit.conversions.length - 1 && (
                                            <>, </>
                                          )}
                                        </span>
                                      )
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {showUnitInputs && (
                      <div className="p-4 m-2" style={{ border: "0px" }}>
                        <div className="row mb-3">
                          <label
                            htmlFor="inputText"
                            className="col-sm-3 col-form-label"
                          >
                            Unit Name :
                          </label>
                          <div className="col-sm-7">
                            <input
                              onChange={setItemUnit}
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Enter Unit Name"
                            />
                          </div>
                        </div>
                        {units[0] && (
                          <>
                            <div className="row mb-3">
                              <label className="col-sm-3">To Unit: </label>
                              <div className="col-sm-7">
                                <select
                                  name="to_unit"
                                  onChange={setItemUnit}
                                  defaultValue={units[0].name}
                                  className="form-select"
                                  aria-label="Default select Example"
                                >
                                  {units.map((unit, index) => (
                                    <option key={index} value={unit.name}>
                                      {unit.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="inputText"
                                className="col-sm-3 col-form-label"
                              >
                                Quantity :
                              </label>
                              <div className="col-sm-7">
                                <input
                                  onChange={setItemUnit}
                                  type="number"
                                  name="quantity"
                                  className="form-control"
                                  placeholder="Enter Quantity"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        <div className="d-flex justify-content-end">
                          <div className="m-1" style={{ textAlign: "right" }}>
                            <Button onClick={AddToUnits}>+ Add Unit</Button>
                          </div>
                          <div className="m-1" style={{ textAlign: "right" }}>
                            <Button
                              variant="light"
                              onClick={CancelUnit}
                              style={{ border: "1px solid black" }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    {!showUnitInputs && (
                      <div>
                        <div className="mb-3" style={{ textAlign: "right" }}>
                          <Button onClick={showUnit}>+ Add Unit</Button>
                        </div>
                      </div>
                    )}
                    <div className="row mb-3">
                      <div className="text-center">
                        <Button type="submit" className="btn btn-success w-100">
                          Add Item
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-3 card p-4" style={{ maxHeight: "60vh" }}>
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <hr />
              <Link href={"/admin/inventory/storage"}>
                <Button className="w-100 mb-1 btn-light">Storage</Button>
              </Link>
              <Link href={"/admin/inventory/history"}>
                <Button className="w-100 mb-1 btn-light">
                  Inventory History
                </Button>
              </Link>
              <Link href={"/admin/inventory/orders/order"}>
                <Button className="w-100 mb-1 btn-light">Order Items</Button>
              </Link>
              <Link href={"/admin/inventory/issues/issue"}>
                <Button className="w-100 mb-1 btn-light">Issue Items</Button>
              </Link>
              <Link href={"/admin/inventory/add"}>
                <Button className="w-100 mb-1 btn-light">
                  Create New Item
                </Button>
              </Link>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
