import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { MapaEscuridao } from "./pages/Escuridao/Map";
import { MarkerEscuridao } from "./pages/Escuridao/Marker";
import { MapaEsgoto } from "./pages/Esgoto/Map";
import { MarkerEsgoto } from "./pages/Esgoto/Marker";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/MapaEscuridao" />} />
        <Route path="/MapaEscuridao" element={<MapaEscuridao />} />
        <Route path="/MarkersEscuridao" element={<MarkerEscuridao />} />
        <Route path="/MapaEsgoto" element={<MapaEsgoto />} />
        <Route path="/MarkerEsgoto" element={<MarkerEsgoto />} />
      </Routes>
    </BrowserRouter>
  );
}
