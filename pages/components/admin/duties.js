import { Button } from "react-bootstrap";
import Router from "next/router";
import Link from "next/link";

export function DutiesRightSideMenu({ disable }) {
  return (
    <>
      <Button
        onClick={() => {
          Router.back();
        }}
        className="w-100 mb-1 btn-dark"
      >
        BACK
      </Button>
      <hr />
      {!(disable === "all_duties") && (
        <Link href={"/admin/duties/"}>
          <Button className="w-100 mb-1 btn-light">
            <i className="bi bi-list-ul"></i>All Duties
          </Button>
        </Link>
      )}
      {!(disable === "add_duties") && (
        <Link href={"/admin/duties/add"}>
          <Button className="w-100 mb-1 btn-light">
            <i className="bi bi-plus-circle"> </i> Add Duties
          </Button>
        </Link>
      )}

      {!(disable === "update_duties") && (
        <Link href={"/admin/duties/update"}>
          <Button className="w-100 mb-1 btn-light">
            <i className="bi bi-list-task"></i> Update Duties
          </Button>
        </Link>
      )}

      {!(disable === "available_drivers") && (
        <Link href={"/admin/drivers/available"}>
          <Button className="w-100 mb-1 btn-light">
            <i className="bi bi-person-fill"></i> Available Drivers
          </Button>
        </Link>
      )}

      {!(disable === "available_vehicles") && (
        <Link href={"/admin/vehicles/available"}>
          <Button className="w-100 mb-1 btn-light">
            <i className="bi bi-truck-front"></i> Available Vehicles
          </Button>
        </Link>
      )}

      {!(disable === "print_duty_log") && (
        <Link href={"/admin/duties/print"}>
          <Button className="w-100 mb-1 btn-light">
            <i className="bi bi-printer"></i> Print Duty Log
          </Button>
        </Link>
      )}
    </>
  );
}
