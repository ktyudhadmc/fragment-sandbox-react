// src/components/Button/Button.tsx
import { forwardRef, type ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";

interface ButtonProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md";
  variant?: "primary" | "danger" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "md",
      variant = "primary",
      onClick,
      className = "",
      disabled = false,
      type,
    },
    ref,
  ) => {
    const sizeStyle = {
      xs: css({ px: "3", py: "1.5", fontSize: "xs" }),
      sm: css({ px: "4", py: "2", fontSize: "sm" }),
      md: css({ px: "5", py: "2.5", fontSize: "sm" }),
    };

    const variantStyle = {
      primary: css({
        bg: "blue.500",
        color: "white",
        _hover: { bg: "blue.600" },
      }),
      danger: css({ bg: "red.500", color: "white", _hover: { bg: "red.600" } }),
      outline: css({
        bg: "white",
        color: "gray.700",
        borderWidth: "1px",
        borderColor: "gray.300",
        _hover: { bg: "gray.50" },
      }),
    };

    const baseStyle = css({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "2",
      rounded: "md",
      fontWeight: "medium",
      transition: "background 0.2s",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    });

    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          baseStyle,
          sizeStyle[size],
          variantStyle[variant],
          className,
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
