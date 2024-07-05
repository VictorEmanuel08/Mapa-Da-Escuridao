import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import iconOn from "../../../assets/iconOn.svg";
import iconOff from "../../../assets/iconOff.svg";
import { app } from "../../../api/api";

export function EditMarker({ closeModal, id, varEdit }) {
  const [isChecked, setIsChecked] = useState(false);
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [status, setStatus] = useState(false);

  const [files, setFiles] = useState([null, null, null]);

  useEffect(() => {
    const getDataMarker = async () => {
      const response = await app.get(`/markers/${id}`);
      const data = response.data;
      setNome(data.nome || "");
      setBairro(data.bairro || "");
      setRua(data.rua || "");
      setNumero(data.numero || "");
      setStatus(data.status || false);
      setIsChecked(data.status || false);
      //OBRIGA O VETOR DE ARQUIVOS TER SEMPRE 3 ITENS
      const initialFiles = data.files ? data.files.slice(0, 3) : [];
      const paddedFiles = [
        ...initialFiles,
        ...Array(3 - initialFiles.length).fill(null),
      ];
      setFiles(paddedFiles);
      console.log(files);
      getDataFiles(data.id_marker);
    };
    getDataMarker();
  }, [id]);

  const getDataFiles = async (id) => {
    const response = await app.get(
      `/files/110460ef-9803-433e-b5cd-b6a38d7fb4e0`
    );
    // const response = await app.get(`/files/${id}`);
    const data = response.data;
    console.log(data);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setStatus(!isChecked);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...files];
      newFiles[index] = { ...newFiles[index], arquivo: file };
      setFiles(newFiles);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles[index] = null;
    setFiles(newFiles);
  };

  const handleUpdateMarker = async () => {
    try {
      const response = await app.put(`/markers/${id}`, {
        nome: nome,
        rua: rua,
        bairro: bairro,
        numero: numero,
        cidade: "São Luís",
        status: status,
      });
      if (response.status === 200) {
        handleUpdateFiles();
      }
      document.location.reload(true);
      alert("Marcador atualizado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  const handleUpdateFiles = async () => {
    files.forEach(async (file) => {
      if (file && file.arquivo) {
        const formData = new FormData();
        formData.append("arquivo", file.arquivo);

        try {
          await app.put(`/files/${file.id_file}`, formData);
        } catch {
          console.log("Erro: ", Error);
        }
      }
    });
  };

  console.log(files);

  return (
    <div className="flex flex-col text-lg font-semibold font-poppins space-y-5 p-2">
      <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col w-full md:w-2/3 space-y-4">
          <div className="flex flex-col space-y-2">
            <p>Telespectador</p>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full text-sm bg-background border border-orange rounded-lg p-1 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p>Bairro</p>
            <input
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full text-sm bg-background border border-orange rounded-lg p-1 focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4">
            <div className="w-full">
              <p>Rua</p>
              <input
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="w-full text-sm bg-background border border-orange rounded-lg p-1 focus:outline-none"
              />
            </div>
            <div className="w-full">
              <p>Número</p>
              <input
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full text-sm bg-background border border-orange rounded-lg p-1 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 space-y-4">
          <img
            src={isChecked ? iconOn : iconOff}
            className="w-20"
            alt="Ícone de status"
          />
          <p>Status</p>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="size-7 rounded-lg text-blue_primary hover:text-blue_secondary border-2 border-blue_primary cursor-pointer focus:ring-0"
          />
        </div>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <p>Uploads</p>
        <div className="flex flex-col md:flex-row w-full h-44 bg-background border border-orange rounded-lg p-2 space-y-4 md:space-y-0 md:space-x-5">
          {files.map((file, index) => {
            return (
              <div
                key={index}
                className="relative flex items-center justify-center w-full bg-background border border-orange rounded-lg p-1"
              >
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileChange(index, e)}
                />
                {file && file.arquivo ? (
                  <div className="relative w-full h-full">
                    <img
                      src={
                        typeof file.arquivo === "string"
                          ? file.arquivo
                          : URL.createObjectURL(file.arquivo)
                      }
                      alt="Preview"
                      className="object-cover h-full w-full rounded-lg"
                    />

                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full focus:outline-none"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-center w-full h-full text-gray-500">
                    Clique para carregar um arquivo
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-end space-x-10">
        <button
          onClick={closeModal}
          className="bg-blue_primary opacity-[50%] text-white px-4 py-1 rounded-2xl"
        >
          Cancelar
        </button>
        <button
          onClick={handleUpdateMarker}
          className="bg-blue_primary text-white px-4 py-1 rounded-2xl"
        >
          Atualizar
        </button>
      </div>
    </div>
  );
}
