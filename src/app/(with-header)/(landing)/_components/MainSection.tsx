import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import mbSection1 from "@/assets/images/mb-section1.svg";
import mbSection2 from "@/assets/images/mb-section2.svg";
import mbSection3 from "@/assets/images/mb-section3.svg";
import pcSection1 from "@/assets/images/pc-section1.svg";
import pcSection2 from "@/assets/images/pc-section2.svg";
import pcSection3 from "@/assets/images/pc-section3.svg";
import tbSection1 from "@/assets/images/tb-section1.svg";
import tbSection2 from "@/assets/images/tb-section2.svg";
import tbSection3 from "@/assets/images/tb-section3.svg";
import mbEpigram from "@/assets/images/mb-epigram.svg";
import tbEpigram from "@/assets/images/tb-epigram.svg";
import pcEpigram from "@/assets/images/pc-epigram.svg";

type MainSectionProps = {
  scrollRef?: React.RefObject<HTMLDivElement | null>;
};

const motionProps = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

type SectionContentProps = {
  mbImage: string;
  tbImage: string;
  pcImage: string;
  title: ReactNode;
  description: ReactNode;
  reverse?: boolean;
};

const SectionContent = ({
  mbImage,
  tbImage,
  pcImage,
  title,
  description,
  reverse = false,
}: SectionContentProps) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } lg:gap-[80px] lg:items-end items-start lg:w-full lg:max-w-[1200px] lg:px-6 mx-auto`}
    >
      <motion.div className="shadow-sm rounded-2xl md:hidden" {...motionProps}>
        <Image
          src={mbImage}
          alt="모바일 섹션 카드"
          width={312}
          height={210}
          className="shadow-sm rounded-2xl"
        />
      </motion.div>
      <motion.div
        className="hidden shadow-sm rounded-2xl md:block lg:hidden"
        {...motionProps}
      >
        <Image
          src={tbImage}
          alt="태블릿 섹션 카드"
          width={384}
          height={240}
          className="shadow-sm rounded-2xl"
        />
      </motion.div>
      <motion.div
        className="hidden shadow-sm rounded-2xl lg:block"
        {...motionProps}
      >
        <Image
          src={pcImage}
          alt="PC 섹션 카드"
          className="w-full max-w-[744px] min-w-[384px] shadow-sm rounded-2xl"
        />
      </motion.div>
      <div
        className={`mt-[40px] lg:mt-0 w-full min-w-[312px] max-w-[384px] ${
          reverse ? "text-right lg:self-end" : "lg:self-end"
        }`}
      >
        <div className="font-bold text-black-950 text-2xl lg:text-3xl">
          {title}
        </div>
        <span className="block text-blue-600 text-lg mt-[16px] lg:mt-[40px] lg:text-2lg">
          {description}
        </span>
      </div>
    </div>
  );
};

export default function MainSection({ scrollRef }: MainSectionProps) {
  return (
    <div
      ref={scrollRef}
      className="flex flex-col justify-center mt-[20px] pt-[124px] lg:pt-[240px] gap-[190px] md:gap-[220px] lg:gap-[380px]"
    >
      <SectionContent
        mbImage={mbSection1}
        tbImage={tbSection1}
        pcImage={pcSection1}
        title={
          <>
            명언이나 글귀,
            <br />
            토막 상식들을 공유해 보세요
          </>
        }
        description={
          <>
            나만 알던 소중한 글들을&nbsp;
            <br className="md:hidden lg:block" />
            다른 사람들에게 전파하세요
          </>
        }
      />
      <SectionContent
        mbImage={mbSection2}
        tbImage={tbSection2}
        pcImage={pcSection2}
        reverse
        title={
          <>
            감정 상태에 따라,
            <br />
            알맞은 위로를 받을 수 있어요
          </>
        }
        description={<>태그를 통해 글을 모아 볼 수 있어요</>}
      />
      <SectionContent
        mbImage={mbSection3}
        tbImage={tbSection3}
        pcImage={pcSection3}
        title={
          <>
            내가 요즘 어떤 감정 상태인지
            <br />
            통계로 한눈에 볼 수 있어요
          </>
        }
        description={
          <>
            감정 달력으로&nbsp;
            <br className="md:hidden lg:block" />내 마음에 담긴 감정을 확인해
            보세요
          </>
        }
      />
      <div className="flex flex-col mx-auto mb-[124px] lg:mb-[240px]">
        <div className="text-2xl lg:text-3xl font-bold text-center mb-[40px] lg:mb-[100px] text-black-950">
          사용자들이 직접
          <br />
          인용한 에피그램들
        </div>
        <motion.div className="md:hidden" {...motionProps}>
          <Image
            src={mbEpigram}
            alt="모바일 에피그램 이미지"
            width={312}
            height={576}
          />
        </motion.div>
        <motion.div className="hidden md:block lg:hidden" {...motionProps}>
          <Image
            src={tbEpigram}
            alt="태블릿 에피그램 이미지"
            width={384}
            height={688}
          />
        </motion.div>
        <motion.div className="hidden lg:block" {...motionProps}>
          <Image
            src={pcEpigram}
            alt="PC 에피그램 이미지"
            width={640}
            height={864}
          />
        </motion.div>
      </div>
    </div>
  );
}
