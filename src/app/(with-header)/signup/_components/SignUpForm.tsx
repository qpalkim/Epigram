"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin, useSignup } from "@/lib/hooks/useAuth";
import { SignupRequest, signupRequestSchema } from "@/lib/types/auth";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo-lg.svg";
import eye from "@/assets/icons/eye.svg";
import eyeVisible from "@/assets/icons/eye-visible.svg";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SocialLogin from "@/components/SocialLogin";

export default function SignUpForm() {
  const { mutateAsync: signup } = useSignup();
  const { mutateAsync: login } = useLogin();
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupRequest>({
    resolver: zodResolver(signupRequestSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupRequest) => {
    try {
      await signup(data);
      const { email, password } = data;
      await login({ email, password });
      toast.success("회원가입에 성공했습니다.");
      router.push("/epigrams");
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
              className="cursor-pointer absolute top-12 lg:top-15 right-4"
            />
          </div>
          <div className="relative">
            <Input
              type={isShowPasswordConfirm ? "text" : "password"}
              placeholder="비밀번호를 확인해 주세요"
              {...register("passwordConfirmation", {
                onBlur: () => trigger("passwordConfirmation"),
              })}
              error={errors.passwordConfirmation?.message}
            />
            <Image
              src={isShowPasswordConfirm ? eyeVisible : eye}
              width={24}
              height={24}
              alt="비밀번호 눈 아이콘"
              onClick={() => setIsShowPasswordConfirm((prev) => !prev)}
              className="cursor-pointer absolute top-7 lg:top-9 right-4"
            />
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
      <p className="mt-12 text-center font-medium text-md lg:text-lg text-blue-400">
        이미 회원이신가요?&nbsp;
        <Link href="/login" className="underline text-black-500">
          로그인하기
        </Link>
      </p>
      <SocialLogin />
    </div>
  );
}
