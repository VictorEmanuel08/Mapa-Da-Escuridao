import React from "react";
import { Marker } from "@react-google-maps/api";

export function CustomMarker({ position, label, onClick, icon }) {
  return (
    <Marker
      position={position}
      options={{
        label: {
          text: label,
          className: "m-[-50px]",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.15rem",
        },
        icon: {
          url: icon,
          scaledSize: new window.google.maps.Size(64, 64),
        },
      }}
      onClick={onClick}
    />
  );
}
