import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logoSm from "@/assets/logo/logo-sm.svg";
import search from "@/assets/icons/search.svg";
import user from "@/assets/icons/user.svg";

export default function LoggedOutHeader() {
  const pathname = usePathname();
  const isAuthPage = pathname == "/login" || pathname === "/signup";

  return (
    <header className="fixed w-full bg-blue-100 border-b border-gray-100 z-50">
      <div className="relative px-4 md:px-6 max-w-[1480px] mx-auto h-[52px] md:h-[70px] lg:h-[80px] flex items-center">
        {!isAuthPage && (
          <Link href="/search" className="absolute left-4">
            <Image
              src={search}
              alt="검색 아이콘"
              className="w-[20px] lg:w-[28px]"
            />
          </Link>
        )}

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src={logoSm}
            alt="로고"
            className="w-[101px] h-[26px] lg:w-[132px] lg:h-[36px]"
          />
        </Link>

        {!isAuthPage && (
          <Link href="/mypage" className="absolute right-4">
            <Image
              src={user}
              alt="유저 아이콘"
              className="w-[20px] lg:w-[28px]"
            />
          </Link>
        )}
      </div>
    </header>
  );
}
