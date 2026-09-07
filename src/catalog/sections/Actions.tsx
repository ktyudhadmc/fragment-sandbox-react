import { CatalogExample, CatalogSection } from "../CatalogSection";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { Textlink } from "../../components/Textlink";
import { CalendarIcon, CloseIcon } from "../../components/icons";

export function ActionsSections() {
  return (
    <>
      <CatalogSection
        id="button"
        title="Button"
        description="Primary trigger for actions."
        usage={`import { Button } from "@ktyudhadmc/fragment";

<Button variant="primary" size="md" onClick={handleClick}>
  Save changes
</Button>`}
        props={[
          { name: "variant", type: '"primary" | "outline" | "danger"', default: '"primary"', description: "Visual style of the button." },
          { name: "size", type: '"xs" | "sm" | "md"', default: '"md"', description: "Controls height, padding and font size." },
          { name: "startIcon", type: "ReactNode", description: "Icon rendered before the label." },
          { name: "endIcon", type: "ReactNode", description: "Icon rendered after the label." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the button and blocks onClick." },
          { name: "...rest", type: "HTMLStyledProps<'button'>", description: "Any native button attribute or Panda style prop (e.g. css, px, rounded)." },
        ]}
      >
        <CatalogExample label="Variant">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
        </CatalogExample>
        <CatalogExample label="Size">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
        </CatalogExample>
        <CatalogExample label="State">
          <Button disabled>Disabled</Button>
          <Button startIcon={<CalendarIcon />}>With icon</Button>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="icon-button"
        title="Icon Button"
        description="Icon-only action button."
        usage={`import { IconButton } from "@ktyudhadmc/fragment";
import { CloseIcon } from "@ktyudhadmc/fragment";

<IconButton aria-label="Close" icon={<CloseIcon />} onClick={handleClose} />`}
        props={[
          { name: "icon", type: "ReactNode", description: "The icon to render. Required." },
          { name: "aria-label", type: "string", description: "Accessible name — required since there is no visible text label." },
          { name: "size", type: '"xs" | "sm" | "md"', default: '"sm"', description: "Button dimensions." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
          { name: "...rest", type: "HTMLStyledProps<'button'>", description: "Any native button attribute or Panda style prop." },
        ]}
      >
        <CatalogExample>
          <IconButton aria-label="Close" icon={<CloseIcon />} />
          <IconButton aria-label="Calendar" icon={<CalendarIcon />} size="md" />
          <IconButton aria-label="Disabled" icon={<CloseIcon />} disabled />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="textlink"
        title="Textlink"
        description="Inline link styled for body text."
        usage={`import { Textlink } from "@ktyudhadmc/fragment";

<Textlink href="/docs">Read the docs</Textlink>`}
        props={[
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Font size of the link." },
          { name: "href", type: "string", description: "Standard anchor href." },
          { name: "...rest", type: "HTMLStyledProps<'a'>", description: "Any native anchor attribute or Panda style prop." },
        ]}
      >
        <CatalogExample>
          <Textlink href="#">Default link</Textlink>
          <Textlink href="#" size="sm">
            Small link
          </Textlink>
        </CatalogExample>
      </CatalogSection>
    </>
  );
}
