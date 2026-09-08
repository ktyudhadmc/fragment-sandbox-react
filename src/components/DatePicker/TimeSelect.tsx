import { css } from "../../../styled-system/css";

export interface TimeSelectProps {
  value: Date;
  onChange: (next: Date) => void;
  use12h?: boolean;
  className?: string;
}

const selectStyle = css({
  appearance: "none",
  borderWidth: "1px",
  borderColor: "gray.300",
  rounded: "md",
  fontSize: "sm",
  color: "gray.800",
  bg: "white",
  px: "2",
  py: "1.5",
  cursor: "pointer",
  _focus: { outline: "none", borderColor: "blue.400" },
});

function range(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}

export function TimeSelect({ value, onChange, use12h = false, className }: TimeSelectProps) {
  const hours24 = value.getHours();
  const minutes = value.getMinutes();
  const period = hours24 >= 12 ? "PM" : "AM";
  const displayHour = use12h ? hours24 % 12 || 12 : hours24;

  const commit = (nextHour24: number, nextMinutes: number) => {
    const next = new Date(value);
    next.setHours(nextHour24, nextMinutes, 0, 0);
    onChange(next);
  };

  const handleHourChange = (raw: number) => {
    if (!use12h) return commit(raw, minutes);
    const isPM = period === "PM";
    const hour24 = (raw % 12) + (isPM ? 12 : 0);
    commit(hour24 === 24 ? 12 : hour24, minutes);
  };

  const handlePeriodChange = (nextPeriod: "AM" | "PM") => {
    const base = hours24 % 12;
    commit(nextPeriod === "PM" ? base + 12 : base, minutes);
  };

  return (
    <div className={`${css({ display: "flex", alignItems: "center", gap: "2" })} ${className ?? ""}`}>
      <select
        aria-label="Hour"
        className={selectStyle}
        value={displayHour}
        onChange={(event) => handleHourChange(Number(event.target.value))}
      >
        {range(use12h ? 12 : 24).map((h) => {
          const hourValue = use12h ? h + 1 : h;
          return (
            <option key={hourValue} value={hourValue}>
              {String(hourValue).padStart(2, "0")}
            </option>
          );
        })}
      </select>

      <span className={css({ color: "gray.400" })}>:</span>

      <select
        aria-label="Minute"
        className={selectStyle}
        value={minutes}
        onChange={(event) => commit(hours24, Number(event.target.value))}
      >
        {range(60).map((m) => (
          <option key={m} value={m}>
            {String(m).padStart(2, "0")}
          </option>
        ))}
      </select>

      {use12h && (
        <select
          aria-label="AM or PM"
          className={selectStyle}
          value={period}
          onChange={(event) => handlePeriodChange(event.target.value as "AM" | "PM")}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      )}
    </div>
  );
}

TimeSelect.displayName = "TimeSelect";
