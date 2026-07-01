import { forwardRef, type ReactNode } from "react";
import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { button } from "../../../styled-system/recipes";

const StyledButton = styled("button", button);

export interface ButtonProps extends HTMLStyledProps<typeof StyledButton> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, startIcon, endIcon, ...props }, ref) => {
    return (
      <StyledButton ref={ref} {...props}>
        {startIcon && <span className="flex items-center">{startIcon}</span>}
        {children}
        {endIcon && <span className="flex items-center">{endIcon}</span>}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
