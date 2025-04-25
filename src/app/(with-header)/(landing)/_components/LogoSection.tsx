import Image from "next/image";
import Button from "@/components/Button";
import tornPaper from "@/assets/images/torn-paper.svg";
import logoText from "@/assets/logo/logo-text.svg";

export default function LogoSection() {
  return (
    <div className="relative bg-blue-100 h-[622px] lg:h-[960px]">
      <div
        className="absolute w-full -top-[5px] h-[15px] bg-repeat-x z-10"
        style={{
          backgroundImage: `url(${tornPaper.src})`,
          backgroundSize: "auto 100%",
          filter: "drop-shadow(0px 3px 3px rgba(0,0,0,0.08))",
          transform: "scaleY(-1)",
        }}
      />
      <div
        className="lg:hidden absolute top-[15px] bottom-0 left-0 right-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #f2f2f2 1px, transparent 1px, transparent 24px)",
          backgroundSize: "100% 24px",
        }}
      />
      <div
        className="hidden lg:block absolute top-[15px] bottom-0 left-0 right-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #f2f2f2 1px, transparent 1px, transparent 36px)",
          backgroundSize: "100% 36px",
        }}
      />
      <div className="absolute transform mx-auto -translate-x-1/2 left-1/2 top-[252px] lg:top-[400px] whitespace-nowrap">
        <Image
          src={logoText}
          alt="날마다 에피그램 로고"
          className="w-[122px] h-[70px] lg:w-[184px] lg:h-[105px] mb-[32px] lg:mb-[48px] mx-auto"
        />
        <Button
          variant="primary"
          size="xl"
          href="/epigrams"
          className="w-[132px] lg:w-[286px] mx-auto mb-[168px] md:mb-[106px] lg:mb-[292px]"
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
