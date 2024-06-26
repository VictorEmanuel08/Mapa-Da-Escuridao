import React from "react";
import { IoMdClose } from "react-icons/io";

export function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-blue_secondary text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-10`}
    >
      <div className="flex flex-col">
        <div className="pt-4 flex justify-end">
          <div
            className="w-[220px] h-[100px] bg-blue_primary rounded-l-lg text-[24px]"
            onClick={toggleSidebar}
          >
            a
          </div>
        </div>
        <h2 className="text-xl font-semibold">Sidebar</h2>
      </div>
    </div>
  );
}
