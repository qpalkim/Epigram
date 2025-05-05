"use client";
import { useEffect, useRef } from "react";
import { useClickOutside } from "@/lib/utils/useClickOutside";

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  onClose: () => void;
}

export default function Modal({
  children,
  className = "",
  onClose,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="모달 외부"
      role="dialog"
      aria-modal="true"
      className="pointer-events-auto fixed inset-0 z-100 flex h-full w-full items-center justify-center bg-gray-500/50"
    >
      <div
        id="모달"
        ref={modalRef}
        className={`rounded-3xl bg-blue-100 p-6 shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
