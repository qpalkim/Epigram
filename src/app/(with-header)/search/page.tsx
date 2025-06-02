import { Suspense } from "react";
import SearchContainer from "./_components/SearchContainer";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContainer />
    </Suspense>
  );
}
