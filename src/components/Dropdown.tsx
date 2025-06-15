"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import Image from "next/image";
import kebab from "@/assets/icons/kebab.svg";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  options: DropdownOption[];
}

export default function Dropdown({ options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <Image
        src={kebab}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
        alt="케밥 아이콘"
        width={24}
        height={24}
      />

      {isOpen && (
        <ul className="absolute right-0 mt-1 cursor-pointer rounded-2xl border border-blue-300 bg-background-100 drop-shadow-sm z-10 whitespace-nowrap overflow-hidden">
          {options.map((option, index) => (
            <li key={option.label}>
              <button
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className={`text-md lg:text-lg cursor-pointer text-center font-medium px-6 lg:px-8 py-2 lg:py-3 text-black-600 hover:bg-blue-200 transition ${
                  index === 0 ? "rounded-t-2xl" : ""
                } ${
                  index === options.length - 1
                    ? "rounded-b-2xl"
                    : "border-b border-blue-300"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
