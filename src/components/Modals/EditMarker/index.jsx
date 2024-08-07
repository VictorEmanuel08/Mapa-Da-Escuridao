import React, { useCallback, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import iconEscuridaoOn from "../../../assets/iconEscuridaoOn.svg";
import iconEscuridaoOff from "../../../assets/iconEscuridaoOff.svg";
import iconEsgotoOn from "../../../assets/iconEsgotoOn.png";
import iconEsgotoOff from "../../../assets/iconEsgotoOff.png";
import { app } from "../../../api/api";
import Swal from "sweetalert2";

export function EditMarker({ closeModal, id, isMarkerEscuridao }) {
  const [isChecked, setIsChecked] = useState(false);
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [status, setStatus] = useState(false);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const getDataMarker = useCallback(
    async (id) => {
      const endpoint = isMarkerEscuridao ? `/markers/${id}` : `/esgotos/${id}`;
      try {
        const response = await app.get(endpoint);
        const data = response.data;
        setNome(data.nome || "");
        setBairro(data.bairro || "");
        setRua(data.rua || "");
        setNumero(data.numero || "");
        setStatus(data.status || false);
        setIsChecked(data.status || false);
        setFile1(data.files ? data.files[0] : null);
        setFile2(data.files ? data.files[1] : null);
        setFile3(data.files ? data.files[2] : null);
      } catch (error) {
        console.error("Erro ao buscar dados do marcador:", error);
      }
    },
    [isMarkerEscuridao]
  );

  useEffect(() => {
    getDataMarker(id);
  }, [getDataMarker, id]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setStatus(!isChecked);
  };

  const handleUpdateMarker = async () => {
    const endpoint = isMarkerEscuridao ? `/markers/${id}` : `/esgotos/${id}`;
    try {
      const response = await app.put(endpoint, {
        nome,
        rua,
        bairro,
        numero,
        cidade: "São Luís",
        status,
      });
      if (response.status === 200) {
        handleNewFiles();
        Toast.fire({
          icon: "success",
          title: "Marcador atualizado com sucesso.",
        });
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao atualizar marcador:", error);
      Toast.fire({
        icon: "error",
        title: "Ocorreu um erro. Tente novamente.",
      });
    }
  };

  //config do alert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleNewFiles = async () => {
    const typeFormData = isMarkerEscuridao ? "id_marker" : "id_esgoto";
    const formData = new FormData();
    formData.append(typeFormData, id);

    if (file1) formData.append("file1", file1);
    if (file2) formData.append("file2", file2);
    if (file3) formData.append("file3", file3);

    try {
      const endpoint = isMarkerEscuridao ? "/files" : "/filesEsgoto";
      await app.post(endpoint, formData);
    } catch (error) {
      console.error("Erro ao carregar arquivos:", error);
      Toast.fire({
        icon: "error",
        title: "Erro ao carregar os arquivos",
      });
    }
  };

  const handleRemoveFile = async (idFile, setFile, index) => {
    console.log(idFile);
    try {
      const endpoint = isMarkerEscuridao ? "/files" : "/filesEsgoto";
      if (idFile) {
        await app.delete(`${endpoint}/${idFile}`);
      }
      setFile(null);
      if (index === 0) setFile1(null);
      if (index === 1) setFile2(null);
      if (index === 2) setFile3(null);
      Toast.fire({
        icon: "success",
        title: "Arquivo deletado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao deletar arquivo:", error);
      Toast.fire({
        icon: "error",
        title: "Erro ao deletar o arquivo",
      });
    }
  };

  const showConfirmationToDeleteFile = (idFile, setFile, index) => {
    Swal.fire({
      title: "Excluir arquivo",
      text: "Você tem certeza que deseja excluir este arquivo? A exclusão será permanente e não poderá ser desfeita depois, mesmo que cancele a edição do marcador.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          handleRemoveFile(idFile, setFile, index);
        } catch (error) {
          console.error("Erro ao excluir arquivo:", error);
          Toast.fire({
            icon: "error",
            title: "Ocorreu um erro ao excluir o arquivo. Tente novamente.",
          });
        }
      }
    });
  };

  const showConfirmation = () => {
    Swal.fire({
      title: "Excluir marcador",
      text: "Você tem certeza que deseja excluir este marcador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const endpoint = isMarkerEscuridao
          ? `/markers/${id}`
          : `/esgotos/${id}`;
        try {
          const response = await app.delete(endpoint);
          if (response.status === 204) {
            Toast.fire({
              icon: "success",
              title: "Marcador excluído com sucesso.",
            });
            closeModal();
            setTimeout(() => {
              window.location.reload();
            }, 1500); // 1.5 segundos
          }
        } catch (error) {
          console.error("Erro ao excluir marcador:", error);
          Toast.fire({
            icon: "error",
            title: "Ocorreu um erro ao excluir o marcador. Tente novamente.",
          });
        }
      }
    });
  };

  // Função para extrair a extensão do arquivo a partir da URL
  const getFileTypeFromUrl = (url) => {
    return url.split(".").pop().toLowerCase();
  };

  const renderPreview = (fileUrl) => {
    const fileType = getFileTypeFromUrl(fileUrl);

    if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      return (
        <img
          src={fileUrl}
          alt="Preview"
          className="object-cover h-full w-full rounded-lg"
        />
      );
    } else if (["mp4", "webm", "ogg"].includes(fileType)) {
      return (
        <video className="object-cover h-full w-full rounded-lg" controls>
          <source src={fileUrl} type={`video/${fileType}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
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
          {isMarkerEscuridao ? (
            <img
              src={isChecked ? iconEscuridaoOn : iconEscuridaoOff}
              className="w-20"
              alt="Ícone de status"
            />
          ) : (
            <img
              src={isChecked ? iconEsgotoOn : iconEsgotoOff}
              className="w-20"
              alt="Ícone de status"
            />
          )}
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
          {[file1, file2, file3].map((file, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-full bg-background border border-orange rounded-lg p-1"
            >
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const setFile = [setFile1, setFile2, setFile3][index];
                  setFile(e.target.files[0]);
                }}
              />
              {file ? (
                <div className="relative w-full h-full">
                  {renderPreview(
                    file.arquivo ? file.arquivo : URL.createObjectURL(file)
                  )}
                  <button
                    onClick={() =>
                      showConfirmationToDeleteFile(
                        file.id,
                        [setFile1, setFile2, setFile3][index],
                        index
                      )
                    }
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
          onClick={showConfirmation}
          className="bg-red-500 text-white w-28 py-1 rounded-2xl"
        >
          Excluir
        </button>
        <button
          onClick={closeModal}
          className="bg-blue_primary opacity-[50%] text-white w-28 py-1 rounded-2xl"
        >
          Cancelar
        </button>
        <button
          onClick={handleUpdateMarker}
          className="bg-blue_primary text-white w-28 py-1 rounded-2xl"
        >
          Atualizar
        </button>
      </div>
    </div>
  );
}
