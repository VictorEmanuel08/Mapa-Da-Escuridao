import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Maps } from "./pages/Maps";
import { Markers } from "./pages/Markers";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Maps />} />
        <Route path="/Markers" element={<Markers />} />
      </Routes>
    </BrowserRouter>
  );
}
