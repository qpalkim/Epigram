import { Suspense } from "react";
import SearchContainer from "./_components/SearchContainer";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SearchContainer />
    </Suspense>
  );
}
