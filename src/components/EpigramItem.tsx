import Link from "next/link";
import clsx from "clsx";

interface EpigramItemProps {
  content: string;
  author: string;
  tags: { name: string; id: number }[];
  id: number;
  isFeedPage?: boolean;
}

export default function EpigramItem({
  content,
  author,
  tags = [],
  id,
  isFeedPage = false,
}: EpigramItemProps) {
  return (
    <Link href={`/epigrams/${id}`} className="font-iropke">
      <div
        className={clsx("font-iropke", {
          "max-w-[640px]": !isFeedPage,
        })}
      >
        <div
          className={clsx(
            "relative rounded-2xl h-auto p-4 md:p-6 bg-blue-100 border border-line-100 transition-transform duration-200 ease-in-out transform hover:scale-102",
            { "lg:h-[260px] md:h-[180px] h-[140px]": isFeedPage }
          )}
          style={{ boxShadow: "0px 3px 12px 0px rgba(0, 0, 0, 0.04)" }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #f2f2f2 1px, transparent 1px, transparent 24px)",
              backgroundSize: "100% 24px",
            }}
          />
          <div className="z-10 relative h-full flex flex-col justify-between">
            <div
              className={clsx("text-md lg:text-lg font-medium text-black-600", {
                "line-clamp-1 md:line-clamp-3 lg:line-clamp-none break-keep overflow-hidden":
                  isFeedPage,
              })}
            >
              {content}
            </div>
            <div className="mt-auto text-md lg:text-lg text-right font-medium text-blue-400">
              - {author} -
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2 gap-2 text-blue-400 text-md lg:text-lg">
          {tags.map((tag) => (
            <span key={tag.id}>#{tag.name}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
