import { useEffect, useRef, useState, type ReactNode } from "react";

export interface CollapseProps {
  isOpen: boolean;
  children: ReactNode;
  duration?: number;
  className?: string;
}

export function Collapse({ isOpen, children, duration = 250, className }: CollapseProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(isOpen ? "auto" : 0);

  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;

    if (isOpen) {
      const target = node.scrollHeight;
      setHeight(target);
      const timer = setTimeout(() => setHeight("auto"), duration);
      return () => clearTimeout(timer);
    }

    const current = node.scrollHeight;
    setHeight(current);
    requestAnimationFrame(() => setHeight(0));
  }, [isOpen, duration]);

  return (
    <div
      style={{
        height: height === "auto" ? "auto" : `${height}px`,
        overflow: "hidden",
        transition: `height ${duration}ms ease-in-out`,
      }}
      className={className}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

Collapse.displayName = "Collapse";
