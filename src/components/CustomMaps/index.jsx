// components/CustomMaps.js
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";
import { CustomMarker } from "../CustomMarker";
import { app } from "../../api/api";

export function CustomMaps() {
  const [marcadores, setMarcadores] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/markers`);
      setMarcadores(response.data);
    };
    getData();
  }, []);

  console.log(marcadores);

  const apiKey = process.env.REACT_APP_API_KEY_MAPS;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);

  const initialPosition = {
    lat: -2.52997716338038,
    lng: -44.23187759309891,
  };

  const darkMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#181818" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1b1b1b" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#373737" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#3c3c3c" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#4e4e4e" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3d3d3d" }],
    },
  ];

  const mapOptions = {
    styles: darkMapStyles,
    mapTypeControl: false, // Remove o controle de alternância de Map e Satellite
    streetViewControl: false, // Remove o boneco do Street View
    fullscreenControl: false, // Remove o botão de tela cheia
  };

  const geocodeAddress = useCallback((address) => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK") {
            const { lat, lng } = results[0].geometry.location;
            resolve({ lat: lat(), lng: lng() });
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
            resolve(null);
          }
        });
      } else {
        reject(new Error("Google Maps not loaded"));
      }
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const Markers = [
        {
          id: 1,
          address: "Rua da Panair, 186",
          label: "Posição Teste 1",
          status: true,
        },
        {
          id: 2,
          address: "Avenida Ana Jansen, 200",
          label: "Posição Teste 2",
          status: false,
        },
      ];

      Promise.all(
        Markers.map((marker) =>
          geocodeAddress(marker.address).then((position) => ({
            id: marker.id,
            position: position,
            label: marker.label,
            status: marker.status,
          }))
        )
      ).then((newMarkers) => {
        setMarkers(newMarkers.filter((marker) => marker.position !== null));
      });
    }
  }, [isLoaded, geocodeAddress]);

  const handleMapClick = useCallback(() => {
    setSelected(null);
  }, []);

  const getInfoWindowPosition = (position) => {
    return {
      lat: position.lat,
      lng: position.lng,
    };
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={initialPosition}
      zoom={13}
      options={mapOptions}
      onClick={handleMapClick}
    >
      {markers
        .filter((marker) => marker.status) // Apenas status=true
        .map((marker, index) => (
          <CustomMarker
            key={index}
            position={marker.position}
            label={marker.label}
            onClick={() => setSelected(marker)}
            icon={"/logo.png"}
          />
        ))}
      {selected && (
        <InfoWindow
          position={getInfoWindowPosition(selected.position)}
          onCloseClick={() => setSelected(null)}
          options={{ pixelOffset: new window.google.maps.Size(0, -20) }} // Ajuste de offset vertical para posicionar o InfoWindow
        >
          <div
            style={{ maxWidth: "400px" }}
            className="flex flex-col items-center text-black p-4"
          >
            <h2 className="text-lg font-bold mb-2">{selected.label}</h2>
            <img className="w-24 h-24 mb-2" src="/logo.png" alt="Logo" />
            <p className="mt-0 mb-2">
              Este é um texto que aparece ao clicar no marcador.
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
