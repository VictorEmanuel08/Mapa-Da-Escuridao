import React, { useState, useEffect } from "react";
import { app } from "../../api/api";
import iconOn from "../../assets/iconOn.svg";
import iconOff from "../../assets/iconOff.svg";

export function Table() {
  const [marcadores, setMarcadores] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/markers`);
      setMarcadores(response.data);
    };
    getData();
  }, []);

  console.log(marcadores);

  return (
    <table className="min-w-[85%]">
      <thead>
        <tr>
          <th className="pr-2 py-2 text-left text-lg font-bold border-b border-[#FFD180]">
            Bairro
          </th>
          <th className="px-2 py-2 text-left text-lg font-bold border-b border-[#FFD180]">
            Rua
          </th>
          <th className="px-2 py-2 text-left text-lg font-bold border-b border-[#FFD180]">
            Número
          </th>
          <th className="px-2 py-2 text-center text-lg font-bold border-b border-[#FFD180]">
            Status
          </th>
          <th className="px-2 py-2 text-left text-lg font-bold border-b border-[#FFD180]">
            Telespectador
          </th>
          <th className="px-2 py-2 text-left text-lg font-bold border-b border-[#FFD180]"></th>
        </tr>
      </thead>
      <tbody>
        {marcadores.map((marcador, index) => (
          <tr key={index}>
            <td className="pr-2 py-2 border-b border-[#FFD180]">
              {marcador.bairro}
            </td>
            <td className="px-2 py-2 border-b border-[#FFD180]">
              {marcador.rua}
            </td>
            <td className="px-2 py-2 border-b border-[#FFD180]">
              {marcador.numero}
            </td>
            <td className="px-2 py-2 border-b border-[#FFD180] flex justify-center">
              {marcador.status}
              {marcador.status === true ? (
                <img src={iconOn} alt="icon" className="w-12" />
              ) : (
                <img src={iconOff} alt="icon" className="w-10" />
              )}
            </td>
            <td className="px-2 py-2 border-b border-[#FFD180]">
              {marcador.nome}
            </td>
            <td className="px-2 py-2 border-b border-[#FFD180]">
              <button className="rounded-lg px-10 py-1 bg-blue_primary hover:bg-blue_secondary text-white">
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
