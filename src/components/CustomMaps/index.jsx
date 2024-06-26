import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { CustomMarker } from "../CustomMarker";
import { app } from "../../api/api";
import { MapStyle } from "../MapStyle";
import iconGeneral from "../../assets/iconGeneral.png";
import iconOn from "../../assets/iconOn.png";
import iconOff from "../../assets/iconOff.png";

export function CustomMaps() {
  const [marcadores, setMarcadores] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filterType, setFilterType] = useState("general");

  const apiKey = process.env.REACT_APP_API_KEY_MAPS;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const initialPosition = {
    lat: -2.52997716338038,
    lng: -44.23187759309891,
  };

  const mapOptions = {
    styles: MapStyle,
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
    const getData = async () => {
      const response = await app.get(`/markers`);
      setMarcadores(response.data);
    };
    getData();
  }, []);

  // async function AddMarker() {
  //   try {
  //     await app.post("/markers", {
  //       nome: 'telespectador',
  //       rua: "Rua da Panair",
  //       bairro: 'Tirirical',
  //       numero: 186,
  //       cidade: 'São Luís',
  //       status: false,
  //     });
  //     document.location.reload(true);
  //     alert("Marcador criado!");
  //   } catch {
  //     alert("Ocorreu um erro. Tente novamente.");
  //   }
  // }

  // AddMarker();

  useEffect(() => {
    if (isLoaded && marcadores.length > 0) {
      Promise.all(
        marcadores.map((marcador) =>
          geocodeAddress(
            `${marcador.rua}, ${marcador.numero}, ${marcador.bairro}. ${marcador.cidade}`
          ).then((position) => ({
            id: marcador.id,
            position: position,
            label: marcador.nome,
            bairro: marcador.bairro,
            status: marcador.status,
          }))
        )
      ).then((newMarkers) => {
        setMarkers(newMarkers.filter((marker) => marker.position !== null));
      });
    }
  }, [isLoaded, geocodeAddress, marcadores]);

  const handleMapClick = useCallback(() => {
    setSelected(null);
  }, []);

  const getInfoWindowPosition = (position) => {
    return {
      lat: position.lat,
      lng: position.lng,
    };
  };

  const filterMarkers = (type) => {
    switch (type) {
      case "off":
        return markers.filter((marker) => !marker.status);
      case "on":
        return markers.filter((marker) => marker.status);
      default:
        return markers;
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="relative w-full h-screen font-poppins">
      <div className="absolute flex flex-row items-center justify-around w-[347px] h-[100px] top-4 right-4 bg-[#1F3241] p-4 rounded-lg shadow-lg z-10 text-[16px]">
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => setFilterType("off")}
        >
          <div className="flex items-center justify-center">
            <img className="w-8" src={iconOff} alt="Ícone Lâmpada Desligada" />
          </div>
          <p>Sem Luz</p>
        </button>
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => setFilterType("on")}
        >
          <div className="flex items-center justify-center">
            <img className="w-12" src={iconOn} alt="Ícone Lâmpada Ligada" />
          </div>
          <p>Com Luz</p>
        </button>
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => setFilterType("general")}
        >
          <div className="flex items-center justify-center">
            <img
              className="w-10"
              src={iconGeneral}
              alt="Ícone Lâmpada Parcialmente Desligada e Parcialmente Ligada"
            />
          </div>
          <p>Geral</p>
        </button>
      </div>
      <div className="absolute flex flex-col items-center justify-start w-[40px] h-[100px] top-4 left-4 bg-[#1F3241] p-4 rounded-lg shadow-lg z-10">
        <button className="text-[24px]">
          <MdMenu />
        </button>
      </div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={initialPosition}
        zoom={13}
        options={mapOptions}
        onClick={handleMapClick}
      >
        {filterMarkers(filterType).map((marker, index) => (
          <CustomMarker
            key={index}
            position={marker.position}
            label={marker.bairro}
            onClick={() => setSelected(marker)}
            icon={marker.status ? iconOn : iconOff}
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
              <h2 className="text-lg font-bold mb-2">{selected.bairro}</h2>
              <img className="w-24 h-24 mb-2" src="/logo.png" alt="Logo" />
              <p className="mt-0 mb-2">
                Este é um texto que aparece ao clicar no marcador.
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
