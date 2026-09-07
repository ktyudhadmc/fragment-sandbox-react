import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { text } from "../../../styled-system/recipes";

export const Text = styled("p", text);
Text.displayName = "Text";

export type TextProps = HTMLStyledProps<typeof Text>;
