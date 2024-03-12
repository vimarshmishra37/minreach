"use client";
import MapComponent from "./Components/MapContainer1";
import Map from "./leaflet js/BasicMap";
import React from "react";
export default function Home() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
  <Map/>
  </div>
  );
}
