import React, { useState, useEffect } from "react";
import { app } from "../../api/api";
import { Sidebar } from "../../components/Sidebar";
import { CreateMarker } from "../../components/Modals/CreateMarker";
import Modal from "react-modal";
import { MdMenu } from "react-icons/md";

export function Markers() {
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/markers`);
      setMarcadores(response.data);
    };
    getData();
  }, []);

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
    <div className="relative w-full h-screen bg-[#F1F1F1] overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`transform ${
          isSidebarOpen ? "translate-x-64" : "translate-x-0"
        } transition-transform duration-300 ease-in-out`}
      >
        <div
          className="absolute flex items-start justify-center w-[40px] h-[100px] top-4 left-0 bg-blue_primary p-4 rounded-r-lg shadow-lg text-white text-[24px] cursor-pointer"
          onClick={toggleSidebar}
        >
          <button className="text-[24px]">
            <MdMenu />
          </button>
        </div>
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
        </div>
      </div>
    </div>
  );
}
