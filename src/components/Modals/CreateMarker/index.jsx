import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import iconOn from "../../../assets/iconOn.svg";
import iconOff from "../../../assets/iconOff.svg";
import { app } from "../../../api/api";

export function CreateMarker({ closeModal }) {
  const [isChecked, setIsChecked] = useState(false);
  const [telespectador, setTelespectador] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [num, setNum] = useState();
  const [status, setStatus] = useState(false);
  const [files, setFiles] = useState([null, null, null]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setStatus(!isChecked);
  };

  // Função para lidar com a mudança de arquivo
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const newFiles = [...files];

      // Encontra o primeiro índice disponível (onde o valor é null)
      const firstAvailableIndex = newFiles.findIndex(
        (preview) => preview === null
      );

      // Define a nova imagem no primeiro índice disponível ou no índice clicado
      newFiles[firstAvailableIndex !== -1 ? firstAvailableIndex : index] = file;

      setFiles(newFiles);
    }
    // }
  };

  // Função para remover a imagem
  const handleRemoveImage = (index) => {
    // Remove a imagem do índice especificado
    const newFiles = files.filter((_, i) => i !== index);

    // Adiciona null no final do array para manter o tamanho
    newFiles.push(null);

    setFiles(newFiles);
  };

  const handleAddMarker = async () => {
    try {
      const response = await app.post("/markers", {
        nome: telespectador,
        rua: rua,
        bairro: bairro,
        numero: num,
        cidade: "São Luís",
        status: status,
      });
      if (response.status === 201) {
        handleAddFile(response.data.id_marker);
      }
      console.log(response);
      document.location.reload(true);
      alert("Marcador criado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  const handleAddFile = async (id) => {
    const formData = new FormData();
    formData.append("id_marker", id);
    formData.append("file1", files[0]);
    formData.append("file2", files[1]);
    formData.append("file3", files[3]);
    try {
      await app.post("/files", formData);
      console.log(formData);
    } catch {
      console.log("Erro: ", Error);
    }
  };

  return (
    <div className="flex flex-col text-lg font-semibold font-poppins space-y-5 p-2">
      <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col w-full md:w-2/3 space-y-4">
          <div className="flex flex-col space-y-2">
            <p>Telespectador</p>
            <input
              onChange={(e) => {
                setTelespectador(e.target.value);
              }}
              className="w-full text-sm bg-background border border-orange rounded-lg p-1 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p>Bairro</p>
            <input
              onChange={(e) => {
                setBairro(e.target.value);
              }}
              className="w-full text-sm bg-background border border-orange rounded-lg p-1 focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4">
            <div className="w-full">
              <p>Rua</p>
              <input
                onChange={(e) => {
                  setRua(e.target.value);
                }}
                className="w-full text-sm bg-background border border-orange rounded-lg p-1 focus:outline-none"
              />
            </div>
            <div className="w-full">
              <p>Número</p>
              <input
                onChange={(e) => {
                  setNum(e.target.value);
                }}
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
            className="size-7 rounded-lg text-blue_primary hover:text-blue_secondary border-2 border-blue_primary cursor-pointer focus:ring-0"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <p>Uploads</p>
        <div className="flex flex-col md:flex-row w-full h-44 bg-background border border-orange rounded-lg p-2 space-y-4 md:space-y-0 md:space-x-5">
          {files.map((preview, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-full bg-background border border-orange rounded-lg p-1"
            >
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => handleFileChange(index, event)}
              />
              {preview ? (
                <div className="relative w-full h-full">
                  <img
                    src={URL.createObjectURL(preview)}
                    alt="Preview"
                    className="object-cover h-full w-full rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
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
          ))}
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
          onClick={handleAddMarker}
          className="bg-blue_primary text-white px-4 py-1 rounded-2xl"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
