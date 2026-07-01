import { Button } from "./components/Button";

function App() {
  return (
    <>
      <div style={{ padding: 24, display: "flex", gap: 12 }}>
        <Button
          // variant="primary"
          css={{
            px: { base: "4", md: "96" },
            rounded: { base: "md", lg: "lg" },
          }}
        >
          Primary
        </Button>
      </div>
    </>
  );
}

export default App;
