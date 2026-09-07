import { forwardRef } from "react";
import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { textarea } from "../../../styled-system/recipes";
import { useFormControlContext } from "../FormControl/context";

const StyledTextarea = styled("textarea", textarea);

export interface TextareaProps extends HTMLStyledProps<typeof StyledTextarea> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, disabled, invalid, required, readOnly, ...props }, ref) => {
    const ctx = useFormControlContext();

    return (
      <StyledTextarea
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

Textarea.displayName = "Textarea";
