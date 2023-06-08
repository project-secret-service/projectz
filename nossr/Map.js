import React from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useState, useEffect } from "react";

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        console.log(latitude, longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const FlyToUserLocation = () => {
    const map = useMap();
    useEffect(() => {
      if (userLocation) {
        map.flyTo(userLocation, 14, {
          duration: 2,
        });
      }
    }, [userLocation, map]);

    return null;
  };

  return (
    <MapContainer
      center={userLocation || [17.2504, 80.4819]}
      zoom={11.2}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer url="http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png" />

      {userLocation && (
        <Marker position={userLocation}>
          <FlyToUserLocation />
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
