"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    setSearchTerm(keyword || "");
  }, [keyword]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    router.push(`/search?limit=4&keyword=${encodeURIComponent(searchTerm)}`);

    const storedKeywords = localStorage.getItem("recentKeywords");
    const recentKeywords = storedKeywords ? JSON.parse(storedKeywords) : [];
    const newKeywords = [
      searchTerm,
      ...recentKeywords.filter((kw: string) => kw !== searchTerm),
    ].slice(0, 5);
    localStorage.setItem("recentKeywords", JSON.stringify(newKeywords));
  };

  return (
    <div className="max-w-[640px] mx-auto px-6 md:px-0">
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
    </div>
  );
}
