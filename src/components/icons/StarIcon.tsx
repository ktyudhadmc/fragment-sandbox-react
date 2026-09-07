import type { IconProps } from "./index";

export function StarIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M10 1.667l2.575 5.217 5.758.837-4.166 4.062.983 5.734L10 14.767l-5.15 2.75.983-5.734L1.667 7.72l5.758-.836L10 1.667Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
    </svg>
  );
}
