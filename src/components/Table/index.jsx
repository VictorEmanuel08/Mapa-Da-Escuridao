import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { app } from "../../api/api";
import iconEscuridaoOn from "../../assets/iconEscuridaoOn.svg";
import iconEscuridaoOff from "../../assets/iconEscuridaoOff.svg";
import iconEsgotoOn from "../../assets/iconEsgotoOn.png";
import iconEsgotoOff from "../../assets/iconEsgotoOff.png";
import { EditMarker } from "../Modals/EditMarker";

export function Table({ searchTerm, isMarkerEscuridao }) {
  const [marcadores, setMarcadores] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let response;
      if (isMarkerEscuridao) {
        response = await app.get(`/markers`);
      } else if (!isMarkerEscuridao) {
        response = await app.get(`/esgotos`);
      }
      const sortedData = response.data.sort((a, b) =>
        a.bairro.localeCompare(b.bairro)
      );
      setMarcadores(sortedData);
    };
    getData();
  }, [isMarkerEscuridao]);

  function openModal(marcador) {
    setSelectedMarker(marcador);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedMarker(null);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "75%",
      borderRadius: "0.5rem",
    },
  };

  // Filtra os marcadores com base no termo de pesquisa
  const filteredMarkers = marcadores.filter((marcador) =>
    marcador.bairro.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredMarkers.map((marcador, index) => (
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
              {isMarkerEscuridao ? (
                <img
                  src={marcador.status ? iconEscuridaoOn : iconEscuridaoOff}
                  alt="icon"
                  className="w-10"
                />
              ) : (
                <img
                  src={marcador.status ? iconEsgotoOn : iconEsgotoOff}
                  alt="icon"
                  className="w-10"
                />
              )}
            </td>
            <td className="px-2 py-2 border-b border-[#FFD180]">
              {marcador.nome}
            </td>
            <td className="px-2 py-2 border-b border-[#FFD180]">
              <button
                onClick={() => openModal(marcador)}
                className="rounded-lg px-10 py-1 bg-blue_primary hover:bg-blue_secondary text-white"
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {selectedMarker && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Editar Marcador"
          shouldCloseOnOverlayClick={false}
          ariaHideApp={false}
        >
          <EditMarker
            isMarkerEscuridao={isMarkerEscuridao}
            closeModal={closeModal}
            id={
              isMarkerEscuridao
                ? selectedMarker.id_marker
                : selectedMarker.id_esgoto
            }
          />
        </Modal>
      )}
    </table>
  );
}
