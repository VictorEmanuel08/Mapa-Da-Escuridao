import React from "react";
import { Marker } from "@react-google-maps/api";

export function CustomMarker({ position, label, onClick, icon }) {

  return (
    <Marker
      position={position}
      options={{
        label: {
          text: label,
          className: "m-[-32px]",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
        },
        icon: {
          url: icon,
          scaledSize: new window.google.maps.Size(32, 32),
        },
      }}
      onClick={onClick}
    />
  );
}
