import iconOn from "../../../assets/iconOn.svg";
import iconOff from "../../../assets/iconOff.svg";
import React, { useState } from "react";

export function CreateMarker() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col items-start justify-start text-lg font-semibold font-poppins space-y-4">
      <div className=" flex flex-row w-full">
        <div className="flex flex-col w-[65%] space-y-2">
          <div className="flex flex-col space-y-2">
            <p>Telespectador</p>
            <input className="w-full text-sm bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none" />
          </div>
          <div className="flex flex-col space-y-2">
            <p>Bairro</p>
            <input className="w-full text-sm bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none" />
          </div>
          <div className="flex flex-row items-center justify-between space-y-2">
            <div>
              <p>Rua</p>
              <input className="w-full text-sm bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none" />
            </div>
            <div>
              <p>Número</p>
              <input className="w-full text-sm bg-background border border-[#FFA300] rounded-lg p-1 focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[35%] space-y-4">
          <img
            src={isChecked ? iconOn : iconOff}
            className="w-20"
            alt="Ícone de status"
          />
          <p>Status</p>
          <input
            type="checkbox"
            className="size-7 rounded-lg text-blue_primary hover:text-blue_secondary border-2 border-blue_primary cursor-pointer before:content[''] relative transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue_primary checked:bg-blue_primary checked:before:bg-blue_primary hover:before:opacity-10 focus:ring-0"
            // className="w-7 h-7 rounded-lg text-blue_primary hover:text-blue_secondary border-2 border-blue_primary cursor-pointer "
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}
