import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { MdMenu } from "react-icons/md";
import { app } from "../../../api/api";
import iconGeneral from "../../../assets/iconGeneral.svg";
import iconOn from "../../../assets/iconOn.svg";
import iconOff from "../../../assets/iconOff.svg";
import { Sidebar } from "../../../components/Sidebar";
import { CreateMarker } from "../../../components/Modals/CreateMarker";
import { Table } from "../../../components/Table";

export function MarkerEscuridao() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [marcadores, setMarcadores] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa

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
      // marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "75%",
      borderRadius: "0.5rem",
    },
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-x-hidden font-poppins">
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
        <div className="flex flex-col max-w-full p-8 ml-12 bg-background text-black space-y-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Cadastro de locais</h1>
          </div>
          <div className="flex flex-row max-w-full justify-start space-x-12">
            <div className="flex flex-row max-w-[50%] justify-between">
              <div className="flex flex-col max-w-[30%] border border-[#FFA300] rounded-lg p-3">
                <div className="flex flex-row items-center space-x-4">
                  <p className="font-bold text-2xl">{marcadores.length}</p>
                  <img
                    className="w-1/6"
                    src={iconGeneral}
                    alt="Ícone Lâmpada Parcialmente Desligada e Parcialmente Ligada"
                  />
                </div>
                <p className="font-normal text-lg">Bairros totais</p>
              </div>
              <div className="flex flex-col max-w-[30%] border border-[#FFA300] rounded-lg p-3">
                <div className="flex flex-row items-center space-x-4">
                  <p className="font-bold text-2xl">
                    {
                      marcadores.filter((marcador) => marcador.status === true)
                        .length
                    }
                  </p>
                  <img
                    className="w-1/6"
                    src={iconOn}
                    alt="Ícone Lâmpada Ligada"
                  />
                </div>
                <p className="font-normal text-lg">Bairros com luz</p>
              </div>
              <div className="flex flex-col max-w-[30%] border border-[#FFA300] rounded-lg p-3">
                <div className="flex flex-row items-center space-x-4">
                  <p className="font-bold text-2xl">
                    {
                      marcadores.filter((marcador) => marcador.status === false)
                        .length
                    }
                  </p>
                  <img
                    className="w-1/6"
                    src={iconOff}
                    alt="Ícone Lâmpada Desligada"
                  />
                </div>
                <p className="font-normal text-lg">Bairros sem luz</p>
              </div>
            </div>
            <button
              className="flex items-center justify-center w-[13%] h-1/2 rounded-lg p-3 bg-blue_primary hover:bg-blue_secondary text-white"
              onClick={openModal}
            >
              Adicionar Marcador
            </button>
          </div>
          <input
            className="max-w-[50%] bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none"
            placeholder="Pesquisar bairro"
            value={searchTerm} // Valor do campo de pesquisa
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
          />
          <div className="overflow-x-auto">
            <Table searchTerm={searchTerm} />
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Adicionar Marcador"
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
          >
            <CreateMarker closeModal={closeModal} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
