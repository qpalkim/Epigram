"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import Image from "next/image";
import defaultProfile from "@/assets/icons/default-profile.svg";

const profileImageVariants = cva(
  "relative rounded-full border border-blue-300",
  {
    variants: {
      size: {
        sm: "w-[28px] h-[28px] lg:w-[36px] lg:h-[36px]",
        md: "w-[48px] h-[48px]",
        lg: "w-[80px] h-[80px] lg:w-[140px] lg:h-[140px]",
      },
      clickable: {
        true: "cursor-pointer hover:brightness-90",
        false: "cursor-default",
      },
    },
    defaultVariants: {
      size: "md",
      clickable: false,
    },
  }
);

interface ProfileImageProps extends VariantProps<typeof profileImageVariants> {
  src: string | null | undefined;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export default function ProfileImage({
  src,
  size,
  clickable,
  className,
  onClick,
}: ProfileImageProps) {
  return (
    <div
      className={cn(profileImageVariants({ size, clickable }), className)}
      onClick={clickable ? onClick : undefined}
    >
      <Image
        className="rounded-full object-cover"
        src={src || defaultProfile}
        alt="프로필 이미지"
        fill
      />
    </div>
  );
}
