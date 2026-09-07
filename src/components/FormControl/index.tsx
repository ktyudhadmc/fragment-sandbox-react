import { useId, type ReactNode } from "react";
import { cx } from "../../../styled-system/css";
import { formControl } from "../../../styled-system/recipes";
import { FormControlContext, useFormControlContext } from "./context";

export interface FormControlProps {
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormControl({
  id,
  disabled = false,
  invalid = false,
  required = false,
  readOnly = false,
  children,
  className,
}: FormControlProps) {
  const generatedId = useId();
  const styles = formControl();

  return (
    <FormControlContext.Provider
      value={{ id: id ?? generatedId, disabled, invalid, required, readOnly }}
    >
      <div className={cx(styles.root, className)}>{children}</div>
    </FormControlContext.Provider>
  );
}

FormControl.displayName = "FormControl";

export interface FormLabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export function FormLabel({ children, htmlFor, className }: FormLabelProps) {
  const ctx = useFormControlContext();
  const styles = formControl();

  return (
    <label htmlFor={htmlFor ?? ctx?.id} className={cx(styles.label, className)}>
      {children}
      {ctx?.required && <span className={styles.requiredMark}>*</span>}
    </label>
  );
}

FormLabel.displayName = "FormLabel";

export interface FormHelperTextProps {
  children: ReactNode;
  className?: string;
}

export function FormHelperText({ children, className }: FormHelperTextProps) {
  const ctx = useFormControlContext();
  const styles = formControl();

  if (ctx?.invalid) return null;

  return <p className={cx(styles.helperText, className)}>{children}</p>;
}

FormHelperText.displayName = "FormHelperText";

export interface FormErrorMessageProps {
  children: ReactNode;
  className?: string;
}

export function FormErrorMessage({ children, className }: FormErrorMessageProps) {
  const ctx = useFormControlContext();
  const styles = formControl();

  if (!ctx?.invalid) return null;

  return (
    <p role="alert" className={cx(styles.errorText, className)}>
      {children}
    </p>
  );
}

FormErrorMessage.displayName = "FormErrorMessage";
