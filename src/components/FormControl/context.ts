import { createContext, useContext } from "react";

export interface FormControlContextValue {
  id: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
}

export const FormControlContext = createContext<FormControlContextValue | null>(
  null
);

export function useFormControlContext() {
  return useContext(FormControlContext);
}
