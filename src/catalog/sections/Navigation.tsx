import { CatalogExample, CatalogSection } from "../CatalogSection";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../../components/Tabs";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "../../components/Accordion";
import { Collapse } from "../../components/Collapse";
import { Timeline, TimelineItem } from "../../components/Timeline";
import { Carousel } from "../../components/Carousel";
import { useState } from "react";
import { Button } from "../../components/Button";
import { css } from "../../../styled-system/css";

export function NavigationSections() {
  const [collapseOpen, setCollapseOpen] = useState(false);

  return (
    <>
      <CatalogSection
        id="tabs"
        title="Tabs"
        description="Value-based, so panels stay matched even if tabs are reordered."
        usage={`import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@ktyudhadmc/fragment";

<Tabs defaultValue="profile" onChange={setActive}>
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="billing">Billing</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="profile">Profile settings content.</TabPanel>
    <TabPanel value="billing">Billing settings content.</TabPanel>
  </TabPanels>
</Tabs>`}
        props={[
          { name: "value / defaultValue", type: "string", description: "Active tab's value; use value for controlled mode." },
          { name: "onChange", type: "(value: string) => void", description: "Called when the active tab changes." },
          { name: "Tab.value", type: "string", description: "Must match a TabPanel's value. Required." },
          { name: "Tab.disabled", type: "boolean", default: "false", description: "Prevents selecting this tab." },
        ]}
      >
        <CatalogExample>
          <Tabs defaultValue="profile">
            <TabList>
              <Tab value="profile">Profile</Tab>
              <Tab value="billing">Billing</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="profile">Profile settings content.</TabPanel>
              <TabPanel value="billing">Billing settings content.</TabPanel>
            </TabPanels>
          </Tabs>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="accordion"
        title="Accordion"
        usage={`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@ktyudhadmc/fragment";

<Accordion allowMultiple>
  <AccordionItem value="a">
    <AccordionHeader>What is Fragment?</AccordionHeader>
    <AccordionPanel>A React design system inspired by Mekari Pixel.</AccordionPanel>
  </AccordionItem>
</Accordion>`}
        props={[
          { name: "allowMultiple", type: "boolean", default: "false", description: "Allow more than one item open at once." },
          { name: "allowToggle", type: "boolean", default: "true", description: "Allow closing an open item by clicking its header again." },
          { name: "defaultOpen", type: "string[]", default: "[]", description: "Values open on mount." },
          { name: "AccordionItem.value", type: "string", description: "Unique id for the item. Required." },
          { name: "AccordionItem.disabled", type: "boolean", default: "false", description: "Prevents toggling this item." },
        ]}
      >
        <CatalogExample>
          <div style={{ width: 320 }}>
            <Accordion>
              <AccordionItem value="a">
                <AccordionHeader>What is Fragment?</AccordionHeader>
                <AccordionPanel>A React design system inspired by Mekari Pixel.</AccordionPanel>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionHeader>Is it themeable?</AccordionHeader>
                <AccordionPanel>Yes, tokens are defined via PandaCSS.</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="collapse"
        title="Collapse"
        description="A single expandable region — use Accordion instead when you need multiple coordinated sections."
        usage={`import { Collapse } from "@ktyudhadmc/fragment";

<Button onClick={() => setOpen((v) => !v)}>Toggle</Button>
<Collapse isOpen={open}>
  <p>This content expands and collapses smoothly.</p>
</Collapse>`}
        props={[
          { name: "isOpen", type: "boolean", description: "Whether the content is expanded. Required." },
          { name: "duration", type: "number (ms)", default: "250", description: "Animation duration." },
        ]}
      >
        <CatalogExample>
          <div style={{ width: 320 }}>
            <Button size="sm" variant="outline" onClick={() => setCollapseOpen((v) => !v)}>
              Toggle collapse
            </Button>
            <Collapse isOpen={collapseOpen}>
              <p className={css({ fontSize: "sm", color: "gray.600", pt: "2" })}>
                This content expands and collapses smoothly.
              </p>
            </Collapse>
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="timeline"
        title="Timeline"
        usage={`import { Timeline, TimelineItem } from "@ktyudhadmc/fragment";

<Timeline>
  <TimelineItem title="Order placed" caption="Jan 1, 2026" />
  <TimelineItem title="Delivered" caption="Jan 4, 2026" isLast />
</Timeline>`}
        props={[
          { name: "TimelineItem.title", type: "ReactNode", description: "Item headline. Required." },
          { name: "TimelineItem.caption", type: "ReactNode", description: "Secondary text (e.g. a date) below the title." },
          { name: "TimelineItem.icon", type: "ReactNode", description: "Content rendered inside the dot." },
          { name: "TimelineItem.isLast", type: "boolean", default: "false", description: "Hides the connector line below this item — set on the last item." },
        ]}
      >
        <CatalogExample>
          <div style={{ width: 320 }}>
            <Timeline>
              <TimelineItem title="Order placed" caption="Jan 1, 2026" />
              <TimelineItem title="Order shipped" caption="Jan 2, 2026" />
              <TimelineItem title="Delivered" caption="Jan 4, 2026" isLast />
            </Timeline>
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="carousel"
        title="Carousel"
        usage={`import { Carousel } from "@ktyudhadmc/fragment";

<Carousel autoPlay interval={4000}>
  <div>Slide 1</div>
  <div>Slide 2</div>
</Carousel>`}
        props={[
          { name: "children", type: "ReactNode", description: "One element per slide. Required." },
          { name: "autoPlay", type: "boolean", default: "false", description: "Automatically advances slides." },
          { name: "interval", type: "number (ms)", default: "4000", description: "Delay between auto-advances." },
          { name: "showArrows / showDots", type: "boolean", default: "true / true", description: "Toggle the prev/next arrows and the dot indicators." },
        ]}
      >
        <CatalogExample>
          <div style={{ width: 360 }}>
            <Carousel>
              {["#EAECFB", "#E8F5EB", "#FBF3DD"].map((bg) => (
                <div
                  key={bg}
                  style={{
                    height: 160,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Slide
                </div>
              ))}
            </Carousel>
          </div>
        </CatalogExample>
      </CatalogSection>
    </>
  );
}
