"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/hooks/useAuth";
import { LoginRequest, loginRequestSchema } from "@/lib/types/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo-lg.svg";
import eye from "@/assets/icons/eye.svg";
import eyeVisible from "@/assets/icons/eye-visible.svg";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SocialLogin from "@/components/SocialLogin";

export default function LoginForm() {
  const { mutateAsync: login } = useLogin();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("로그인에 성공했습니다.");
      router.push("/epigrams");
    } catch {
      setError("email", {
        type: "manual",
        message: "이메일 혹은 비밀번호를 확인해 주세요.",
      });
      toast.error("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="relative mx-auto max-w-[640px] min-w-[312px] mt-40 mb-40 md:mt-35 md:mb-35 px-4 md:px-0">
      <div className="flex justify-center mb-12">
        <Link href="/">
          <Image src={logo} alt="로고" width={172} height={48} />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          {...register("email")}
          error={errors.email?.message}
        />
        <div className="relative">
          <Input
            type={isShowPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            {...register("password", {
              onBlur: () => trigger("password"),
            })}
            error={errors.password?.message}
          />
          <Image
            src={isShowPassword ? eyeVisible : eye}
            width={24}
            height={24}
            alt="비밀번호 눈 아이콘"
            onClick={() => setIsShowPassword((prev) => !prev)}
            className="cursor-pointer absolute top-7 lg:top-9 right-4"
          />
        </div>
        <Button
          type="submit"
          size="xl"
          className="w-full mt-5"
          disabled={!isValid || isSubmitting}
        >
          로그인하기
        </Button>
      </form>
      <p className="mt-12 text-center font-medium text-md lg:text-lg text-blue-400">
        회원이 아니신가요?&nbsp;
        <Link href="/signup" className="underline text-black-500">
          회원가입하기
        </Link>
      </p>
      <SocialLogin />
    </div>
  );
}
