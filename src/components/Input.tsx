import { Ref, useId } from "react";
import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
} from "react";

export type Field = {
  label?: string;
  error?: string;
};

export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Label({
  required,
  children,
  className,
  ...props
}: PropsWithChildren<
  LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>) {
  return (
    <label
      className={cn(
        "text-blue-900 flex items-center gap-1 text-md lg:text-2lg font-medium",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="pt-1.5 text-lg font-medium text-error-100">*</span>
      )}
    </label>
  );
}

export function Error({ children }: PropsWithChildren) {
  return (
    <span className="block mt-2 lg:text-md text-sm text-error-100">
      {children}
    </span>
  );
}

export type InputProps = Field &
  InputHTMLAttributes<HTMLInputElement> & {
    inputRef?: Ref<HTMLInputElement>;
    whiteBg?: boolean;
  };

export default function Input({
  label,
  error,
  className,
  inputRef,
  whiteBg,
  ...props
}: InputProps) {
  const id = useId();

  return (
    <div>
      {label && (
        <Label required={props.required} htmlFor={id}>
          {label}
        </Label>
      )}
      <input
        id={id}
        className={cn(
          "h-[44px] lg:h-[60px] rounded-xl text-black-950 mt-4 w-full placeholder:text-blue-400 text-md lg:text-lg bg-blue-200 border p-3 focus:outline-2",
          whiteBg ? "bg-white" : undefined,
          error
            ? "border-error-100 focus:outline-error-100"
            : "border-blue-300 hover:border-blue-500 focus:outline-blue-500",
          className
        )}
        ref={inputRef}
        {...props}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <Error>{error}</Error>}
    </div>
  );
}
