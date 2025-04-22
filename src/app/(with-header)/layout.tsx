import { ReactNode } from "react";
import Header from "@/components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="pt-[52px] md:pt-[70px] lg:pt-[80px]">{children}</main>
    </div>
  );
}
