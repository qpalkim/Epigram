import Image from "next/image";
import google from "@/assets/social/google.svg";
import kakao from "@/assets/social/kakao.svg";

export default function SocialLogin() {
  return (
    <div>
      <div className="mt-12 flex items-center gap-4">
        <div className="flex-1 border-t border-blue-400" />
        <p className="text-sm lg:text-lg text-blue-400 text-center font-medium">
          SNS 계정으로 간편 로그인하기
        </p>
        <div className="flex-1 border-t border-blue-400" />
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Image
          src={google}
          alt="구글 간편 로그인 아이콘"
          className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] cursor-pointer hover:grayscale-25"
        />
        <Image
          src={kakao}
          alt="카카오 간편 로그인 아이콘"
          className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] cursor-pointer hover:grayscale-25"
        />
      </div>
    </div>
  );
}
