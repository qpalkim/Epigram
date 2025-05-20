import UserContainer from "./_components/UserContainer";
import MyItems from "./_components/MyItems";
import { UserProfileProvider } from "@/lib/contexts/UserProfileContext";

export default function Page() {
  return (
    <UserProfileProvider>
      <div className="h-full mb-40">
        <UserContainer />
        <MyItems />
      </div>
    </UserProfileProvider>
  );
}
