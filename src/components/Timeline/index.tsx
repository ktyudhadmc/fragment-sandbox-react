import type { ReactNode } from "react";
import { cx } from "../../../styled-system/css";
import { timeline } from "../../../styled-system/recipes";

export interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  const styles = timeline();
  return <div className={cx(styles.root, className)}>{children}</div>;
}

Timeline.displayName = "Timeline";

export interface TimelineItemProps {
  icon?: ReactNode;
  title: ReactNode;
  caption?: ReactNode;
  children?: ReactNode;
  isLast?: boolean;
}

export function TimelineItem({ icon, title, caption, children, isLast = false }: TimelineItemProps) {
  const styles = timeline();

  return (
    <div className={styles.item}>
      {!isLast && <span className={styles.connector} aria-hidden />}
      <span className={styles.dot}>{icon}</span>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {caption && <p className={styles.caption}>{caption}</p>}
        {children}
      </div>
    </div>
  );
}

TimelineItem.displayName = "TimelineItem";
