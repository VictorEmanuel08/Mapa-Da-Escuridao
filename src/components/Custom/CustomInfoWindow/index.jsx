import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function CustomInfoWindow({ selected, setSelected }) {
  if (!selected) return null;

  const getInfoWindowPosition = (position) => {
    return {
      lat: position.lat,
      lng: position.lng,
    };
  };

  const renderMedia = (file) => {
    const fileType = file.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      return <img className="w-full h-full" src={file} alt="Media" />;
    } else if (["mp4", "webm", "ogg"].includes(fileType)) {
      return (
        <video className="w-full h-full" controls>
          <source src={file} type={`video/${fileType}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };

  return (
    <InfoWindow
      position={getInfoWindowPosition(selected.position)}
      onCloseClick={() => setSelected(null)}
      options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
    >
      <div
        style={{ maxWidth: "400px" }}
        className="flex flex-col items-center justify-start text-black px-4"
      >
        <h2 className="text-lg font-bold mb-2">{selected.bairro}</h2>
        <p className="text-md font-medium mb-1">
          {selected.rua}, {selected.numero}
        </p>
        <p className="text-md font-medium mb-1">
          Telespectador: {selected.nome}
        </p>
        <Carousel showThumbs={false} dynamicHeight={true} className="w-full">
          {selected.files.map((file, index) => (
            <div key={index} className="w-full h-full">
              {renderMedia(file.arquivo)}
            </div>
          ))}
        </Carousel>
      </div>
    </InfoWindow>
  );
}
