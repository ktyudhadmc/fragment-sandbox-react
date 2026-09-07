import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { spinner } from "../../../styled-system/recipes";

const StyledSpinner = styled("span", spinner);

export type SpinnerProps = HTMLStyledProps<typeof StyledSpinner> & {
  label?: string;
};

export function Spinner({ label = "Loading", ...props }: SpinnerProps) {
  return <StyledSpinner role="status" aria-label={label} {...props} />;
}

Spinner.displayName = "Spinner";
