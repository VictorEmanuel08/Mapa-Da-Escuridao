import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Maps } from "./pages/Maps";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Maps />} />
      </Routes>
    </BrowserRouter>
  );
}
