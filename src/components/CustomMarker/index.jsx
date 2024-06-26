import React from "react";
import { Marker } from "@react-google-maps/api";

export function CustomMarker({ position, label, onClick, icon }) {
  return (
    <Marker
      position={position}
      options={{
        label: {
          text: label,
          className: "m-[-30px]",
          color: "white",
          fontWeight: "bold",
        },
        icon: {
          url: icon,
          scaledSize: new window.google.maps.Size(24, 24),
        },
      }}
      onClick={onClick}
    />
  );
}
