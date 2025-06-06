"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin, useSignUp } from "@/lib/hooks/useAuth";
import { SignUpRequest, signUpRequestSchema } from "@/lib/types/auth";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo-lg.svg";
import eye from "@/assets/icons/eye.svg";
import eyeVisible from "@/assets/icons/eye-visible.svg";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function SignUpForm() {
  const { mutateAsync: signUp } = useSignUp();
  const { mutateAsync: login } = useLogin();
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpRequest>({
    resolver: zodResolver(signUpRequestSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpRequest) => {
    try {
      await signUp(data);
      const { email, password } = data;
      await login({ email, password });
      router.push("/epigrams");
      toast.success("회원가입에 성공했습니다.");
    } catch (err) {
      const error = err as AxiosError;
      const status = error?.response?.status;

      setError(status === 500 ? "nickname" : "email", {
        type: "manual",
        message:
          status === 500
            ? "이미 존재하는 닉네임입니다."
            : "이미 존재하는 이메일입니다.",
      });
      toast.error("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="relative mx-auto max-w-[640px] min-w-[312px] mt-14 mb-14 md:mt-20 md:mb-20 px-4 md:px-0">
      <div className="flex justify-center mb-12">
        <Link href="/">
          <Image src={logo} alt="로고" width={172} height={48} />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 md:space-y-10"
      >
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          {...register("email")}
          error={errors.email?.message}
        />
        <div>
          <div className="relative">
            <Input
              label="비밀번호"
              type={showPw ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              {...register("password", {
                onBlur: () => trigger("password"),
              })}
              error={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="cursor-pointer absolute top-12.5 lg:top-15 right-4"
              aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              <Image
                src={showPw ? eyeVisible : eye}
                width={24}
                height={24}
                alt="비밀번호 아이콘"
              />
            </button>
          </div>
          <div className="relative">
            <Input
              type={showPwConfirm ? "text" : "password"}
              placeholder="비밀번호를 한번 더 입력하세요"
              {...register("passwordConfirmation", {
                onBlur: () => trigger("passwordConfirmation"),
              })}
              error={errors.passwordConfirmation?.message}
            />
            <button
              type="button"
              onClick={() => setShowPwConfirm(!showPwConfirm)}
              className="cursor-pointer absolute top-6.5 lg:top-8.5 right-4"
              aria-label={
                showPwConfirm ? "비밀번호 확인 숨기기" : "비밀번호 확인 보기"
              }
            >
              <Image
                src={showPwConfirm ? eyeVisible : eye}
                width={24}
                height={24}
                alt="비밀번호 아이콘"
              />
            </button>
          </div>
        </div>
        <Input
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요"
          {...register("nickname")}
          error={errors.nickname?.message}
        />
        <Button
          type="submit"
          size="xl"
          className="w-full mt-5"
          disabled={!isValid || isSubmitting}
        >
          회원가입하기
        </Button>
      </form>
      <div className="mt-12 flex items-center gap-4">
        <div className="flex-grow border-t border-line-200" />
        <p className="text-center font-medium text-md lg:text-lg text-blue-400">
          이미 회원이신가요?&nbsp;
          <Link href="/login" className="underline text-black-500">
            로그인하기
          </Link>
        </p>
        <div className="flex-grow border-t border-line-200" />
      </div>
    </div>
  );
}
