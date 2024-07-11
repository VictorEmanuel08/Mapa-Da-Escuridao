import React, { useState } from "react";
import { InfoWindow } from "@react-google-maps/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdClose } from "react-icons/md";
import iconOn from "../../../assets/iconOn.svg";
import iconOff from "../../../assets/iconOff.svg";

export function CustomInfoWindow({ selected, setSelected }) {
  const [fullScreen, setFullScreen] = useState(false);

  if (!selected) return null;

  const getInfoWindowPosition = (position) => {
    return {
      lat: position.lat,
      lng: position.lng,
    };
  };

  const renderMedia = (file, small = false) => {
    const fileType = file.split(".").pop().toLowerCase();
    const mediaStyles = small
      ? "w-[120px] h-[120px] object-cover rounded-lg shadow-md"
      : "max-w-full max-h-full object-cover rounded-lg shadow-md";

    if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      return <img className={mediaStyles} src={file} alt="Media" />;
    } else if (["mp4", "webm", "ogg"].includes(fileType)) {
      return (
        <video className={mediaStyles} controls={!small} autoPlay={!small}>
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
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              toggleFullScreen();
            }
          }}
        >
          <div className="relative w-[600px] h-[600px] bg-blue_secondary flex items-center justify-center rounded-lg shadow-lg">
            <button
              onClick={toggleFullScreen}
              className="absolute top-4 right-4 text-white rounded-full z-50"
            >
              <MdClose className="text-white text-[32px]" />
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
                  <div className="max-w-[600px] max-h-[600px] flex items-center justify-center">
                    {renderMedia(file.arquivo)}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}

      <InfoWindow
        position={getInfoWindowPosition(selected.position)}
        onCloseClick={() => setSelected(null)}
        options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
      >
        <div className="w-[400px] text-gray-900 px-2 rounded-lg shadow-lg uppercase">
          <div className="flex flex-row justify-between items-center mb-2">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold mb-2">{selected.bairro}</h2>
              <p className="text-md font-medium mb-2">
                {selected.numero ? (
                  <>
                    {selected.rua}, {selected.numero}
                  </>
                ) : (
                  <>{selected.rua}</>
                )}
              </p>
              {selected.nome ? (
                <p className="text-md font-medium mb-2">
                  Telespectador: {selected.nome}
                </p>
              ) : (
                <></>
              )}
            </div>
            <img
              className="w-1/6"
              alt="Ícone de status"
              src={selected.status ? iconOn : iconOff}
            />
          </div>
          <div
            className={`flex flex-row ${
              selected.files.length === 1 ? "justify-center" : "justify-between"
            } items-center mb-2`}
          >
            {selected.files.map((file, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={toggleFullScreen}
              >
                {renderMedia(file.arquivo, true)}
              </div>
            ))}
          </div>
        </div>
      </InfoWindow>
    </>
  );
}
