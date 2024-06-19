import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";

const initialPosition = {
  lat: -2.5317074829432364,
  lng: -44.300474778252195,
};

// const mapStyles = [
//   {
//     featureType: "poi",
//     elementType: "all",
//     stylers: [{ visibility: "off" }],
//   },
//   {
//     featureType: "transit.station",
//     elementType: "labels.icon",
//     stylers: [{ visibility: "off" }],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.icon",
//     stylers: [{ visibility: "off" }],
//   },
//   {
//     featureType: "road.local",
//     elementType: "labels.text.fill",
//     stylers: [{ visibility: "on" }],
//   },
//   {
//     featureType: "road.local",
//     elementType: "labels.text.stroke",
//     stylers: [{ visibility: "on" }],
//   },
//   {
//     featureType: "administrative",
//     elementType: "labels.text.fill",
//     stylers: [{ visibility: "on" }],
//   },
//   {
//     featureType: "administrative",
//     elementType: "labels.text.stroke",
//     stylers: [{ visibility: "on" }],
//   },
// ];

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

export function Maps() {
  const apiKey = process.env.REACT_APP_API_KEY_MAPS;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [selected, setSelected] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const geocodeAddress = useCallback((address) => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const { lat, lng } = results[0].geometry.location;
          setMarkerPosition({ lat: lat(), lng: lng() });
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      geocodeAddress("Rua da Panair, 186 - Tirirical");
    }
  }, [isLoaded, geocodeAddress]);

  const handleMapClick = useCallback(() => {
    setSelected(null);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={initialPosition}
        zoom={15}
        options={{ styles: darkMapStyles }}
        // options={{ styles: mapStyles }}
        onClick={handleMapClick}
      >
        <Marker
          position={markerPosition}
          options={{
            label: {
              text: "Posição Teste",
              className: "m-[-35px]",
              color: "white",
              fontWeight: "bold",
            },
            icon: {
              url: "/logo.png",
              scaledSize: new window.google.maps.Size(24, 24),
            },
          }}
          onClick={() => setSelected(initialPosition)}
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
