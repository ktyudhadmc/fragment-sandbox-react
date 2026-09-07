import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M10 12.667 5.333 8 10 3.333"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M6 3.333 10.667 8 6 12.667"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect
        x={2.667}
        y={3.333}
        width={10.667}
        height={10.667}
        rx={1.5}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M2.667 6.667h10.666M5.333 2v2.667M10.667 2v2.667"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M3.333 8.333 6.5 11.5l6.167-7"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M3.333 8h9.334"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M3.333 5.667 8 10.333l4.667-4.666"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx={8} cy={8} r={6} stroke="currentColor" strokeWidth={1.5} />
      <path d="M8 7.333V11" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={8} cy={5.167} r={0.833} fill="currentColor" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M8 1.667 14.667 13.333H1.333L8 1.667Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M8 6.667V9.333" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={8} cy={11.333} r={0.833} fill="currentColor" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
