import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Maps } from "./pages/Maps";
import { Admin } from "./pages/Admin";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Maps />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
