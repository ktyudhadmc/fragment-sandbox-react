import { styled } from "../../../styled-system/jsx";
import type { HTMLStyledProps } from "../../../styled-system/jsx";
import { skeleton } from "../../../styled-system/recipes";

const StyledSkeleton = styled("div", skeleton);

export type SkeletonProps = HTMLStyledProps<typeof StyledSkeleton>;

export function Skeleton(props: SkeletonProps) {
  return <StyledSkeleton aria-hidden {...props} />;
}

Skeleton.displayName = "Skeleton";
