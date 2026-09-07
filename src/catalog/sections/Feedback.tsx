import { useState } from "react";
import { CatalogExample, CatalogSection } from "../CatalogSection";
import { Badge } from "../../components/Badge";
import { Banner } from "../../components/Banner";
import { Broadcast } from "../../components/Broadcast";
import { Progress } from "../../components/Progress";
import { Spinner } from "../../components/Spinner";
import { Skeleton } from "../../components/Skeleton";
import { Button } from "../../components/Button";
import { ToastProvider } from "../../components/Toast";
import { toast } from "../../components/Toast/store";

export function FeedbackSections() {
  const [showBanner, setShowBanner] = useState(true);
  const [showBroadcast, setShowBroadcast] = useState(true);

  return (
    <>
      <CatalogSection
        id="badge"
        title="Badge"
        usage={`import { Badge } from "@ktyudhadmc/fragment";

<Badge colorScheme="blue">Info</Badge>`}
        props={[
          { name: "colorScheme", type: '"gray" | "blue" | "green" | "red" | "yellow"', default: '"gray"', description: "Background/text color pairing." },
          { name: "...rest", type: "HTMLStyledProps<'span'>", description: "Any native span attribute or Panda style prop." },
        ]}
      >
        <CatalogExample>
          <Badge colorScheme="gray">Default</Badge>
          <Badge colorScheme="blue">Info</Badge>
          <Badge colorScheme="green">Success</Badge>
          <Badge colorScheme="red">Danger</Badge>
          <Badge colorScheme="yellow">Warning</Badge>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="banner"
        title="Banner"
        usage={`import { Banner } from "@ktyudhadmc/fragment";

<Banner
  variant="info"
  title="Update available"
  description="A new version is ready to install."
  onClose={() => setVisible(false)}
/>`}
        props={[
          { name: "title", type: "string", description: "Banner headline. Required." },
          { name: "description", type: "ReactNode", description: "Supporting text below the title." },
          { name: "variant", type: '"info" | "success" | "warning" | "danger"', default: '"info"', description: "Color and icon of the banner." },
          { name: "onClose", type: "() => void", description: "If provided, shows a close button that calls this." },
          { name: "action", type: "ReactNode", description: "Extra content (e.g. a link/button) rendered below the description." },
        ]}
      >
        <CatalogExample>
          {showBanner && (
            <Banner
              variant="info"
              title="Update available"
              description="A new version is ready to install."
              onClose={() => setShowBanner(false)}
            />
          )}
          {!showBanner && (
            <Button size="sm" variant="outline" onClick={() => setShowBanner(true)}>
              Reset banner
            </Button>
          )}
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="broadcast"
        title="Broadcast"
        description="Full-width announcement bar, typically pinned above the app header."
        usage={`import { Broadcast } from "@ktyudhadmc/fragment";

<Broadcast variant="neutral" actionLabel="Learn more" onAction={openDocs} onClose={dismiss}>
  Scheduled maintenance tonight at 10 PM.
</Broadcast>`}
        props={[
          { name: "children", type: "ReactNode", description: "The message. Required." },
          { name: "variant", type: '"info" | "success" | "warning" | "danger" | "neutral"', default: '"neutral"', description: "Background color." },
          { name: "actionLabel", type: "string", description: "Renders an underlined action link with this label." },
          { name: "onAction", type: "() => void", description: "Called when the action link is clicked." },
          { name: "onClose", type: "() => void", description: "If provided, shows a close button that calls this." },
        ]}
      >
        <CatalogExample>
          {showBroadcast && (
            <Broadcast
              variant="neutral"
              actionLabel="Learn more"
              onClose={() => setShowBroadcast(false)}
            >
              Scheduled maintenance tonight at 10 PM.
            </Broadcast>
          )}
          {!showBroadcast && (
            <Button size="sm" variant="outline" onClick={() => setShowBroadcast(true)}>
              Reset broadcast
            </Button>
          )}
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="toast"
        title="Toast"
        description="Imperative notification API — render <ToastProvider /> once near the app root, then call toast.* from anywhere."
        usage={`import { ToastProvider, toast } from "@ktyudhadmc/fragment";

// once, near the app root
<ToastProvider placement="top-center" />

// anywhere in your code
toast.success({ title: "Saved", description: "Your changes were saved." });
toast.error({ title: "Something went wrong" });
toast.dismiss(id);
toast.clearAll();`}
        props={[
          { name: "ToastProvider.placement", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"top-center"', description: "Where toasts stack on screen." },
          { name: "toast.notify(options)", type: "{ id?, title, description?, variant?, duration? } => string", description: "Base function; success/error/warning/info are shortcuts that set variant." },
          { name: "options.duration", type: "number (ms)", default: "3000", description: "Auto-dismiss delay; 0 disables auto-dismiss." },
          { name: "toast.dismiss(id)", type: "(id: string) => void", description: "Dismiss a single toast." },
          { name: "toast.clearAll()", type: "() => void", description: "Dismiss every visible toast." },
        ]}
      >
        <ToastProvider />
        <CatalogExample>
          <Button size="sm" onClick={() => toast.success({ title: "Saved", description: "Your changes were saved." })}>
            Trigger success
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => toast.error({ title: "Something went wrong" })}
          >
            Trigger error
          </Button>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="progress"
        title="Progress"
        usage={`import { Progress } from "@ktyudhadmc/fragment";

<Progress value={65} max={100} colorScheme="blue" />`}
        props={[
          { name: "value", type: "number", description: "Current progress. Required." },
          { name: "max", type: "number", default: "100", description: "Value representing 100%." },
          { name: "colorScheme", type: '"blue" | "green" | "red"', default: '"blue"', description: "Fill color." },
        ]}
      >
        <CatalogExample>
          <div style={{ width: 220 }}>
            <Progress value={65} />
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="spinner"
        title="Spinner"
        usage={`import { Spinner } from "@ktyudhadmc/fragment";

<Spinner size="md" label="Loading" />`}
        props={[
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Diameter of the spinner." },
          { name: "label", type: "string", default: '"Loading"', description: "Accessible name (role=status aria-label)." },
        ]}
      >
        <CatalogExample>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="skeleton"
        title="Skeleton"
        description="Placeholder block shown while content is loading."
        usage={`import { Skeleton } from "@ktyudhadmc/fragment";

<Skeleton shape="circle" style={{ width: 40, height: 40 }} />
<Skeleton shape="text" />`}
        props={[
          { name: "shape", type: '"text" | "circle" | "rect"', default: '"text"', description: "Base shape/border-radius; combine with width/height style props to size it." },
          { name: "...rest", type: "HTMLStyledProps<'div'>", description: "Any native div attribute or Panda style prop." },
        ]}
      >
        <CatalogExample>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 220 }}>
            <Skeleton shape="circle" style={{ width: 40, height: 40 }} />
            <Skeleton shape="text" />
            <Skeleton shape="text" style={{ width: "70%" }} />
          </div>
        </CatalogExample>
      </CatalogSection>
    </>
  );
}
