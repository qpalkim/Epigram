import Image from "next/image";
import warn from "@/assets/icons/warn.svg";
import Button from "./Button";

export default function DeleteItemModal({
  onCancel,
  onDelete,
  isComment = true,
}: {
  onCancel: () => void;
  onDelete: () => void;
  isComment?: boolean;
}) {
  return (
    <div className="w-[280px] lg:w-[312px] flex flex-col items-center">
      <Image
        src={warn}
        width={44}
        height={44}
        alt="경고 아이콘"
        className="mb-4"
      />
      <h2 className="text-black-700 font-semibold text-md lg:text-lg">
        {isComment ? "댓글을 삭제하시겠어요?" : "에피그램을 삭제하시겠어요?"}
      </h2>
      <p className="text-gray-400 text-sm lg:text-md">
        {isComment
          ? "댓글은 삭제 후, 복구할 수 없어요."
          : "에피그램은 삭제 후, 복구할 수 없어요."}
      </p>

      <div className="flex justify-between w-full mt-6">
        <Button
          variant="tertiary"
          size="md"
          className="w-[48%]"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="w-[48%]"
          onClick={onDelete}
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}
