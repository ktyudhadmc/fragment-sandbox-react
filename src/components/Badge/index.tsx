import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { badge } from "../../../styled-system/recipes";

export const Badge = styled("span", badge);
Badge.displayName = "Badge";

export type BadgeProps = HTMLStyledProps<typeof Badge>;
