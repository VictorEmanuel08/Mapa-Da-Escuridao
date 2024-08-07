import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { MapaEscuridao } from "./pages/Map";
import { MarkerEscuridao } from "./pages/Marker";

//unir tudo em um só
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/MapaEscuridao" />} />
        <Route path="/Mapa" element={<Navigate to="/MapaEscuridao" />} />
        <Route path="/Maps" element={<Navigate to="/MapaEscuridao" />} />
        <Route path="/MapaEscuridao" element={<MapaEscuridao />} />
        <Route path="/MapaEsgoto" element={<MapaEscuridao />} />

        <Route path="/MarkersEscuridao" element={<MarkerEscuridao />} />
        <Route path="/MarkersEsgoto" element={<MarkerEscuridao />} />
      </Routes>
    </BrowserRouter>
  );
}
