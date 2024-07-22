import React, { useEffect, useState } from "react";
import { ContentMaps } from "../../../components/ContentMaps";
import { app } from "../../../api/api";
import { useLocation } from "react-router-dom";

export function MapaEscuridao() {
  const [marcadores, setMarcadores] = useState([]);

  const location = useLocation();

  // Verifica se a URL termina com "MapaEsgoto" ou "MapaEscuridao"
  const isEsgoto = location.pathname.endsWith("MapaEsgoto");
  const isEscuridao = location.pathname.endsWith("MapaEscuridao");

  useEffect(() => {
    const getData = async () => {
      let response;
      if (isEscuridao) {
        response = await app.get(`/markers`);
      } else if (isEsgoto) {
        response = await app.get(`/esgotos`);
      }
      setMarcadores(response.data);
    };
    getData();
  }, [isEscuridao, isEsgoto]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
      <ContentMaps />
    </div>
  );
}
