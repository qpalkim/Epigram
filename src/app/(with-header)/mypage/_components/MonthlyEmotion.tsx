"use client";
import { useState } from "react";
import { useMyData } from "@/lib/hooks/useUsers";
import { useEmotionLogsMonthly } from "@/lib/hooks/useEmotionLogs";
import { Emotion } from "@/lib/types/emotionLogs";
import Calendar, { CalendarProps } from "react-calendar";
import SelectOption from "@/components/SelectOption";
import Image from "next/image";
import moved from "@/assets/emotion/moved.svg";
import happy from "@/assets/emotion/happy.svg";
import worried from "@/assets/emotion/worried.svg";
import sad from "@/assets/emotion/sad.svg";
import angry from "@/assets/emotion/angry.svg";
import chevronLeft from "@/assets/icons/chevron-left.svg";
import chevornRight from "@/assets/icons/chevron-right.svg";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

export default function MonthlyEmotion() {
  const [value, setValue] = useState(new Date());
  const [filter, setFilter] = useState<string>("");
  const { data: user } = useMyData();
  const { data, isLoading } = useEmotionLogsMonthly({
    userId: user?.id,
    year: value.getFullYear(),
    month: value.getMonth() + 1,
  });

  const emotionOptions = [
    { label: "전체", onClick: () => setFilter("") },
    { label: "감동", onClick: () => setFilter(Emotion.MOVED) },
    { label: "기쁨", onClick: () => setFilter(Emotion.HAPPY) },
    { label: "고민", onClick: () => setFilter(Emotion.WORRIED) },
    { label: "슬픔", onClick: () => setFilter(Emotion.SAD) },
    { label: "분노", onClick: () => setFilter(Emotion.ANGRY) },
  ];

  const emotionIcon = [
    { label: Emotion.MOVED, icon: moved },
    { label: Emotion.HAPPY, icon: happy },
    { label: Emotion.WORRIED, icon: worried },
    { label: Emotion.SAD, icon: sad },
    { label: Emotion.ANGRY, icon: angry },
  ];

  const emotions =
    data?.map((log) => ({
      date: log.createdAt.slice(0, 10),
      emotion: log.emotion,
    })) ?? [];

  const filteredEmotions = filter
    ? emotions.filter((log) => log.emotion === filter)
    : emotions;

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const found = filteredEmotions.find((e) => e.date === dateStr);
      if (!found) return null;

      const foundEmotion = emotionIcon.find((e) => e.label === found.emotion);
      if (!foundEmotion) return null;

      return (
        <div className="md:mt-2">
          <Image
            src={foundEmotion.icon}
            alt={foundEmotion.label}
            className="w-[20px] h-[20px] md:w-[32px] md:h-[32px]"
          />
        </div>
      );
    }
    return null;
  };

  const handleChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) setValue(value);
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="relative">
      <Calendar
        onChange={handleChange}
        value={value}
        formatDay={(locale, date) => date.getDate().toString()}
        prev2Label={null}
        next2Label={null}
        prevLabel={<Image src={chevronLeft} alt="이전 월" />}
        nextLabel={<Image src={chevornRight} alt="다음 월" />}
        tileContent={tileContent}
        calendarType="hebrew"
        tileClassName={({ date, view, activeStartDate }) => {
          if (view !== "month") return "";

          const viewMonth = activeStartDate.getMonth();
          const dateMonth = date.getMonth();
          const day = date.getDay();
          const isSameMonth = dateMonth === viewMonth;

          if (!isSameMonth) return "dimmed";
          if (day === 0) return "sunday";
          if (day === 6) return "saturday";
          if (day === 5) return "friday";
          return "";
        }}
      />
      <div className="mb-4 top-1 absolute right-[28%] md:right-[16%]">
        <SelectOption options={emotionOptions} />
      </div>
    </div>
  );
}
