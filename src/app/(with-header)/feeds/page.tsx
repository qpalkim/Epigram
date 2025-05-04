import FloatingButton from "@/components/FloatingButton";
import FeedsContainer from "./_components/FeedsContainer";

export default function Page() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-[32px] lg:mt-[120px] max-[1250px]:px-6 min-[1251px]:px-0 mb-[140px]">
        <FeedsContainer />
      </div>
      <FloatingButton />
    </>
  );
}
