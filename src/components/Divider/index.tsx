import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { dividerLine } from "../../../styled-system/recipes";

const StyledDivider = styled("hr", dividerLine);

export type DividerProps = HTMLStyledProps<typeof StyledDivider>;

export function Divider(props: DividerProps) {
  return <StyledDivider role="separator" {...props} />;
}

Divider.displayName = "Divider";
