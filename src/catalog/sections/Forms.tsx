import { useState } from "react";
import { CatalogExample, CatalogSection } from "../CatalogSection";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Checkbox } from "../../components/Checkbox";
import { Radio, RadioGroup } from "../../components/Radio";
import { Toggle } from "../../components/Toggle";
import { Select } from "../../components/Select";
import { Autocomplete } from "../../components/Autocomplete";
import { InputTag } from "../../components/InputTag";
import { DatePicker } from "../../components/DatePicker";
import { Slider } from "../../components/Slider";
import { Rating } from "../../components/Rating";
import { ColorPicker } from "../../components/ColorPicker";
import { Dropzone } from "../../components/Dropzone";
import { SegmentedControl } from "../../components/SegmentedControl";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "../../components/FormControl";

const FRUIT_OPTIONS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

export function FormsSections() {
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState("a");
  const [toggled, setToggled] = useState(true);
  const [selectValue, setSelectValue] = useState<string | null>("apple");
  const [multiValue, setMultiValue] = useState<string[]>(["apple"]);
  const [autoValue, setAutoValue] = useState<string | undefined>();
  const [tags, setTags] = useState<string[]>(["design-system", "react"]);
  const [date, setDate] = useState<Date | null>(new Date());
  const [slider, setSlider] = useState(40);
  const [rating, setRating] = useState(3);
  const [color, setColor] = useState("#1C44D5");
  const [segment, setSegment] = useState("day");

  return (
    <>
      <CatalogSection
        id="input"
        title="Input"
        description="Single-line text field."
        usage={`import { Input } from "@ktyudhadmc/fragment";

<Input size="md" placeholder="Search..." value={value} onChange={(e) => setValue(e.target.value)} />`}
        props={[
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and font size of the field." },
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error (red) border state." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
          { name: "...rest", type: "HTMLStyledProps<'input'>", description: "Any native input attribute (value, onChange, type, ...) or Panda style prop." },
        ]}
      >
        <CatalogExample label="Size">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </CatalogExample>
        <CatalogExample label="State">
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Invalid" invalid />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="textarea"
        title="Textarea"
        description="Multi-line text field."
        usage={`import { Textarea } from "@ktyudhadmc/fragment";

<Textarea placeholder="Write a description..." rows={4} />`}
        props={[
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error (red) border state." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
          { name: "...rest", type: "HTMLStyledProps<'textarea'>", description: "Any native textarea attribute or Panda style prop." },
        ]}
      >
        <CatalogExample>
          <Textarea placeholder="Write a description..." />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="form-control"
        title="Form Control"
        description="Wraps a field with label, helper and error text; passes disabled/invalid/required/id down to Input, Textarea and Select automatically."
        usage={`import { FormControl, FormLabel, FormHelperText, FormErrorMessage, Input } from "@ktyudhadmc/fragment";

<FormControl required invalid={!!error}>
  <FormLabel>Email</FormLabel>
  <Input placeholder="you@example.com" />
  <FormHelperText>We'll never share your email.</FormHelperText>
  <FormErrorMessage>{error}</FormErrorMessage>
</FormControl>`}
        props={[
          { name: "id", type: "string", description: "Shared id for the field; auto-generated if omitted." },
          { name: "disabled", type: "boolean", default: "false", description: "Propagated to the wrapped field." },
          { name: "invalid", type: "boolean", default: "false", description: "Propagated to the field; also switches FormHelperText/FormErrorMessage visibility." },
          { name: "required", type: "boolean", default: "false", description: "Propagated to the field; adds a * marker to FormLabel." },
          { name: "readOnly", type: "boolean", default: "false", description: "Propagated to the wrapped field." },
        ]}
      >
        <CatalogExample>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input placeholder="you@example.com" />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl invalid>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
            <FormErrorMessage>Password is required.</FormErrorMessage>
          </FormControl>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="checkbox"
        title="Checkbox"
        usage={`import { Checkbox } from "@ktyudhadmc/fragment";

<Checkbox label="Accept terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />`}
        props={[
          { name: "label", type: "ReactNode", description: "Label rendered next to the box." },
          { name: "checked", type: "boolean", default: "false", description: "Checked state (controlled)." },
          { name: "indeterminate", type: "boolean", default: "false", description: "Shows the dash (partial-selection) state; sets the DOM indeterminate property." },
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error border color." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox." },
          { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Native change handler; read e.target.checked." },
        ]}
      >
        <CatalogExample>
          <Checkbox label="Accept terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <Checkbox label="Indeterminate" indeterminate readOnly />
          <Checkbox label="Disabled" disabled />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="radio"
        title="Radio"
        description="Radio works standalone (checked/onChange) or inside a RadioGroup, which manages the shared name and mutual exclusivity."
        usage={`import { Radio, RadioGroup } from "@ktyudhadmc/fragment";

<RadioGroup name="fruit" value={value} onChange={setValue}>
  <Radio value="apple" label="Apple" />
  <Radio value="banana" label="Banana" />
</RadioGroup>`}
        props={[
          { name: "value", type: "string", description: "Radio.value (required) — the value this option represents." },
          { name: "label", type: "ReactNode", description: "Label rendered next to the circle." },
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error border color." },
          { name: "RadioGroup.name", type: "string", description: "Shared `name` attribute applied to every Radio inside." },
          { name: "RadioGroup.value", type: "string", description: "Currently selected value." },
          { name: "RadioGroup.onChange", type: "(value: string) => void", description: "Called with the newly selected value." },
          { name: "RadioGroup.disabled", type: "boolean", default: "false", description: "Disables every Radio inside the group." },
        ]}
      >
        <CatalogExample>
          <RadioGroup name="fruit" value={radioValue} onChange={setRadioValue}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="toggle"
        title="Toggle"
        usage={`import { Toggle } from "@ktyudhadmc/fragment";

<Toggle label="Notifications" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />`}
        props={[
          { name: "label", type: "ReactNode", description: "Label rendered next to the switch." },
          { name: "checked", type: "boolean", default: "false", description: "On/off state (controlled)." },
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error border color." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the toggle." },
          { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Native change handler; read e.target.checked." },
        ]}
      >
        <CatalogExample>
          <Toggle label="Notifications" checked={toggled} onChange={(e) => setToggled(e.target.checked)} />
          <Toggle label="Disabled" disabled />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="select"
        title="Select"
        description="Single and multi selection dropdown (custom-built, not a native <select>)."
        usage={`import { Select } from "@ktyudhadmc/fragment";

<Select
  options={[{ label: "Apple", value: "apple" }]}
  value={value}
  onChange={setValue}
  isClearable
/>

// multiple selection
<Select multiple options={options} value={values} onChange={setValues} />`}
        props={[
          { name: "options", type: "{ label: string; value: string; disabled?: boolean }[]", description: "The list of selectable options. Required." },
          { name: "multiple", type: "boolean", default: "false", description: "Switches value/onChange to work with string[] instead of string | null." },
          { name: "value", type: "string | null (single) / string[] (multiple)", description: "Selected value(s)." },
          { name: "onChange", type: "(value) => void", description: "Called with the new value on selection." },
          { name: "placeholder", type: "string", default: '"Select an option"', description: "Shown when nothing is selected." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Trigger height." },
          { name: "isClearable", type: "boolean", default: "false", description: "Shows a clear (×) button once a value is selected." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the trigger." },
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error border color." },
        ]}
      >
        <CatalogExample label="Single">
          <Select options={FRUIT_OPTIONS} value={selectValue} onChange={setSelectValue} isClearable />
        </CatalogExample>
        <CatalogExample label="Multiple">
          <Select multiple options={FRUIT_OPTIONS} value={multiValue} onChange={setMultiValue} />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="autocomplete"
        title="Autocomplete"
        description="Searchable single-select field with an editable text input."
        usage={`import { Autocomplete } from "@ktyudhadmc/fragment";

<Autocomplete
  options={options}
  value={value}
  onChange={setValue}
  onInputChange={(query) => fetchSuggestions(query)}
  isLoading={loading}
/>`}
        props={[
          { name: "options", type: "{ label: string; value: string }[]", description: "Suggestions shown in the dropdown. Required." },
          { name: "value", type: "string", description: "Selected option's value." },
          { name: "onChange", type: "(value: string) => void", description: "Called when a suggestion is picked." },
          { name: "onInputChange", type: "(query: string) => void", description: "Called on every keystroke — wire this to filter/fetch options for server-side search." },
          { name: "isLoading", type: "boolean", default: "false", description: "Shows a loading row instead of the options." },
          { name: "emptyText", type: "string", default: '"No result found"', description: "Shown when options is empty." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error border color." },
        ]}
      >
        <CatalogExample>
          <Autocomplete options={FRUIT_OPTIONS} value={autoValue} onChange={setAutoValue} />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="input-tag"
        title="Input Tag"
        description="Free-form tag entry — press Enter to add, Backspace on an empty field removes the last tag."
        usage={`import { InputTag } from "@ktyudhadmc/fragment";

<InputTag value={tags} onChange={setTags} placeholder="Add a tag" maxTags={10} />`}
        props={[
          { name: "value", type: "string[]", default: "[]", description: "Current list of tags." },
          { name: "onChange", type: "(tags: string[]) => void", description: "Called whenever a tag is added or removed." },
          { name: "placeholder", type: "string", default: '"Add a tag"', description: "Shown only when there are no tags yet." },
          { name: "maxTags", type: "number", default: "100", description: "Stops accepting new tags once reached." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the whole field." },
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error border color." },
        ]}
      >
        <CatalogExample>
          <InputTag value={tags} onChange={setTags} placeholder="Add a tag" />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="date-picker"
        title="Date Picker"
        description="Custom-built calendar popover (no external date library)."
        usage={`import { DatePicker } from "@ktyudhadmc/fragment";

<DatePicker label="Birthday" value={date} onChange={setDate} isClearable />

// range mode
<DatePicker isRange label="Stay" value={[start, end]} onChange={setRange} />`}
        props={[
          { name: "value", type: "Date | null (single) / [Date | null, Date | null] (isRange)", description: "Selected date(s)." },
          { name: "onChange", type: "(value) => void", description: "Called with the new date/range." },
          { name: "isRange", type: "boolean", default: "false", description: "Switches to range-selection mode." },
          { name: "label", type: "string", description: "Field label shown above the input." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input height." },
          { name: "isClearable", type: "boolean", default: "true", description: "Shows a clear button once a date is set." },
          { name: "minDate / maxDate", type: "Date", description: "Bounds selectable dates." },
          { name: "disabledDate", type: "(date: Date) => boolean", description: "Return true to disable a specific date." },
          { name: "disabled / invalid / errorMessage", type: "boolean / boolean / string", description: "Standard field states." },
        ]}
      >
        <CatalogExample label="Single date">
          <DatePicker value={date} onChange={setDate} />
        </CatalogExample>
        <CatalogExample label="Range">
          <DatePicker isRange value={[null, null]} onChange={() => {}} />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="slider"
        title="Slider"
        usage={`import { Slider } from "@ktyudhadmc/fragment";

<Slider value={volume} onChange={setVolume} min={0} max={100} step={1} aria-label="Volume" />`}
        props={[
          { name: "value", type: "number", description: "Current value. Required." },
          { name: "onChange", type: "(value: number) => void", description: "Called while dragging/typing." },
          { name: "min / max", type: "number", default: "0 / 100", description: "Value bounds." },
          { name: "step", type: "number", default: "1", description: "Increment step." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the slider." },
          { name: "aria-label", type: "string", description: "Accessible name for the underlying range input." },
        ]}
      >
        <CatalogExample>
          <div style={{ width: 220 }}>
            <Slider value={slider} onChange={setSlider} aria-label="Volume" />
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="rating"
        title="Rating"
        usage={`import { Rating } from "@ktyudhadmc/fragment";

<Rating value={rating} onChange={setRating} maxValue={5} showValue />`}
        props={[
          { name: "value", type: "number", description: "Current rating. Required." },
          { name: "onChange", type: "(value: number) => void", description: "Called when a star is clicked." },
          { name: "maxValue", type: "number", default: "5", description: "Number of stars rendered." },
          { name: "readOnly", type: "boolean", default: "false", description: "Displays the rating without allowing changes." },
          { name: "showValue", type: "boolean", default: "false", description: "Shows the numeric value next to the stars." },
        ]}
      >
        <CatalogExample>
          <Rating value={rating} onChange={setRating} showValue />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="color-picker"
        title="Color Picker"
        usage={`import { ColorPicker } from "@ktyudhadmc/fragment";

<ColorPicker value={color} onChange={setColor} swatches={["#1C44D5", "#4FB262"]} />`}
        props={[
          { name: "value", type: "string", description: "Current color as a hex string. Required." },
          { name: "onChange", type: "(hex: string) => void", description: "Called with a valid hex string (swatch click or valid typed hex). Required." },
          { name: "swatches", type: "string[]", description: "Preset colors shown in the grid; defaults to a built-in palette." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the trigger." },
        ]}
      >
        <CatalogExample>
          <ColorPicker value={color} onChange={setColor} />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="dropzone"
        title="Dropzone"
        description="Drag-and-drop or click-to-browse file upload area."
        usage={`import { Dropzone } from "@ktyudhadmc/fragment";

<Dropzone onFilesSelected={(files) => upload(files)} accept="image/*" multiple />`}
        props={[
          { name: "onFilesSelected", type: "(files: File[]) => void", description: "Called with the dropped or picked files. Required." },
          { name: "accept", type: "string", description: "MIME type filter, same as the native file input's accept attribute." },
          { name: "multiple", type: "boolean", default: "false", description: "Allows selecting more than one file." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the dropzone." },
          { name: "invalid", type: "boolean", default: "false", description: "Shows the error border color." },
          { name: "text / hint", type: "string", description: "Primary and secondary helper text shown inside the zone." },
        ]}
      >
        <CatalogExample>
          <div style={{ width: 320 }}>
            <Dropzone onFilesSelected={() => {}} hint="PNG, JPG up to 5MB" />
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="segmented-control"
        title="Segmented Control"
        description="An alternative to a radio group for a small set of mutually exclusive options."
        usage={`import { SegmentedControl } from "@ktyudhadmc/fragment";

<SegmentedControl
  value={range}
  onChange={setRange}
  options={[
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
  ]}
/>`}
        props={[
          { name: "options", type: "{ label: ReactNode; value: string; disabled?: boolean }[]", description: "The choices to render. Required." },
          { name: "value", type: "string", description: "Currently selected value." },
          { name: "onChange", type: "(value: string) => void", description: "Called when an option is picked." },
          { name: "fullWidth", type: "boolean", default: "true", description: "Stretches options to fill the container width." },
        ]}
      >
        <CatalogExample>
          <SegmentedControl
            fullWidth={false}
            value={segment}
            onChange={setSegment}
            options={[
              { label: "Day", value: "day" },
              { label: "Week", value: "week" },
              { label: "Month", value: "month" },
            ]}
          />
        </CatalogExample>
      </CatalogSection>
    </>
  );
}
