// Importa os componentes e bibliotecas necessários
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { MdMenu } from "react-icons/md";
import { MapStyleEscuridao } from "../../style/MapStyleEscuridao";
import { MapStyleEsgoto } from "../../style/MapStyleEsgoto";
import { Sidebar } from "../Sidebar";
import { CustomMarker } from "../Custom/CustomMarker";
import { CustomInfoWindow } from "../Custom/CustomInfoWindow";
import { useMapType } from "../../hooks/UseMapType"; //importação do tipo de mapa baseado na URL. Verificar como funciona o hook
import iconEscuridaoGeneral from "../../assets/iconEscuridaoGeneral.svg";
import iconEscuridaoOn from "../../assets/iconEscuridaoOn.svg";
import iconEscuridaoOff from "../../assets/iconEscuridaoOff.svg";
import iconEsgotoOn from "../../assets/iconEsgotoOn.png";
import iconEsgotoOff from "../../assets/iconEsgotoOff.png";
import iconEsgotoGeneral from "../../assets/iconEsgotoGeneral.png";

// Define o componente ContentMaps, que recebe a lista de marcadores como props
export function ContentMaps({ marcadores }) {
  // Declara estados para gerenciar marcadores, seleção de marcador, filtro e estado da barra lateral
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filterType, setFilterType] = useState("general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mapRef = useRef(null);

  // Hook personalizado para determinar o estilo do mapa com base no tipo
  const { isMapaEscuridao } = useMapType();

  // Define os ícones e textos com base no tipo de mapa (Escuridao ou Esgoto)
  const iconOn = isMapaEscuridao ? iconEscuridaoOn : iconEsgotoOn;
  const textOn = isMapaEscuridao ? "Com Luz" : "Sem problemas";
  const iconOff = isMapaEscuridao ? iconEscuridaoOff : iconEsgotoOff;
  const textOff = isMapaEscuridao ? "Sem Luz" : "Com problemas";
  const iconGeneral = isMapaEscuridao
    ? iconEscuridaoGeneral
    : iconEsgotoGeneral;

  // Função para alternar a visibilidade da barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Obtém a chave da API do Google Maps do ambiente
  const apiKey = process.env.REACT_APP_API_KEY_MAPS;

  // Hook para carregar a API do Google Maps
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  // Define a posição inicial do mapa
  const initialPosition = {
    lat: -2.52997716338038,
    lng: -44.23187759309891,
  };

  // Define as opções do mapa, incluindo estilos e controles
  const mapOptions = {
    styles: isMapaEscuridao ? MapStyleEscuridao : MapStyleEsgoto,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  // Função para geocodificar um endereço e retornar a posição (latitude e longitude)
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

  // Hook para atualizar os marcadores quando a API do Google Maps é carregada e a lista de marcadores é alterada
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

  // Função para definir a seleção de marcador como nula quando o mapa é clicado
  const handleMapClick = useCallback(() => {
    setSelected(null);
  }, []);

  // Função para filtrar os marcadores com base no tipo de filtro selecionado
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

  // Função para redefinir o zoom e a posição do mapa para a posição inicial
  const resetZoom = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(13);
      mapRef.current.panTo(initialPosition);
    }
  };

  // Exibe uma mensagem de carregamento se o Google Maps ainda não foi carregado
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="relative w-full h-screen bg-background overflow-x-hidden font-poppins">
      {/* Componente Sidebar para navegação lateral */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Botão para abrir/fechar a barra lateral */}
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

      {/* Botões para filtrar os marcadores */}
      <div className="z-10 absolute flex flex-row items-center justify-around w-[347px] h-[100px] top-4 right-4 bg-[#1F3241] p-4 rounded-lg shadow-lg text-[16px]">
        {/* Botão para mostrar marcadores "desligados" */}
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

        {/* Botão para mostrar marcadores "gerais" */}
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

        {/* Botão para mostrar marcadores "ligados" */}
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

      {/* Componente GoogleMap para exibir o mapa */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={initialPosition}
        zoom={13}
        options={mapOptions}
        onClick={handleMapClick}
        onLoad={(map) => (mapRef.current = map)}
      >
        {/* Renderiza marcadores filtrados no mapa */}
        {filterMarkers(filterType).map((marker, index) => (
          <CustomMarker
            key={index}
            position={marker.position}
            label={marker.bairro}
            zoom={13}
            onClick={() => setSelected(marker)}
            icon={
              isMapaEscuridao
                ? marker.status
                  ? iconEscuridaoOn
                  : iconEscuridaoOff
                : marker.status
                ? iconEsgotoOn
                : iconEsgotoOff
            }
          />
        ))}

        {/* Componente CustomInfoWindow para exibir informações sobre o marcador selecionado */}
        <CustomInfoWindow
          isMapaEscuridao={isMapaEscuridao}
          selected={selected}
          setSelected={setSelected}
        />
      </GoogleMap>
    </div>
  );
}
