import UserProfile from "./UserProfile";
import TodayEmotion from "./TodayEmotion";
import EmotionDashboard from "./EmotionDashboard";

export default function UserContainer() {
  return (
    <div
      className="relative bg-blue-100 w-full rounded-3xl mt-16 lg:mt-32"
      style={{
        filter: "drop-shadow(0px 0px 36px rgba(0,0,0,0.05))",
      }}
    >
      <div className="max-w-[640px] w-full mx-auto px-6 md:px-0 pb-9 md:pb-14 lg:pb-25">
        <UserProfile />
        <div className="pt-[180px] lg:pt-[275px] space-y-[60px] lg:space-y-[165px]">
          <TodayEmotion />
          <EmotionDashboard />
        </div>
      </div>
    </div>
  );
}
