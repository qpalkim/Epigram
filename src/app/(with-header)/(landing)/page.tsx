"use client";
import { useRef } from "react";
import IntroSection from "./_components/IntroSection";
import MainSection from "./_components/MainSection";
import LogoSection from "./_components/LogoSection";

export default function Home() {
  const scrollMainSectionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <IntroSection scrollMainSectionRef={scrollMainSectionRef} />
      <MainSection scrollRef={scrollMainSectionRef} />
      <LogoSection />
    </>
  );
}
