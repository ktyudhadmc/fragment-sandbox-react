import { forwardRef, type ReactNode } from "react";
import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { iconButton } from "../../../styled-system/recipes";

const StyledIconButton = styled("button", iconButton);

export interface IconButtonProps
  extends HTMLStyledProps<typeof StyledIconButton> {
  icon: ReactNode;
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, type = "button", ...props }, ref) => {
    return (
      <StyledIconButton ref={ref} type={type} {...props}>
        {icon}
      </StyledIconButton>
    );
  }
);

IconButton.displayName = "IconButton";
