'use client'
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { Popup } from "react-leaflet";
import {io} from "socket.io-client";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    router: new L.Routing.OSRMv1({
      serviceUrl: "http://localhost:5000/route/v1",
    }),
    waypoints: [L.latLng(23.99662, 85.36911), L.latLng(22.80278, 86.18545)],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: false,
    addWaypoints: true,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

export default function Map() {
  const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });
  const [center, setCenter] = useState([64.536634, 16.779852]);
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoData({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCenter([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "80vh", width: "100wv" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RoutingMachine />
    </MapContainer>
  );
}
