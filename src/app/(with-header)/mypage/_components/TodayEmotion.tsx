import EmotionLogs from "@/components/EmotionLogs";

export default function TodayEmotion() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-semibold text-black-600 text-lg lg:text-2lg mb-6">
          오늘의 감정
        </h2>
        <p className="text-lg lg:text-2lg text-blue-400">{formattedDate}</p>
      </div>
      <EmotionLogs />
    </div>
  );
}
