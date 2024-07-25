import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { app } from "../../api/api";

export function useMapType() {
  const [marcadores, setMarcadores] = useState([]);

  const location = useLocation();
  const isMapaEscuridao = location.pathname.endsWith("MapaEscuridao");
  const isMarkerEscuridao = location.pathname.endsWith("MarkersEscuridao");
  const isMapaEsgoto = location.pathname.endsWith("MapaEsgoto");
  const isMarkerEsgoto = location.pathname.endsWith("MarkersEsgoto");

  useEffect(() => {
    const getData = async () => {
      let response;
      if (isMapaEscuridao || isMarkerEscuridao) {
        response = await app.get(`/markers`);
      } else if (isMapaEsgoto || isMarkerEsgoto) {
        response = await app.get(`/esgotos`);
      }
      setMarcadores(response.data);
    };
    getData();
  }, [isMapaEscuridao, isMarkerEscuridao, isMapaEsgoto, isMarkerEsgoto]);

  return {
    marcadores,
    isMapaEsgoto,
    isMarkerEscuridao,
    isMapaEscuridao,
    isMarkerEsgoto,
  };
}
