import { useId, useRef, useState, type DragEvent } from "react";
import { cx } from "../../../styled-system/css";
import { dropzone } from "../../../styled-system/recipes";
import { CalendarIcon } from "../icons";

export interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  text?: string;
  hint?: string;
  className?: string;
}

export function Dropzone({
  onFilesSelected,
  accept,
  multiple = false,
  disabled = false,
  invalid = false,
  text = "Drop your file(s) here or click to browse",
  hint,
  className,
}: DropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);

  const styles = dropzone({ active, invalid, disabled });

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    onFilesSelected(Array.from(fileList));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(false);
    if (disabled) return;
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={cx(styles.root, className)}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setActive(true);
      }}
      onDragLeave={() => setActive(false)}
      onDrop={handleDrop}
    >
      <span className={styles.icon}>
        <CalendarIcon width={24} height={24} />
      </span>
      <span className={styles.text}>{text}</span>
      {hint && <span className={styles.hint}>{hint}</span>}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => handleFiles(event.target.files)}
        style={{ display: "none" }}
      />
    </div>
  );
}

Dropzone.displayName = "Dropzone";
