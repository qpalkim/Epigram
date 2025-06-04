import Header from "@/components/Header";
import Button from "@/components/Button";
import Image from "next/image";
import warn from "@/assets/icons/warn.svg";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="pt-[52px] md:pt-[70px] lg:pt-[80px] flex flex-col h-screen items-center justify-center gap-7">
        <Image src={warn} alt="404" priority width={124} height={124} />
        <div className="text-center">
          <h1 className="text-xl font-bold text-blue-400">404</h1>
          <p className="mt-2 text-blue-300 text-lg">
            잘못된 주소 또는 없는 페이지입니다.
          </p>
        </div>
        <Button
          variant="secondary"
          size="lg"
          href="/"
          className="w-[152px] lg:w-[194px]"
          isRoundedFull
        >
          홈으로 돌아가기
        </Button>
      </div>
    </>
  );
}
