import * as React from "react";
import { cn } from "@/libs/utils/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  iconLeftClassName?: string;
  iconRightClassName?: string;
}

function Input({
  className,
  type,
  label,
  leftIcon,
  rightIcon,
  containerClassName,
  labelClassName,
  iconLeftClassName,
  iconRightClassName,
  required,
  ...props
}: InputProps) {
  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <label
          className={cn(
            "mb-1.5 block text-sm font-medium text-foreground",
            labelClassName
          )}
        >
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              iconLeftClassName
            )}
          >
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          data-slot="input"
          required={required}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus:border-blue-500",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              iconRightClassName
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

export { Input };
