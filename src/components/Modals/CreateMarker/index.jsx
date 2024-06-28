export function CreateMarker() {
  return (
    <div className="flex flex-col items-start justify-start font-poppins space-y-4">
      <div className="flex flex-col w-[70%] space-y-1">
        <p className="font-semibold text-base">Telespectador</p>
        <input className="w-full text-sm bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none" />
      </div>
      <div className="flex flex-col w-[70%] space-y-1">
        <p className="font-semibold text-base">Bairro</p>
        <input className="w-full text-sm bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none" />
      </div>
      <div className="flex flex-row items-center justify-between w-[70%] space-y-1">
        <div>
          <p className="font-semibold text-base">Rua</p>
          <input className="w-full text-sm bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none" />
        </div>
        <div>
          <p className="font-semibold text-base">Número</p>
          <input className="w-full text-sm bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
