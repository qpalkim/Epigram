"use client";
import { useMyData } from "@/lib/hooks/useUsers";
import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

export default function Header() {
  const { data: me } = useMyData();

  return me ? (
    <LoggedInHeader nickname={me.nickname} image={me.image} />
  ) : (
    <LoggedOutHeader />
  );
}
