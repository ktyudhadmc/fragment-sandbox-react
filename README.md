# Fragment

A React design system, styled with [PandaCSS](https://panda-css.com/) and modeled after [Mekari Pixel 3](https://docs.mekari.design) so it can be reused as a shared component library across projects.

## Development

```bash
npm install
npm run dev      # opens the component catalog at http://localhost:5173
```

`npm run dev` boots the **component catalog** (`src/catalog/`) — a live, browsable reference of every component in the library, grouped the same way as the Mekari Pixel docs (Actions, Forms, Feedback, Overlay, Navigation, Data display). It's the fastest way to see a component in a real browser and try its variants before using it in a consuming app.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the catalog in dev mode with HMR |
| `npm run build` | Type-check, bundle the library (`dist/index.js` / `.mjs` / `.d.ts`) |
| `npm run test` | Run the unit test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the codebase |

## Using the library

```bash
npm install @ktyudhadmc/fragment
```

```tsx
import { Button, DatePicker, FormControl, FormLabel } from "@ktyudhadmc/fragment";
```

Components that wrap a third-party engine declare it as an **optional peer dependency** so consumers only pay for what they use:

- `Chart` → `apexcharts` + `react-apexcharts`

## Design tokens

Colors, font family, radii and spacing are aligned with Mekari Pixel 3's published token values (`@mekari/pixel3-theme`) — see `panda.config.ts` (`theme.extend.tokens` and `globalCss`). Component-level styling (variants, sizes, states) is authored as PandaCSS recipes in the same file, one per component.

## Project structure

```
src/
  components/<Name>/index.tsx    # one folder per component, colocated with its index.test.tsx
  hooks/                         # shared hooks (e.g. useDismiss for click-outside/Escape)
  catalog/                       # the live catalog shown by `npm run dev`
  index.ts                       # public entry point — every exported component/hook
panda.config.ts                  # design tokens + recipes (source of truth for styling)
```

Every component lives in its own folder with a colocated `index.test.tsx`. Run `npm run test` before publishing changes.
