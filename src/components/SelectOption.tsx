"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import Image from "next/image";
import arrow from "@/assets/icons/chevron-down-gray.svg";

interface SelectOptions {
  label: string;
  onClick: () => void;
}

interface SelectOptionProps {
  options: SelectOptions[];
}

export default function SelectOption({ options }: SelectOptionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex gap-1 cursor-pointer text-md items-center bg-background-100 text-gray-300 font-semibold px-3 py-1 rounded-lg"
      >
        {selectedLabel || "필터"}
        <Image src={arrow} width={16} height={16} alt="셀렉트 옵션 아이콘" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-10 mt-1 w-full text-gray-300 shadow-sm rounded-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                option.onClick();
                setSelectedLabel(option.label);
                setIsOpen(false);
              }}
              className={`cursor-pointer text-center text-sm bg-background-100 hover:bg-line-100 py-1
                ${index === 0 ? "rounded-t-lg" : ""}
                ${index === options.length - 1 ? "rounded-b-lg" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
