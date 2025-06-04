"use client";
import { useState } from "react";
import { useMyData } from "@/lib/hooks/useUsers";
import { useEmotionLogsMonthly } from "@/lib/hooks/useEmotionLogs";
import { Emotion } from "@/lib/types/emotionLogs";
import Calendar, { CalendarProps } from "react-calendar";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import SelectOption from "@/components/SelectOption";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";
import Image from "next/image";
import chevronLeft from "@/assets/icons/chevron-left.svg";
import chevornRight from "@/assets/icons/chevron-right.svg";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const EMOTION_DATA = {
  MOVED: { label: "감동", icon: "/emotion/moved.svg", color: "#fbc85b" },
  HAPPY: { label: "기쁨", icon: "/emotion/happy.svg", color: "#48bb98" },
  WORRIED: { label: "고민", icon: "/emotion/worried.svg", color: "#8e80e3" },
  SAD: { label: "슬픔", icon: "/emotion/sad.svg", color: "#5195ee" },
  ANGRY: { label: "분노", icon: "/emotion/angry.svg", color: "#e46e80" },
};

export default function EmotionDashboard() {
  const [value, setValue] = useState(new Date());
  const [filter, setFilter] = useState<string>("");
  const { data: user } = useMyData();
  const { data, isLoading, isError, refetch } = useEmotionLogsMonthly({
    userId: user?.id,
    year: value.getFullYear(),
    month: value.getMonth() + 1,
  });

  const emotionOptions = [
    { label: "전체", onClick: () => setFilter("") },
    ...Object.entries(EMOTION_DATA).map(([key, { label }]) => ({
      label,
      onClick: () => setFilter(key),
    })),
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
    if (view !== "month") return null;
    const dateStr = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const found = filteredEmotions.find((e) => e.date === dateStr);
    if (!found) return null;

    const icon = EMOTION_DATA[found.emotion as Emotion]?.icon;
    if (!icon) return null;

    return (
      <div className="md:mt-2">
        <Image
          src={icon}
          alt={EMOTION_DATA[found.emotion as Emotion]?.label}
          width={20}
          height={20}
          className="w-[20px] h-[20px] md:w-[32px] md:h-[32px]"
        />
      </div>
    );
  };

  const handleChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) setValue(value);
  };

  const emotionCount = filteredEmotions.reduce((acc, { emotion }) => {
    acc[emotion as Emotion] = (acc[emotion as Emotion] || 0) + 1;
    return acc;
  }, {} as Record<Emotion, number>);

  const pieData = Object.entries(emotionCount).map(([name, value]) => ({
    name,
    value,
  }));

  const maxEmotion = pieData.reduce(
    (max, curr) => (curr.value > max.value ? curr : max),
    { name: "", value: 0 }
  ).name as Emotion;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <div className="relative flex flex-col">
      <div className="mb-14">
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
            const isSameMonth = date.getMonth() === activeStartDate.getMonth();
            const day = date.getDay();

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

      <h2 className="font-semibold text-black-600 text-lg lg:text-2lg mb-6">
        감정 차트
      </h2>

      <div className="w-full flex flex-col items-center border border-line-100 rounded-3xl">
        {pieData.length > 0 ? (
          <div className="w-full flex flex-row justify-center items-center gap-8 md:gap-30">
            <div className="relative w-[160px] md:w-[200px]">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    innerRadius={65}
                    isAnimationActive={false}
                    paddingAngle={3}
                    startAngle={90}
                    endAngle={-270}
                    label={false}
                    cornerRadius={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={EMOTION_DATA[entry.name as Emotion]?.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                <Image
                  src={EMOTION_DATA[maxEmotion]?.icon}
                  alt={EMOTION_DATA[maxEmotion]?.label}
                  width={40}
                  height={40}
                />
                <span className="text-center text-lg font-semibold text-black-600 mt-1">
                  {EMOTION_DATA[maxEmotion]?.label}
                </span>
              </div>
            </div>

            <div>
              {pieData.map((entry) => {
                const { label, color } = EMOTION_DATA[entry.name as Emotion];
                return (
                  <div
                    key={entry.name}
                    className="flex gap-2 items-center mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm">{label}</span>
                    </div>
                    <span className="text-sm font-semibold text-black-600">
                      {((entry.value / filteredEmotions.length) * 100).toFixed(
                        0
                      )}
                      %
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-[250px] flex items-center justify-center">
            <p className="text-md text-black-600 text-center">
              해당 월에 기록된 감정이 없어요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
