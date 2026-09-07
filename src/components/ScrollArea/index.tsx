import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { scrollArea } from "../../../styled-system/recipes";

export const ScrollArea = styled("div", scrollArea);
ScrollArea.displayName = "ScrollArea";

export type ScrollAreaProps = HTMLStyledProps<typeof ScrollArea>;
