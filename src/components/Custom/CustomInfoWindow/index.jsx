import React, { useState } from "react";
import { InfoWindow } from "@react-google-maps/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function CustomInfoWindow({ selected, setSelected }) {
  const [fullScreen, setFullScreen] = useState(false);

  if (!selected) return null;

  const getInfoWindowPosition = (position) => {
    return {
      lat: position.lat,
      lng: position.lng,
    };
  };

  const renderMedia = (file) => {
    const fileType = file.split(".").pop().toLowerCase();
    const mediaStyles =
      "max-w-full max-h-full object-cover rounded-lg shadow-md";

    if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      return <img className={mediaStyles} src={file} alt="Media" />;
    } else if (["mp4", "webm", "ogg"].includes(fileType)) {
      return (
        <video className={mediaStyles} controls>
          <source src={file} type={`video/${fileType}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <>
      {fullScreen && (
        <div className="fixed w-[500px] h-[500px] bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 p-2 z-50 bg-red-600 text-white rounded-full"
          >
            Close
          </button>
          <Carousel
            showThumbs={false}
            className="w-full h-full flex items-center justify-center"
          >
            {selected.files.map((file, index) => (
              <div
                key={index}
                className="w-full h-full flex items-center justify-center"
              >
                {renderMedia(file.arquivo)}
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <InfoWindow
        position={getInfoWindowPosition(selected.position)}
        onCloseClick={() => setSelected(null)}
        options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
      >
        <div className="w-[400px] text-gray-900 px-2 rounded-lg shadow-lg uppercase">
          <h2 className="text-lg font-bold mb-2">{selected.bairro}</h2>
          <p className="text-md font-medium">
            {selected.numero ? (
              <>
                {selected.rua}, {selected.numero}
              </>
            ) : (
              <>{selected.rua}</>
            )}
          </p>

          <p className="text-md font-medium">Telespectador: {selected.nome}</p>
          <div className="flex flex-row justify-between items-center">
            {selected.files.map((file, index) => (
              <div
                key={index}
                className="h-[100px] cursor-pointer"
                onClick={toggleFullScreen}
              >
                {renderMedia(file.arquivo)}
              </div>
            ))}
          </div>
        </div>
      </InfoWindow>
    </>
  );
}
