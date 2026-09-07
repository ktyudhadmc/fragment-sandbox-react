import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { textlink } from "../../../styled-system/recipes";

export const Textlink = styled("a", textlink);
Textlink.displayName = "Textlink";

export type TextlinkProps = HTMLStyledProps<typeof Textlink>;
