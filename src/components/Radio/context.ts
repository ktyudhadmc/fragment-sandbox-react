import { createContext, useContext } from "react";

export interface RadioGroupContextValue {
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null
);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}
