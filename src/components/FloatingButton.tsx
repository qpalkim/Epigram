"use client";
import { scrollToTop } from "@/lib/utils/scrollToTop";
import Button from "@/components/Button";
import Image from "next/image";
import plusWhite from "@/assets/icons/plus-white.svg";
import chevronUpWhite from "@/assets/icons/chevron-up-white.svg";

export default function FloatingButton() {
  return (
    <>
      <Button
        variant="secondary"
        size="xl"
        className="w-[152px] lg:w-[194px] fixed bottom-[90px] lg:bottom-[120px] right-[24px] md:right-[32px] z-50 shadow-lg"
        href="/addepigram"
        isRoundedFull
      >
        <Image
          src={plusWhite}
          alt="만들기 아이콘"
          className="lg:mr-2 w-[20px] lg:w-[24px]"
        />
        에피그램 만들기
      </Button>
      <Button
        variant="secondary"
        size="xl"
        className="w-[48px] lg:w-[64px] fixed p-0 bottom-[32px] right-[24px] md:right-[32px] z-50 shadow-lg"
        onClick={scrollToTop}
        isRoundedFull
      >
        <Image
          src={chevronUpWhite}
          alt="상단 이동 아이콘"
          className="w-[20px] lg:w-[24px]"
        />
      </Button>
    </>
  );
}
