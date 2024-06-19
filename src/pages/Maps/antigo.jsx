import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
  } from "@react-google-maps/api";
  import React, { useState, useCallback } from "react";
  
  const inicialPosition = {
    lat: -2.5317074829432364,
    lng: -44.300474778252195,
  };
  
  const mapStyles = [
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }],
    },
  ];
  
  export function AntigoHome() {
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: "API",
    });
  
    const [selected, setSelected] = useState(null);
  
    const handleMapClick = useCallback(() => {
      setSelected(null);
    }, []);
  
    if (!isLoaded) return <div>Loading...</div>;
  
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={inicialPosition}
          zoom={15}
          options={{ styles: mapStyles }}
          onClick={handleMapClick}
        >
          <Marker
            position={inicialPosition}
            options={{
              label: {
                text: "Posição Teste",
                className: "m-[-30px]",
                //   color: "red",
                //   fontWeight: "bold",
              },
              icon: {
                url: "/logo.png",
                scaledSize: new window.google.maps.Size(24, 24), // Ajuste o tamanho do ícone conforme necessário
              },
            }}
            onClick={() => setSelected(inicialPosition)}
          />
          {selected && (
            <InfoWindow
              position={selected}
              onCloseClick={() => setSelected(null)}
            >
              <div className="flex flex-col items-center text-black">
                <h2 className="text-lg font-bold mb-2">Posição Teste</h2>
                <img className="w-24 h-24 mb-2" src="/logo.png" alt="Logo" />
                <p>Este é um texto que aparece ao clicar no marcador.</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  }
  