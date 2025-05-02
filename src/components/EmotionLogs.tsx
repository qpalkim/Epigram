"use client";
import { useState } from "react";
import { useCreateEmotionLogsToday } from "@/lib/hooks/useEmotionLogs";
import { Emotion, EmotionLabels } from "@/lib/types/emotionLogs";
import Image from "next/image";
import moved from "@/assets/emotion/moved.svg";
import happy from "@/assets/emotion/happy.svg";
import worried from "@/assets/emotion/worried.svg";
import sad from "@/assets/emotion/sad.svg";
import angry from "@/assets/emotion/angry.svg";

const emotions = [
  { label: Emotion.MOVED, icon: moved },
  { label: Emotion.HAPPY, icon: happy },
  { label: Emotion.WORRIED, icon: worried },
  { label: Emotion.SAD, icon: sad },
  { label: Emotion.ANGRY, icon: angry },
];

const emotionColors: Record<Emotion, { base: string; hover: string }> = {
  [Emotion.MOVED]: {
    base: "border-illust-yellow",
    hover: "hover:border-illust-yellow",
  },
  [Emotion.HAPPY]: {
    base: "border-illust-green",
    hover: "hover:border-illust-green",
  },
  [Emotion.WORRIED]: {
    base: "border-illust-purple",
    hover: "hover:border-illust-purple",
  },
  [Emotion.SAD]: {
    base: "border-illust-blue",
    hover: "hover:border-illust-blue",
  },
  [Emotion.ANGRY]: {
    base: "border-illust-red",
    hover: "hover:border-illust-red",
  },
};

export default function EmotionLogs() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const mutation = useCreateEmotionLogsToday();

  const handleEmotionClick = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    mutation.mutate({ emotion });
  };

  return (
    <div className="flex justify-center gap-4">
      {emotions.map((emotion) => (
        <div key={emotion.label} className="w-[56px] md:w-[96px] aspect-square">
          <div
            onClick={() => handleEmotionClick(emotion.label)}
            className={`w-full h-full flex items-center justify-center hover:bg-blue-100
              ${
                selectedEmotion === emotion.label
                  ? "bg-blue-100"
                  : "bg-blue-200"
              }
              ${emotionColors[emotion.label].hover}
               cursor-pointer p-3 md:p-4 lg:p-6 rounded-2xl 
               border-2 transition-colors duration-200 
              ${
                selectedEmotion === emotion.label
                  ? emotionColors[emotion.label].base
                  : "border-transparent"
              }`}
          >
            <Image
              src={emotion.icon}
              alt={`${emotion.label} 아이콘`}
              className="relative w-[32px] md:w-[48px] aspect-square"
            />
          </div>
          <p className="mt-2 font-semibold text-gray-400 text-center text-md md:text-lg">
            {EmotionLabels[emotion.label]}
          </p>
        </div>
      ))}
    </div>
  );
}
