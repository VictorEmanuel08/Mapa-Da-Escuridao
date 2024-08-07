import React from "react";
import { Marker } from "@react-google-maps/api";

export function CustomMarker({ position, label, onClick, icon }) {
  return (
    <Marker
      position={position}
      options={{
        label: {
          text: label,
          className:
            "m-[-50px] px-1 bg-gray-500 rounded border border-gray-700 font-bold ",
          color: "white",
          fontSize: "1.15rem",
          fontFamily: "poppins, sans-serif", // Adiciona a fonte Roboto
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
