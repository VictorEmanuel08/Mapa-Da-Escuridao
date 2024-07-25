import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { MapaEscuridao } from "./pages/Escuridao/Map";
import { MarkerEscuridao } from "./pages/Escuridao/Marker";
// import { MapaEsgoto } from "./pages/Esgoto/Map";
// import { MarkerEsgoto } from "./pages/Esgoto/Marker";

//unir tudo em um só
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/MapaEscuridao" />} />
        {/* <Route path="/MapaEscuridao" element={<MapaEscuridao />} /> */}
        {/* <Route path="/MarkersEscuridao" element={<MarkerEscuridao />} /> */}
        {/* <Route path="/MapaEsgoto" element={<MapaEsgoto />} /> */}
        {/* <Route path="/MarkersEsgoto" element={<MarkerEsgoto />} /> */}

        <Route path="/MarkersEscuridao" element={<MarkerEscuridao />} />
        <Route path="/MarkersEsgoto" element={<MarkerEscuridao />} />

        <Route path="/MapaEscuridao" element={<MapaEscuridao />} />
        <Route path="/MapaEsgoto" element={<MapaEscuridao />} />
      </Routes>
    </BrowserRouter>
  );
}
