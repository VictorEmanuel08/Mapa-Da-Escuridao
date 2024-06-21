import React, { useState, useEffect } from "react";
import { app } from "../../api/api";
import { CreateMarker } from "../../components/Modals/CreateMarker";
import Modal from "react-modal";

export function Admin() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [marcadores, setMarcadores] = useState([]);
  const [newMarker, setNewMarker] = useState({
    nome: "",
    rua: "",
    bairro: "",
    numero: "",
    cidade: "",
    status: true,
  });

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/markers`);
      setMarcadores(response.data);
    };
    getData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMarker({
      ...newMarker,
      [name]: value,
    });
  };

  const handleAddMarker = async () => {
    try {
      await app.post("/markers", newMarker);
      setMarcadores([...marcadores, newMarker]);
      setNewMarker({
        nome: "",
        rua: "",
        bairro: "",
        numero: "",
        cidade: "",
        status: true,
      });
      alert("Marcador criado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "50%",
    },
  };

  return (
    <div className="w-full h-screen flex justify-center bg-[#F1F1F1] text-black">
      <div className="flex flex-col w-full max-w-2xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Lista de Marcadores</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
            onClick={openModal}
          >
            Adicionar Marcador
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Adicionar Marcador"
            shouldCloseOnOverlayClick={false}
          >
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 m-2 text-gray-700"
              >
                X
              </button>
              <CreateMarker />
            </div>
          </Modal>
        </div>

        {/* <div className="mb-4">
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            name="nome"
            placeholder="Nome"
            value={newMarker.nome}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            name="rua"
            placeholder="Rua"
            value={newMarker.rua}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={newMarker.bairro}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            name="numero"
            placeholder="Número"
            value={newMarker.numero}
            onChange={handleInputChange}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={newMarker.cidade}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white p-2 w-full"
            onClick={
              editingIndex === null
                ? handleAddMarker
                : () => handleUpdateMarker(editingIndex)
            }
          >
            {editingIndex === null
              ? "Adicionar Marcador"
              : "Atualizar Marcador"}
          </button>
        </div> */}

        <div className="flex flex-col space-y-2">
          {marcadores.map((marcador, index) => (
            <div
              key={index}
              className="border p-2 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Bairro:</strong> {marcador.bairro}
                </p>
                <p>
                  <strong>Rua:</strong> {marcador.rua}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-yellow-500 text-white p-2">Editar</button>
                <button className="bg-red-500 text-white p-2">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
