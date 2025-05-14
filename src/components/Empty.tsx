import Image from "next/image";
import empty from "@/assets/icons/empty.svg";
import Button from "./Button";

export default function Empty({
  myEpigram,
  myComment,
}: {
  myEpigram?: boolean;
  myComment?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-12">
      <Image
        src={empty}
        className="w-[96px] h-[96px] lg:w-[144px] lg:h-[144px]"
        alt="노 아이템"
      />
      {!myComment && !myEpigram && (
        <p className="text-md lg:text-lg text-black-600 text-center">
          아직 댓글이 없어요! <br />
          댓글을 작성하고, 다른 사람들과 교류해 보세요.
        </p>
      )}

      {myEpigram && (
        <>
          <p className="text-md text-black-600 text-center">
            아직 작성한 에피그램이 없어요! <br />
            에피그램을 작성하고, 감정을 공유해 보세요.
          </p>
          <Button
            variant="outline"
            size="xl"
            isRoundedFull
            className="mt-4 w-[152px] lg:w-[240px]"
            href="/addepigram"
          >
            에피그램 만들기
          </Button>
        </>
      )}
      {myComment && (
        <>
          <p className="text-md text-black-600 text-center">
            아직 작성한 댓글이 없어요! <br />
            댓글을 작성하고, 다른 사람들과 교류해 보세요.
          </p>
          <Button
            variant="outline"
            size="xl"
            isRoundedFull
            className="mt-4 w-[152px] lg:w-[240px]"
            href="/feeds"
          >
            에피그램 둘러보기
          </Button>
        </>
      )}
    </div>
  );
}
