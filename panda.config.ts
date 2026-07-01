import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      recipes: {
        button: {
          className: "button",
          description: "Button styles",
          jsx: ["Button"],
          base: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2",
            rounded: "md",
            fontWeight: "medium",
            transition: "all 0.2s",
            cursor: "pointer",
            _disabled: {
              cursor: "not-allowed",
              opacity: 0.5,
            },
          },
          variants: {
            size: {
              xs: { px: "3", py: "1.5", fontSize: "xs" },
              sm: { px: "4", py: "2", fontSize: "sm" },
              md: { px: "5", py: "2.5", fontSize: "sm" },
            },
            variant: {
              primary: {
                bg: "blue.500",
                color: "white",
                _hover: { bg: "blue.600" },
              },
              danger: {
                bg: "red.500",
                color: "white",
                _hover: { bg: "red.600" },
              },
              outline: {
                bg: "white",
                color: "gray.700",
                borderWidth: "1px",
                borderColor: "gray.300",
                _hover: { bg: "gray.50" },
              },
            },
          },
          defaultVariants: {
            size: "md",
            variant: "primary",
          },
        },
      },
    },
  },

  // Enable JSX support for React (creates panda factory and allows jsx extraction)
  jsxFramework: "react",

  // The output directory for your css system
  outdir: "styled-system",
});
