"use client";
import { useEffect, useState } from "react";
import finder from "@/assets/icons/finder.svg";
import Image from "next/image";

export default function SearchBar({
  onSearch,
  searchTerm,
}: {
  onSearch(term: string): void;
  searchTerm: string;
}) {
  const [value, setValue] = useState(searchTerm);

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  };

  return (
    <div className="relative mt-2 md:mt-6">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="검색어를 입력하세요."
          className="w-full h-[52px] md:h-[60px] lg:h-[80px] border-0 border-b-4 border-blue-300 focus:outline-none focus:border-blue-800 text-lg text-black-700 md:text-2lg transition-all"
        />
        <button
          type="submit"
          className="cursor-pointer"
          disabled={!value.trim()}
        >
          <Image
            src={finder}
            alt="검색 아이콘"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-[24px] lg:w-[30px] aspect-square"
          />
        </button>
      </form>
    </div>
  );
}
