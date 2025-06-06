import TodayEpigram from "./_components/TodayEpigram";
import EmotionLogs from "@/components/EmotionLogs";
import LatestEpigram from "./_components/LatestEpigram";
import LatestComment from "./_components/LatestComment";
import FloatingButton from "@/components/FloatingButton";

export default function Page() {
  return (
    <div className="max-w-[640px] mx-auto mt-[32px] lg:mt-[120px] px-6 md:px-0 mb-32">
      <h2 className="text-black-600 font-semibold text-lg lg:text-xl mb-6 lg:mb-10">
        오늘의 에피그램
      </h2>
      <TodayEpigram />
      <h2 className="text-black-600 font-semibold text-lg lg:text-xl mt-14 lg:mt-35 mb-6 lg:mb-10">
        오늘의 감정은 어떤가요?
      </h2>
      <EmotionLogs />
      <h2 className="text-black-600 font-semibold text-lg lg:text-xl mt-14 lg:mt-35 mb-6 lg:mb-10">
        최신 에피그램
      </h2>
      <LatestEpigram />
      <h2 className="text-black-600 font-semibold text-lg lg:text-xl mt-14 lg:mt-35 mb-6 lg:mb-10">
        최신 댓글
      </h2>
      <LatestComment />
      <FloatingButton />
    </div>
  );
}
