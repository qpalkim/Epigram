"use client";
import { useMyData } from "@/lib/hooks/useUsers";
import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

export default function Header() {
  const { data: user } = useMyData();

  return user ? (
    <LoggedInHeader nickname={user.nickname} image={user.image} />
  ) : (
    <LoggedOutHeader />
  );
}
