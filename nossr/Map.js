"use client";
import { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { io } from "socket.io-client";

export function ChangeView({ coords }) {
  const map = useMap();
  map.flyTo(coords, map.getZoom(40));
  return null;
}

export default function Map() {
  const [geoData, setGeoData] = useState({
    lat: 23.324412854675057,
    lng: 85.27060490366891,
  });
  const [users, setUsers] = useState([]);
  const [center, setCenter] = useState({
    lat: 23.324412854675057,
    lng: 85.27060490366891,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoData({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
    const socket = io("http://localhost:3000", { transports: ["websocket"] });
    socket.on("connect", () => {
      socket.emit("join_map");
    });
    socket.on("location", (data) => {
   
      setCenter({
        lat: data.location.latitude,
        lng: data.location.longitude,
      });
      setGeoData({
        lat: data.location.latitude,
        lng: data.location.longitude,
      });
    });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={20}
      style={{ height: "80vh", width: "100wv" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <Marker position={center} /> */}
      <ChangeView coords={geoData} />
    </MapContainer>
  );
}
