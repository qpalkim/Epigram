"use client";
import { createContext, useContext, useState } from "react";

type UserProfileContextType = {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  nickname: string;
  setNickname: (name: string) => void;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const UserProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  return (
    <UserProfileContext.Provider
      value={{ profileImageUrl, setProfileImageUrl, nickname, setNickname }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error(
      "useUserProfileContext must be used within a UserProfileProvider"
    );
  }
  return context;
};
