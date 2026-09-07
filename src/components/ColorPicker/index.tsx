import { useId, useRef, useState } from "react";
import { css, cx } from "../../../styled-system/css";
import { useDismiss } from "../../hooks/useDismiss";
import { Input } from "../Input";

const DEFAULT_SWATCHES = [
  "#dc2626",
  "#d97706",
  "#facc15",
  "#16a34a",
  "#0891b2",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#525252",
  "#000000",
];

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  swatches?: string[];
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function ColorPicker({
  value,
  onChange,
  swatches = DEFAULT_SWATCHES,
  disabled = false,
  className,
  ...rest
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useDismiss(open, containerRef, () => setOpen(false));

  const commitHex = (hex: string) => {
    setDraft(hex);
    if (HEX_PATTERN.test(hex)) onChange(hex);
  };

  return (
    <div ref={containerRef} className={cx(css({ position: "relative", display: "inline-block" }), className)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={rest["aria-label"] ?? "Pick a color"}
        onClick={() => {
          if (disabled) return;
          setDraft(value);
          setOpen((v) => !v);
        }}
        className={css({
          w: "9",
          h: "9",
          rounded: "md",
          borderWidth: "1px",
          borderColor: "gray.300",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          padding: "1",
        })}
      >
        <span
          className={css({ display: "block", width: "full", height: "full", rounded: "sm" })}
          style={{ background: value }}
        />
      </button>

      {open && !disabled && (
        <div
          role="dialog"
          className={css({
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            zIndex: 50,
            bg: "white",
            rounded: "lg",
            borderWidth: "1px",
            borderColor: "gray.200",
            boxShadow: "lg",
            p: "3",
            display: "flex",
            flexDirection: "column",
            gap: "3",
            width: "56",
          })}
        >
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "2",
            })}
          >
            {swatches.map((swatch) => (
              <button
                key={swatch}
                type="button"
                aria-label={swatch}
                aria-pressed={swatch.toLowerCase() === value.toLowerCase()}
                onClick={() => {
                  setDraft(swatch);
                  onChange(swatch);
                }}
                className={css({
                  w: "7",
                  h: "7",
                  rounded: "full",
                  borderWidth: "2px",
                  cursor: "pointer",
                })}
                style={{
                  background: swatch,
                  borderColor:
                    swatch.toLowerCase() === value.toLowerCase() ? "#2563eb" : "transparent",
                }}
              />
            ))}
          </div>

          <label htmlFor={inputId} className={css({ fontSize: "xs", color: "gray.500" })}>
            Hex value
          </label>
          <Input
            id={inputId}
            size="sm"
            value={draft}
            onChange={(event) => commitHex(event.target.value)}
            invalid={!HEX_PATTERN.test(draft)}
          />
        </div>
      )}
    </div>
  );
}

ColorPicker.displayName = "ColorPicker";
