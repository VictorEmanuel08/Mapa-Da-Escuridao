import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { MdMenu } from "react-icons/md";
import { MapStyle } from "../../style/MapStyle";
import iconEscuridaoGeneral from "../../assets/iconEscuridaoGeneral.svg";
import iconEscuridaoOn from "../../assets/iconEscuridaoOn.svg";
import iconEscuridaoOff from "../../assets/iconEscuridaoOff.svg";
import iconEsgotoOn from "../../assets/iconEsgotoOn.png";
import iconEsgotoOff from "../../assets/iconEsgotoOff.png";
import iconEsgotoGeneral from "../../assets/iconEscuridaoGeneral.svg";
import { Sidebar } from "../Sidebar";
import { CustomMarker } from "../Custom/CustomMarker";
import { CustomInfoWindow } from "../Custom/CustomInfoWindow";
import { useLocation } from "react-router-dom";

export function ContentMaps({ marcadores }) {
  // const [marcadores, setMarcadores] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filterType, setFilterType] = useState("general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mapRef = useRef(null); // Adicione uma referência ao mapa

  const location = useLocation();
  // Verifica se a URL termina com "MapaEsgoto" ou "MapaEscuridao"
  const isEsgoto = location.pathname.endsWith("MapaEsgoto");
  const isEscuridao = location.pathname.endsWith("MapaEscuridao");

  // Defina os ícones com base na URL
  const iconOn = isEscuridao ? iconEscuridaoOn : iconEsgotoOn;
  const textOn = isEscuridao ? "Com Luz" : "Sem problemas";
  const iconOff = isEscuridao ? iconEscuridaoOff : iconEsgotoOff;
  const textOff = isEscuridao ? "Sem Luz" : "Com problemas";
  const iconGeneral = isEscuridao ? iconEscuridaoGeneral : null; // Se não precisar de ícone geral para esgoto

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
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
              "Geocode não foi bem-sucedido pelo seguinte motivo: " + status
            );
            resolve(null);
          }
        });
      } else {
        reject(new Error("Google Maps não foi carregado"));
      }
    });
  }, []);

  useEffect(() => {
    if (isLoaded && marcadores && marcadores.length > 0) {
      Promise.all(
        marcadores.map((marcador) =>
          geocodeAddress(
            `${marcador.rua}, ${marcador.numero}, ${marcador.bairro}. ${marcador.cidade}`
          ).then((position) => ({
            id: marcador.id,
            position: position,
            label: marcador.nome,
            bairro: marcador.bairro,
            rua: marcador.rua,
            numero: marcador.numero,
            nome: marcador.nome,
            files: marcador.files || [],
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

  const resetZoom = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(13);
      mapRef.current.panTo(initialPosition);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="relative w-full h-screen bg-background overflow-x-hidden font-poppins">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`absolute z-10 transform ${
          isSidebarOpen ? "translate-x-64" : "translate-x-0"
        } transition-transform duration-300 ease-in-out`}
      >
        <div
          className="absolute flex items-start justify-center w-[40px] h-[100px] top-4 left-0 bg-blue_primary p-4 rounded-r-lg shadow-lg text-white text-[24px] cursor-pointer"
          onClick={toggleSidebar}
        >
          <button className="text-[24px]">
            <MdMenu />
          </button>
        </div>
      </div>
      <div className="z-10 absolute flex flex-row items-center justify-around w-[347px] h-[100px] top-4 right-4 bg-[#1F3241] p-4 rounded-lg shadow-lg text-[16px]">
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => {
            setFilterType("off");
            resetZoom();
          }}
        >
          <div className="flex items-center justify-center">
            <img className="w-1/2" src={iconOff} alt="Ícone Desligado" />
          </div>
          <p>{textOff}</p>
        </button>
        {iconGeneral && (
          <button
            className="flex flex-col items-center justify-center"
            onClick={() => {
              setFilterType("general");
              resetZoom();
            }}
          >
            <div className="flex items-center justify-center">
              <img className="w-1/2" src={iconGeneral} alt="Ícone Geral" />
            </div>
            <p>Geral</p>
          </button>
        )}
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => {
            setFilterType("on");
            resetZoom();
          }}
        >
          <div className="flex items-center justify-center">
            <img className="w-1/2" src={iconOn} alt="Ícone Ligado" />
          </div>
          <p>{textOn}</p>
        </button>
      </div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={initialPosition}
        zoom={13}
        options={mapOptions}
        onClick={handleMapClick}
        onLoad={(map) => (mapRef.current = map)} // Adicione a referência do mapa aqui
      >
        {filterMarkers(filterType).map((marker, index) => (
          <CustomMarker
            key={index}
            position={marker.position}
            label={marker.bairro}
            zoom={13}
            onClick={() => setSelected(marker)}
            icon={marker.status ? iconEscuridaoOn : iconEscuridaoOff}
          />
        ))}
        <CustomInfoWindow selected={selected} setSelected={setSelected} />
      </GoogleMap>
    </div>
  );
}
