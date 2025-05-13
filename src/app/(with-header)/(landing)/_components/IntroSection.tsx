"use client";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import Button from "@/components/Button";
import BackgroundLines from "../../../../components/BackgroundLines";
import tornPaper from "@/assets/images/torn-paper.svg";
import chevronDownDoubleGray from "@/assets/icons/chevron-down-double-gray.svg";

type IntroSectionProps = {
  scrollMainSectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function IntroSection({
  scrollMainSectionRef,
}: IntroSectionProps) {
  const onSrollToMainSection = () => {
    if (scrollMainSectionRef.current) {
      const headerHeight = document.querySelector("header")?.clientHeight || 0;

      window.scrollTo({
        top: scrollMainSectionRef.current.offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section className="relative bg-blue-100 h-[622px] lg:h-[960px]">
        <BackgroundLines />
        <div className="absolute transform mx-auto min-w-[375px] -translate-x-1/2 left-1/2 top-[200px] lg:top-[324px] whitespace-nowrap text-center">
          <h1 className="font-iropke mb-[8px] md:mb-[24px] text-[24px] leading-[40px] md:text-[32px] md:leading-[48px] text-black-500 whitespace-pre-line h-[89px]">
            <Typewriter
              words={["나만 갖고 있기엔\n아까운 글이 있지 않나요?"]}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <p className="font-iropke mb-[24px] md:mb-[32px] lg:mb-[48px] text-black-300 text-[14px] leading-[24px] md:text-[20px] md:leading-[28px]">
            다른 사람들과 감정을 공유해 보세요
          </p>
          <Button
            size="xl"
            href="/epigrams"
            className="w-[132px] lg:w-[286px] mx-auto mb-[168px] md:mb-[136px] lg:mb-[292px]"
          >
            시작하기
          </Button>
          <div
            className="cursor-pointer mx-auto transform transition-transform duration-100 ease-in-out hover:translate-y-2"
            onClick={onSrollToMainSection}
          >
            <span className="block text-blue-400 text-center font-semibold text-xs md:text-lg">
              더 알아보기
            </span>
            <Image
              src={chevronDownDoubleGray}
              width={24}
              height={24}
              alt="아래로 스크롤"
              className="mx-auto"
            />
          </div>
        </div>
      </section>
      <div
        className="absolute w-full h-[15px] bg-repeat-x z-10"
        style={{
          backgroundImage: `url(${tornPaper.src})`,
          backgroundSize: "auto 100%",
          filter: "drop-shadow(0px 3px 3px rgba(0,0,0,0.08))",
        }}
      />
    </>
  );
}
