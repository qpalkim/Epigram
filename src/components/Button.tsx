import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import Link from "next/link";

const buttonVariants = cva(
  "cursor-pointer transition-all duration-200 flex items-center justify-center whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-black-500 text-blue-100 font-semibold hover:bg-black-600 active:bg-black-700 disabled:bg-blue-300 disabled:text-blue-100",
        outline:
          "font-medium text-blue-500 border-1 text-blue-400 border-line-200 hover:bg-blue-200",
        secondary: "bg-blue-900 text-blue-100 font-semibold hover:bg-blue-950",
        tertiary: "bg-background-100 text-black-300",
        reference: "bg-line-100 text-gray-300 font-medium",
      },
      size: {
        sm: "h-[32px] lg:h-[44px] text-xs lg:text-lg px-3 rounded-[8px]",
        md: "h-[42px] lg:h-[48px] text-md lg:text-2lg px-3 rounded-[12px]",
        lg: "h-[42px] lg:h-[56px] text-lg lg:text-2lg px-4 rounded-[16px]",
        xl: "h-[48px] lg:h-[64px] text-lg lg:text-2lg px-4 rounded-[16px]",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isRoundedFull?: boolean;
  href?: string;
  ariaLabel?: string;
  className?: string;
  target?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  isRoundedFull = false,
  href,
  ariaLabel,
  variant,
  size,
  className,
  target,
}: ButtonProps) {
  const finalClassName = cn(
    buttonVariants({ variant, disabled, size }),
    isRoundedFull ? "rounded-full" : "",
    className
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={finalClassName}
        aria-label={ariaLabel}
        target={target}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
