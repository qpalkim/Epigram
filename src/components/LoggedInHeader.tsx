import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import Link from "next/link";
import Image from "next/image";
import logoSm from "@/assets/logo/logo-sm.svg";
import menu from "@/assets/icons/menu.svg";
import xGray from "@/assets/icons/x-gray.svg";
import ProfileImage from "./ProfileImage";

export default function LoggedInHeader({
  nickname,
  image,
}: {
  nickname: string;
  image: string | null;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const closeMenu = () => setIsMenuOpen(false);
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  return (
    <header className="fixed w-full bg-blue-100 border-b border-gray-100 z-50">
      <div className="relative px-4 md:px-6 max-w-[1480px] mx-auto h-[52px] md:h-[70px] lg:h-[80px] flex items-center justify-between">
        <div className="flex gap-2 md:gap-6 items-center">
          <Image
            src={menu}
            className="md:hidden cursor-pointer"
            width={24}
            height={24}
            alt="메뉴 열기 아이콘"
            aria-label="메뉴 열기"
            onClick={() => setIsMenuOpen(true)}
          />
          <Link href="/">
            <Image
              src={logoSm}
              alt="로고"
              className="w-[101px] h-[26px] lg:w-[132px] lg:h-[36px]"
            />
          </Link>
          <Link
            href="/feeds"
            className="hidden md:block font-semibold text-md lg:text-lg text-black-600"
          >
            피드
          </Link>
          <Link
            href="/search"
            className="hidden md:block font-semibold text-md lg:text-lg text-black-600"
          >
            검색
          </Link>
        </div>
        <Link href="/mypage" className="flex gap-1 items-center">
          <ProfileImage src={image} size="sm" clickable />
          <p className="font-semibold text-md lg:text-lg text-black-600  hover:bg-line-100 px-2 py-1 rounded-xl">
            {nickname}
          </p>
        </Link>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative bg-blue-100 w-[220px] h-full p-4"
              ref={menuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <Image
                src={xGray}
                width={24}
                height={24}
                alt="메뉴 닫기 아이콘"
                className="absolute top-4 right-4 cursor-pointer"
                aria-label="메뉴 닫기"
                onClick={closeMenu}
              />
              <div className="absolute top-8 pl-2 text-black-600 text-lg font-semibold">
                <Link href="/feeds" className="block py-12" onClick={closeMenu}>
                  피드
                </Link>
                <Link href="/search" onClick={closeMenu}>
                  검색
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
