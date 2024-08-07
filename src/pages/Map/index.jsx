import { ContentMaps } from "../../components/ContentMaps";
import { useMapType } from "../../hooks/UseMapType";

export function MapaEscuridao() {
  const { marcadores } = useMapType();

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
      <ContentMaps marcadores={marcadores} />
    </div>
  );
}
