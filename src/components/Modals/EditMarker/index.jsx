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

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const getDataMarker = async (id) => {
    const response = await app.get(`/markers/${id}`);
    const data = response.data;
    setNome(data.nome || "");
    setBairro(data.bairro || "");
    setRua(data.rua || "");
    setNumero(data.numero || "");
    setStatus(data.status || false);
    setIsChecked(data.status || false);
    setFile1(data.files[0] || null);
    setFile2(data.files[1] || null);
    setFile3(data.files[2] || null);
  };
  useEffect(() => {
    getDataMarker(id);
  }, [id]);

  console.log(file1);

  // const getDataFiles = async (id) => {
  //   const response = await app.get(
  //     `/files/110460ef-9803-433e-b5cd-b6a38d7fb4e0`
  //   );
  //   // const response = await app.get(`/files/${id}`);
  //   const data = response.data;
  //   console.log(data);
  // };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setStatus(!isChecked);
  };

  // const handleFileChange = (index, e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const newFiles = [...files];
  //     newFiles[index] = { ...newFiles[index], arquivo: file };
  //     setFiles(newFiles);
  //   }
  // };

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
        // handleUpdateFiles();
        handleNewFiles();
      }
      // document.location.reload(true);
      // alert("Marcador atualizado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  // const handleUpdateFiles = async () => {
  //   // Deletar todos os arquivos existentes

  //   for (const file of initialFiles) {
  //     if (file && file.id) {
  //       try {
  //         const response = await app.delete(`/files/${file.id}`);
  //         console.log(`Arquivo ${file.id} deletado: `, response);
  //       } catch (error) {
  //         console.log("Erro ao apagar arquivo: ", error);
  //       }
  //     }
  //   }

  //   // console.log("FormData para upload: ", formData);

  //   // try {
  //   //   if (initialFiles[0]) {
  //   //     const response1 = await app.put(`/files/${initialFiles[0].id}`, file1);
  //   //     console.log("Response1 ", response1);
  //   //   }
  //   //   if (initialFiles[1]) {
  //   //     const response2 = await app.put(`/files/${initialFiles[1].id}`, file2);
  //   //     console.log("Response2 ", response2);
  //   //   }
  //   //   if (initialFiles[2]) {
  //   //     const response3 = await app.put(`/files/${initialFiles[2].id}`, file3);
  //   //     console.log("Response3 ", response3);
  //   //   }
  //   //   // const response = await app.post("/files", formData);
  //   // } catch (error) {
  //   //   console.log("Erro ao enviar arquivos: ", error);
  //   // }
  // };

  const handleNewFiles = async () => {
    // Adicionar novos arquivos após deletar todos os antigos
    const formData = new FormData();
    formData.append("id_marker", id);

    // Adicionar os novos arquivos se existirem
    if (file1) formData.append("file1", file1);
    if (file2) formData.append("file2", file2);
    if (file3) formData.append("file3", file3);

    try {
      const response = await app.post("/files", formData);
      console.log(formData);
      console.log(response.data);
    } catch {
      console.log("Erro: ", Error);
    }
  };

  const handleRemoveFile = (idFile) => {
    try {
      const res = app.delete(`/files/${idFile}`);
      console.log(res.data);
      getDataMarker(id);
    } catch (error) {
      console.log("Erro:", error);
    }
  };

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
          <div className="relative flex items-center justify-center w-full bg-background border border-orange rounded-lg p-1">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setFile1(e.target.files[0])}
            />
            {file1 ? (
              <div className="relative w-full h-full">
                <img
                  src={
                    file1.arquivo ? file1.arquivo : URL.createObjectURL(file1)
                  }
                  alt="Preview"
                  className="object-cover h-full w-full rounded-lg"
                />
                <button
                  onClick={() => handleRemoveFile(file1.id)}
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
          <div className="relative flex items-center justify-center w-full bg-background border border-orange rounded-lg p-1">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setFile2(e.target.files[0])}
            />
            {file2 ? (
              <div className="relative w-full h-full">
                <img
                  src={
                    file2.arquivo ? file2.arquivo : URL.createObjectURL(file2)
                  }
                  alt="Preview"
                  className="object-cover h-full w-full rounded-lg"
                />
                <button
                  onClick={() => handleRemoveFile(file2.id)}
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
          <div className="relative flex items-center justify-center w-full bg-background border border-orange rounded-lg p-1">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setFile3(e.target.files[0])}
            />
            {file3 ? (
              <div className="relative w-full h-full">
                <img
                  src={
                    file3.arquivo ? file3.arquivo : URL.createObjectURL(file3)
                  }
                  alt="Preview"
                  className="object-cover h-full w-full rounded-lg"
                />
                <button
                  onClick={() => handleRemoveFile(file3.id)}
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
