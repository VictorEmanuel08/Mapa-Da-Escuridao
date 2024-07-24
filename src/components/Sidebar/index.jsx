import React from "react";
import { useLocation } from "react-router-dom";
import imageMapaDaEscuridao from "../../assets/imageMapaDaEscuridao.png";
import mapSelected from "../../assets/mapSelected.png";

export function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  // Verifica se a URL termina com "Markers"
  const isMarkersEscuridao = location.pathname.endsWith("MarkersEscuridao");
  const isMapEscuridao = location.pathname.endsWith("MapaEscuridao");
  const isMarkersEsgoto = location.pathname.endsWith("MarkersEsgoto");
  const isMapEsgoto = location.pathname.endsWith("MapaEsgoto");

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-blue_secondary text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-10`}
    >
      <div className="flex flex-col pl-8">
        <div className="pt-4 flex justify-end">
          <div
            className="flex items-center justify-center w-full h-[100px] bg-blue_primary rounded-l-lg text-[24px]"
            onClick={toggleSidebar}
          >
            <img src={imageMapaDaEscuridao} alt="Logo do Mapa da Escuridão" />
          </div>
        </div>
        <div className="flex flex-col mt-12 space-y-8">
          <a
            className="flex flex-row items-center relative"
            href="/MarkersEscuridao"
          >
            {isMarkersEscuridao && (
              <img src={mapSelected} className="w-1/10" alt="Aba selecionada" />
            )}
            <h2 className="text-xl font-semibold absolute left-12">
              Marcações
            </h2>
          </a>
          <a
            className="flex flex-row items-center relative"
            href="/MapaEscuridao"
          >
            {isMapEscuridao && (
              <img src={mapSelected} className="w-1/10" alt="Aba selecionada" />
            )}
            <h2 className="text-xl font-semibold absolute left-12">Mapa</h2>
          </a>
        </div>
      </div>
      <div className="flex flex-col mt-16 pl-8">
        <div className="pt-4 flex justify-end">
          <div
            className="flex items-center justify-center w-full h-[100px] bg-blue_primary rounded-l-lg text-[24px]"
            onClick={toggleSidebar}
          >
            <img src={imageMapaDaEscuridao} alt="Logo do Mapa do Esgoto" />
          </div>
        </div>
        <div className="flex flex-col mt-12 space-y-8">
          <a
            className="flex flex-row items-center relative"
            href="/MarkersEsgoto"
          >
            {isMarkersEsgoto && (
              <img src={mapSelected} className="w-1/10" alt="Aba selecionada" />
            )}
            <h2 className="text-xl font-semibold absolute left-12">
              Marcações
            </h2>
          </a>
          <a className="flex flex-row items-center relative" href="/MapaEsgoto">
            {isMapEsgoto && (
              <img src={mapSelected} className="w-1/10" alt="Aba selecionada" />
            )}
            <h2 className="text-xl font-semibold absolute left-12">Mapa</h2>
          </a>
        </div>
      </div>
    </div>
  );
}
