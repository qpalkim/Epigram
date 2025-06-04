"use client";
import { useActionState, useEffect, useState } from "react";
import { useUserProfileContext } from "@/lib/contexts/UserProfileContext";
import {
  useMyData,
  useProfileImage,
  useUpdateMyData,
} from "@/lib/hooks/useUsers";
import { logout } from "@/lib/actions/logoutAction";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import ProfileImage from "@/components/ProfileImage";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";

export default function UserProfile() {
  const { data: user, isLoading, isError, refetch } = useMyData();
  const [state, formAction] = useActionState(logout, null);
  const { setProfileImageUrl, nickname, setNickname } = useUserProfileContext();
  const { mutate: uploadImage } = useProfileImage();
  const { mutate: patchUserData } = useUpdateMyData();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  }, [user?.nickname, setNickname]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    uploadImage(
      { image: file },
      {
        onSuccess: (res) => {
          setProfileImageUrl(res.url);
          patchUserData({ image: res.url });
          toast.success("프로필 이미지가 변경되었습니다.");
        },
        onError: () => {
          toast.error("프로필 이미지 변경에 실패했습니다.");
        },
      }
    );
  };

  const handleNicknameChange = () => {
    patchUserData(
      { nickname },
      {
        onSuccess: () => {
          toast.success("닉네임이 변경되었습니다.");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("닉네임 변경에 실패했습니다.");
        },
      }
    );
  };

  useEffect(() => {
    if (state?.status) {
      toast.success("로그아웃 처리되었습니다.");
      window.location.replace("/login");
    }
  }, [state]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[-25%] flex flex-col items-center justify-center gap-4">
      <label htmlFor="profile-upload">
        <ProfileImage src={previewImage || user?.image} size="lg" clickable />
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="focus:outline-none focus:border-gray-800 text-black-700 border-0 border-b-1 border-gray-300 px-2 py-1 text-sm lg:text-lg"
            />
            <Button
              size="sm"
              onClick={handleNicknameChange}
              className="w-[52px] lg:w-[60px]"
              disabled={nickname.trim() === ""}
            >
              저장
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-[52px] lg:w-[60px]"
              onClick={() => {
                setNickname(user?.nickname || "");
                setIsEditing(false);
              }}
            >
              취소
            </Button>
          </>
        ) : (
          <>
            <p
              className="text-black-950 font-medium text-lg lg:text-2lg cursor-pointer hover:bg-line-100 px-2 py-1 rounded-xl"
              onClick={() => setIsEditing(true)}
            >
              {user?.nickname}
            </p>
          </>
        )}
      </div>
      <Button variant="reference" size="sm" isRoundedFull onClick={formAction}>
        로그아웃
      </Button>
    </div>
  );
}
