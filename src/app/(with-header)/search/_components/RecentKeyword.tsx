import Button from "@/components/Button";

interface RecentKeywordProps {
  recentKeywords: string[];
  onClearAll: () => void;
}

export default function RecentKeyword({
  recentKeywords,
  onClearAll,
}: RecentKeywordProps) {
  return (
    <>
      {recentKeywords.length > 0 ? (
        <>
          <div className="mt-6 flex justify-between">
            <h4 className="text-black-70 font-medium text-lg">최근 검색어</h4>
            <p
              className="text-error-100 font-semibold text-md cursor-pointer"
              onClick={onClearAll}
            >
              모두 지우기
            </p>
          </div>
          <ul className="flex gap-2 mt-4">
            {recentKeywords.map((keyword, index) => (
              <Button
                key={index}
                size="md"
                variant="tertiary"
                className="bg-blue-200"
                href={`search?limit=4&keyword=${keyword}`}
              >
                {keyword}
              </Button>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center text-blue-400 mt-8">
          최근 검색어가 없습니다.
        </p>
      )}
    </>
  );
}
