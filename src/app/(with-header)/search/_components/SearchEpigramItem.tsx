import Link from "next/link";

interface SearchEpigramItemProps {
  content: string;
  author: string;
  tags: { name: string; id: number }[];
  id: number;
  searchTerm: string;
}

export default function SearchEpigramItem({
  content,
  author,
  tags = [],
  id,
  searchTerm,
}: SearchEpigramItemProps) {
  const highlightText = (text: string, keyword: string) => {
    if (!keyword || !text) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-illust-blue">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Link href={`/epigrams/${id}`}>
      <div className="py-4">
        <h4 className="font-iropke text-lg text-black-600 mb-2">
          {highlightText(content, searchTerm || "")}
        </h4>
        <p className="font-iropke text-md text-blue-400">
          - {highlightText(author, searchTerm || "")} -
        </p>
        <div className="flex justify-end mt-2 gap-2 text-blue-400 text-md lg:text-lg">
          {tags.map((tag) => (
            <span key={tag.id}>
              <span>#</span>
              {highlightText(tag.name, searchTerm || "")}
            </span>
          ))}
        </div>
      </div>
      <hr className="border-line-200" />
    </Link>
  );
}
