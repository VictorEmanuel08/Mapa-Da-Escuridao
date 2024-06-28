import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Maps } from "./pages/Maps";
import { Markers } from "./pages/Markers";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Maps" />} />
        <Route path="/Map" element={<Navigate to="/Maps" />} />
        <Route path="/Mapa" element={<Navigate to="/Maps" />} />
        <Route path="/Maps" element={<Maps />} />
        <Route path="/Markers" element={<Markers />} />
      </Routes>
    </BrowserRouter>
  );
}
