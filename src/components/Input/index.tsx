import { forwardRef } from "react";
import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { input } from "../../../styled-system/recipes";
import { useFormControlContext } from "../FormControl/context";

const StyledInput = styled("input", input);

export interface InputProps extends HTMLStyledProps<typeof StyledInput> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, disabled, invalid, required, readOnly, ...props }, ref) => {
    const ctx = useFormControlContext();

    return (
      <StyledInput
        ref={ref}
        id={id ?? ctx?.id}
        disabled={disabled ?? ctx?.disabled}
        invalid={invalid ?? ctx?.invalid}
        required={required ?? ctx?.required}
        readOnly={readOnly ?? ctx?.readOnly}
        aria-invalid={(invalid ?? ctx?.invalid) || undefined}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
