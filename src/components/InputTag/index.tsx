import { useId, useState, type KeyboardEvent } from "react";
import { cx } from "../../../styled-system/css";
import { inputTag } from "../../../styled-system/recipes";
import { CloseIcon } from "../icons";

export interface InputTagProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  maxTags?: number;
  id?: string;
  name?: string;
  className?: string;
}

export function InputTag({
  value = [],
  onChange,
  placeholder = "Add a tag",
  disabled = false,
  invalid = false,
  maxTags = 100,
  id,
  name,
  className,
}: InputTagProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [draft, setDraft] = useState("");

  const styles = inputTag({ invalid, disabled });
  const atLimit = value.length >= maxTags;

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag || atLimit || value.includes(tag)) return;
    onChange?.([...value, tag]);
    setDraft("");
  };

  const removeTag = (tag: string) => {
    if (disabled) return;
    onChange?.(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag(draft);
    } else if (event.key === "Backspace" && draft === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className={cx(styles.root, className)}>
      {value.map((tag) => (
        <span key={tag} className={styles.tag}>
          <span className={styles.tagLabel}>{tag}</span>
          {!disabled && (
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              className={styles.tagRemove}
              onClick={() => removeTag(tag)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          )}
        </span>
      ))}

      <input
        id={inputId}
        name={name}
        value={draft}
        disabled={disabled || atLimit}
        placeholder={value.length === 0 ? placeholder : undefined}
        className={styles.field}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

InputTag.displayName = "InputTag";
