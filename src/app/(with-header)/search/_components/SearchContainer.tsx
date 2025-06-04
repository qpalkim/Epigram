"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEpigramList } from "@/lib/hooks/useEpigrams";
import SearchBar from "./SearchBar";
import RecentKeyword from "./RecentKeyword";
import SearchEpigramItem from "./SearchEpigramItem";
import Empty from "@/components/Empty";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";

export default function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const keyword = searchParams.get("keyword");
  const [limit, setLimit] = useState(4);
  const { data, isLoading, isError, refetch } = useEpigramList({
    limit: limit,
    keyword: searchTerm || undefined,
  });
  const [epigrams, setEpigrams] = useState(data?.list || []);

  useEffect(() => {
    setSearchTerm(keyword || "");

    const storedKeywords = localStorage.getItem("recentKeywords");
    const parsedKeywords = storedKeywords ? JSON.parse(storedKeywords) : [];
    setRecentKeywords(parsedKeywords);
  }, [keyword]);

  useEffect(() => {
    if (data?.list) {
      setEpigrams(data.list);
    }
  }, [data]);

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();

    if ((epigrams.length ?? 0) < (data?.totalCount ?? Infinity))
      setLimit((prev) => prev + 4);
  };

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

    setRecentKeywords(newKeywords);
  };

  const handleClearAll = () => {
    localStorage.removeItem("recentKeywords");
    setRecentKeywords([]);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <div className="max-w-[640px] mx-auto px-6 md:px-0 mb-40">
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

      {!searchTerm ? (
        <RecentKeyword
          recentKeywords={recentKeywords}
          onClearAll={handleClearAll}
        />
      ) : !epigrams.length ? (
        <Empty search />
      ) : (
        <div className="mt-6">
          {epigrams.map((epigram) => (
            <SearchEpigramItem
              key={epigram.id}
              id={epigram.id}
              content={epigram.content}
              author={epigram.author}
              tags={epigram.tags}
              searchTerm={searchTerm}
            />
          ))}

          {(epigrams.length ?? 0) < (data?.totalCount ?? Infinity) && (
            <Button
              variant="outline"
              size="xl"
              isRoundedFull
              className="mx-auto mt-14 w-[152px] lg:w-[240px]"
              onClick={handleLoadMore}
            >
              <Image
                src={plus}
                alt="더보기 아이콘"
                className="lg:mr-2 w-[20px] lg:w-[24px]"
              />
              검색 결과 더보기
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
