import Image from "next/image";
import xGray from "@/assets/icons/x-gray.svg";
import ProfileImage from "./ProfileImage";

export default function UserInfoModal({
  image,
  nickname,
  onClose,
}: {
  image: string | null;
  nickname: string;
  onClose: () => void;
}) {
  return (
    <div className="w-[280px] lg:w-[312px]">
      <div className="flex justify-end cursor-pointer">
        <Image
          src={xGray}
          width={24}
          height={24}
          alt="모달 닫기 아이콘"
          onClick={onClose}
        />
      </div>
      <div className="flex flex-col items-center">
        <ProfileImage src={image} size="md" className="mb-6" />
        <p className="text-black-400 font-semibold text-md lg:text-lg">
          {nickname}
        </p>
      </div>
    </div>
  );
}
