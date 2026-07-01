import { Button } from "./components/button";

function App() {
  return (
    <>
      <div style={{ padding: 24, display: "flex", gap: 12 }}>
        <Button variant="primary">Primary</Button>
        <Button variant="danger" size="sm">
          Danger
        </Button>
        <Button variant="outline" disabled>
          Outline Disabled
        </Button>
      </div>
    </>
  );
}

export default App;
