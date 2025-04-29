import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

const errorResponse = (error: unknown) => {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 500;

    if (status === 400) {
      return NextResponse.json(
        { message: "잘못된 요청입니다. 입력 값을 확인해 주세요." },
        { status: 400 }
      );
    }
    if (status === 401) {
      return NextResponse.json(
        { message: "인증이 필요합니다. 로그인 후, 다시 시도해 주세요." },
        { status: 401 }
      );
    }
    return NextResponse.json(error.response?.data, {
      status: status,
    });
  }

  return NextResponse.json(
    {
      message: "서버 오류가 발생했습니다. 다시 시도해 주세요.",
    },
    { status: 500 }
  );
};

export default errorResponse;
