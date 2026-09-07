import { useState, type ImgHTMLAttributes } from "react";
import { cx } from "../../../styled-system/css";
import { avatar } from "../../../styled-system/recipes";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: Size;
  shape?: "circle" | "square";
  className?: string;
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
}

function getInitials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("");
}

export function Avatar({ src, alt, name, size = "md", shape = "circle", className, imgProps }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;

  return (
    <span className={cx(avatar({ size, shape }), className)} role="img" aria-label={alt ?? name}>
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? ""}
          onError={() => setImageFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          {...imgProps}
        />
      ) : (
        <span aria-hidden>{getInitials(name)}</span>
      )}
    </span>
  );
}

Avatar.displayName = "Avatar";
