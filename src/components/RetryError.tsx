import Button from "@/components/Button";
import Image from "next/image";
import warn from "@/assets/icons/warn.svg";

export default function RetryError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 whitespace-nowrap p-6 min-h-[300px] max-w-[400px] mx-auto">
      <Image src={warn} width={76} height={76} alt="에러" priority />
      <div className="text-center">
        <h1 className="text-lg font-bold text-blue-700">
          에러가 발생했습니다.
        </h1>
        <p className="mt-2 text-blue-400 text-md">
          잠시 후에 다시 시도해 주세요.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={onRetry}
          className="w-[132px] lg:w-[154px]"
        >
          다시 시도하기
        </Button>
        <Button variant="outline" href="/" className="w-[132px] lg:w-[154px]">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
