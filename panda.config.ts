import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  globalCss: {
    body: {
      fontFamily: "body",
      color: "gray.800",
    },
  },

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

        input: {
          className: "input",
          description: "Text input styles",
          jsx: ["Input"],
          base: {
            display: "block",
            width: "full",
            appearance: "none",
            fontFamily: "inherit",
            color: "gray.800",
            bg: "white",
            borderWidth: "1px",
            borderColor: "gray.300",
            transition: "all 0.15s",
            _placeholder: { color: "gray.400" },
            _hover: { borderColor: "gray.400" },
            _focus: {
              outline: "none",
              borderColor: "blue.400",
              boxShadow: "0 0 0 3px token(colors.blue.100)",
            },
            _disabled: {
              cursor: "not-allowed",
              bg: "gray.100",
              color: "gray.400",
              borderColor: "gray.200",
            },
          },
          variants: {
            size: {
              sm: { h: "8", px: "3", fontSize: "xs", rounded: "md" },
              md: { h: "9", px: "3.5", fontSize: "sm", rounded: "md" },
              lg: { h: "11", px: "4", fontSize: "md", rounded: "lg" },
            },
            invalid: {
              true: {
                borderColor: "red.500",
                _focus: {
                  borderColor: "red.500",
                  boxShadow: "0 0 0 3px token(colors.red.100)",
                },
              },
            },
          },
          defaultVariants: {
            size: "md",
          },
        },

        iconButton: {
          className: "icon-button",
          description: "Icon-only button styles",
          jsx: ["IconButton"],
          base: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            rounded: "md",
            color: "gray.600",
            bg: "transparent",
            borderWidth: "1px",
            borderColor: "transparent",
            cursor: "pointer",
            transition: "all 0.15s",
            _hover: { bg: "gray.100", color: "gray.800" },
            _focusVisible: {
              outline: "none",
              borderColor: "blue.400",
              boxShadow: "0 0 0 3px token(colors.blue.100)",
            },
            _disabled: {
              cursor: "not-allowed",
              opacity: 0.4,
              _hover: { bg: "transparent" },
            },
          },
          variants: {
            size: {
              xs: { w: "6", h: "6" },
              sm: { w: "8", h: "8" },
              md: { w: "9", h: "9" },
            },
          },
          defaultVariants: {
            size: "sm",
          },
        },

        textarea: {
          className: "textarea",
          description: "Textarea styles",
          jsx: ["Textarea"],
          base: {
            display: "block",
            width: "full",
            appearance: "none",
            fontFamily: "inherit",
            color: "gray.800",
            bg: "white",
            borderWidth: "1px",
            borderColor: "gray.300",
            rounded: "md",
            py: "2",
            px: "3.5",
            fontSize: "sm",
            lineHeight: "1.4",
            transition: "all 0.15s",
            resize: "vertical",
            minH: "20",
            _placeholder: { color: "gray.400" },
            _hover: { borderColor: "gray.400" },
            _focus: {
              outline: "none",
              borderColor: "blue.400",
              boxShadow: "0 0 0 3px token(colors.blue.100)",
            },
            _disabled: {
              cursor: "not-allowed",
              bg: "gray.100",
              color: "gray.400",
              borderColor: "gray.200",
              resize: "none",
            },
          },
          variants: {
            invalid: {
              true: {
                borderColor: "red.500",
                _focus: {
                  borderColor: "red.500",
                  boxShadow: "0 0 0 3px token(colors.red.100)",
                },
              },
            },
          },
        },

        checkbox: {
          className: "checkbox",
          description: "Checkbox control box styles",
          base: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            w: "4.5",
            h: "4.5",
            rounded: "sm",
            borderWidth: "1.5px",
            borderColor: "gray.400",
            bg: "white",
            color: "white",
            transition: "all 0.15s",
          },
          variants: {
            checked: {
              true: { bg: "blue.500", borderColor: "blue.500" },
            },
            indeterminate: {
              true: { bg: "blue.500", borderColor: "blue.500" },
            },
            invalid: {
              true: { borderColor: "red.500" },
            },
            disabled: {
              true: { cursor: "not-allowed", opacity: 0.5 },
              false: { cursor: "pointer" },
            },
          },
          defaultVariants: {
            checked: false,
            disabled: false,
          },
        },

        radio: {
          className: "radio",
          description: "Radio control circle styles",
          base: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            w: "4.5",
            h: "4.5",
            rounded: "full",
            borderWidth: "1.5px",
            borderColor: "gray.400",
            bg: "white",
            transition: "all 0.15s",
          },
          variants: {
            checked: {
              true: { borderColor: "blue.500" },
            },
            invalid: {
              true: { borderColor: "red.500" },
            },
            disabled: {
              true: { cursor: "not-allowed", opacity: 0.5 },
              false: { cursor: "pointer" },
            },
          },
          defaultVariants: {
            checked: false,
            disabled: false,
          },
        },

        badge: {
          className: "badge",
          description: "Badge / status pill styles",
          jsx: ["Badge"],
          base: {
            display: "inline-flex",
            alignItems: "center",
            gap: "1",
            rounded: "full",
            fontWeight: "medium",
            fontSize: "xs",
            px: "2.5",
            py: "0.5",
            lineHeight: "1.4",
          },
          variants: {
            colorScheme: {
              gray: { bg: "gray.100", color: "gray.700" },
              blue: { bg: "blue.100", color: "blue.700" },
              green: { bg: "green.100", color: "green.700" },
              red: { bg: "red.100", color: "red.700" },
              yellow: { bg: "yellow.100", color: "yellow.800" },
            },
          },
          defaultVariants: {
            colorScheme: "gray",
          },
        },

        tag: {
          className: "tag",
          description: "Tag / chip styles",
          jsx: ["Tag"],
          base: {
            display: "inline-flex",
            alignItems: "center",
            gap: "1.5",
            rounded: "sm",
            fontSize: "xs",
            fontWeight: "medium",
            px: "2.5",
            py: "1",
          },
          variants: {
            colorScheme: {
              gray: { bg: "gray.100", color: "gray.700" },
              blue: { bg: "blue.100", color: "blue.700" },
              green: { bg: "green.100", color: "green.700" },
              red: { bg: "red.100", color: "red.700" },
              yellow: { bg: "yellow.100", color: "yellow.800" },
            },
          },
          defaultVariants: {
            colorScheme: "gray",
          },
        },

        avatar: {
          className: "avatar",
          description: "Avatar styles",
          jsx: ["Avatar"],
          base: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            rounded: "full",
            bg: "blue.100",
            color: "blue.700",
            fontWeight: "medium",
            overflow: "hidden",
          },
          variants: {
            size: {
              xs: { w: "6", h: "6", fontSize: "2xs" },
              sm: { w: "8", h: "8", fontSize: "xs" },
              md: { w: "10", h: "10", fontSize: "sm" },
              lg: { w: "12", h: "12", fontSize: "md" },
              xl: { w: "16", h: "16", fontSize: "lg" },
            },
            shape: {
              circle: { rounded: "full" },
              square: { rounded: "md" },
            },
          },
          defaultVariants: {
            size: "md",
            shape: "circle",
          },
        },

        dividerLine: {
          className: "divider",
          description: "Divider line styles",
          jsx: ["Divider"],
          base: {
            border: "none",
            bg: "gray.200",
            flexShrink: 0,
          },
          variants: {
            orientation: {
              horizontal: { width: "full", height: "1px" },
              vertical: { width: "1px", alignSelf: "stretch" },
            },
          },
          defaultVariants: {
            orientation: "horizontal",
          },
        },

        text: {
          className: "text",
          description: "Typography styles for body text",
          jsx: ["Text"],
          base: {
            margin: 0,
            color: "gray.800",
          },
          variants: {
            size: {
              xs: { fontSize: "xs" },
              sm: { fontSize: "sm" },
              md: { fontSize: "md" },
              lg: { fontSize: "lg" },
              xl: { fontSize: "xl" },
            },
            weight: {
              regular: { fontWeight: "normal" },
              medium: { fontWeight: "medium" },
              semibold: { fontWeight: "semibold" },
              bold: { fontWeight: "bold" },
            },
            colorScheme: {
              default: { color: "gray.800" },
              muted: { color: "gray.500" },
              danger: { color: "red.500" },
              success: { color: "green.600" },
            },
          },
          defaultVariants: {
            size: "md",
            weight: "regular",
            colorScheme: "default",
          },
        },

        textlink: {
          className: "textlink",
          description: "Inline text link styles",
          jsx: ["Textlink"],
          base: {
            color: "blue.600",
            fontWeight: "medium",
            cursor: "pointer",
            textDecoration: "none",
            _hover: { textDecoration: "underline" },
            _disabled: {
              color: "gray.400",
              cursor: "not-allowed",
              textDecoration: "none",
            },
          },
          variants: {
            size: {
              sm: { fontSize: "xs" },
              md: { fontSize: "sm" },
              lg: { fontSize: "md" },
            },
          },
          defaultVariants: {
            size: "md",
          },
        },

        spinner: {
          className: "spinner",
          description: "Loading spinner styles",
          jsx: ["Spinner"],
          base: {
            display: "inline-block",
            borderRadius: "full",
            borderStyle: "solid",
            borderColor: "gray.200",
            borderTopColor: "blue.500",
            animation: "spin 0.6s linear infinite",
          },
          variants: {
            size: {
              sm: { w: "4", h: "4", borderWidth: "2px" },
              md: { w: "6", h: "6", borderWidth: "2.5px" },
              lg: { w: "8", h: "8", borderWidth: "3px" },
            },
          },
          defaultVariants: {
            size: "md",
          },
        },

        skeleton: {
          className: "skeleton",
          description: "Loading skeleton placeholder styles",
          jsx: ["Skeleton"],
          base: {
            display: "block",
            bg: "gray.200",
            rounded: "md",
            position: "relative",
            overflow: "hidden",
            _after: {
              content: '""',
              position: "absolute",
              inset: 0,
              transform: "translateX(-100%)",
              background:
                "linear-gradient(90deg, transparent, token(colors.gray.100), transparent)",
              animation: "shimmer 1.5s infinite",
            },
          },
          variants: {
            shape: {
              text: { height: "4", rounded: "sm" },
              circle: { rounded: "full" },
              rect: { rounded: "md" },
            },
          },
          defaultVariants: {
            shape: "text",
          },
        },
      },

      slotRecipes: {
        toggle: {
          className: "toggle",
          description: "Toggle / switch styles",
          slots: ["track", "thumb"],
          base: {
            track: {
              display: "inline-flex",
              alignItems: "center",
              flexShrink: 0,
              w: "9",
              h: "5",
              p: "0.5",
              rounded: "full",
              bg: "gray.300",
              borderWidth: "1px",
              borderColor: "transparent",
              cursor: "pointer",
              transition: "all 0.15s",
              _focusVisible: {
                outline: "none",
                boxShadow: "0 0 0 3px token(colors.blue.100)",
              },
            },
            thumb: {
              w: "4",
              h: "4",
              rounded: "full",
              bg: "white",
              boxShadow: "sm",
              transition: "transform 0.15s",
            },
          },
          variants: {
            checked: {
              true: {
                track: { bg: "blue.500" },
                thumb: { transform: "translateX(16px)" },
              },
            },
            invalid: {
              true: { track: { borderColor: "red.500" } },
            },
            disabled: {
              true: { track: { cursor: "not-allowed", opacity: 0.5 } },
            },
          },
          defaultVariants: {
            checked: false,
          },
        },

        formControl: {
          className: "form-control",
          description: "Form field wrapper styles",
          slots: ["root", "label", "requiredMark", "helperText", "errorText"],
          base: {
            root: {
              display: "flex",
              flexDirection: "column",
              gap: "1.5",
              width: "full",
            },
            label: {
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.700",
            },
            requiredMark: {
              color: "red.500",
              marginLeft: "1",
            },
            helperText: {
              fontSize: "xs",
              color: "gray.500",
            },
            errorText: {
              fontSize: "xs",
              color: "red.500",
            },
          },
        },

        selectField: {
          className: "select-field",
          description: "Select trigger + menu styles",
          slots: [
            "root",
            "trigger",
            "valueText",
            "placeholder",
            "menu",
            "option",
            "optionLabel",
            "empty",
          ],
          base: {
            root: {
              position: "relative",
              width: "full",
            },
            trigger: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2",
              width: "full",
              bg: "white",
              borderWidth: "1px",
              borderColor: "gray.300",
              rounded: "md",
              cursor: "pointer",
              transition: "all 0.15s",
              _hover: { borderColor: "gray.400" },
              _disabled: {
                cursor: "not-allowed",
                bg: "gray.100",
                color: "gray.400",
                borderColor: "gray.200",
              },
            },
            valueText: {
              color: "gray.800",
              fontSize: "sm",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
            placeholder: {
              color: "gray.400",
              fontSize: "sm",
            },
            menu: {
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              zIndex: 50,
              width: "full",
              maxH: "64",
              overflowY: "auto",
              bg: "white",
              rounded: "lg",
              borderWidth: "1px",
              borderColor: "gray.200",
              boxShadow: "md",
              p: "1",
            },
            option: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: "2.5",
              py: "2",
              rounded: "md",
              fontSize: "sm",
              color: "gray.800",
              cursor: "pointer",
              _hover: { bg: "gray.100" },
            },
            optionLabel: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
            empty: {
              px: "2.5",
              py: "3",
              fontSize: "sm",
              color: "gray.400",
              textAlign: "center",
            },
          },
          variants: {
            size: {
              sm: { trigger: { h: "8", px: "3" } },
              md: { trigger: { h: "9", px: "3.5" } },
              lg: { trigger: { h: "11", px: "4" } },
            },
            invalid: {
              true: { trigger: { borderColor: "red.500" } },
            },
            active: {
              true: { option: { bg: "blue.50", color: "blue.700" } },
            },
            focused: {
              true: { option: { bg: "gray.100" } },
            },
          },
          defaultVariants: {
            size: "md",
          },
        },

        inputTag: {
          className: "input-tag",
          description: "Input tag / multi-value field styles",
          slots: ["root", "tag", "tagLabel", "tagRemove", "field"],
          base: {
            root: {
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1.5",
              width: "full",
              minH: "9",
              px: "2",
              py: "1.5",
              bg: "white",
              borderWidth: "1px",
              borderColor: "gray.300",
              rounded: "md",
              transition: "all 0.15s",
              _hover: { borderColor: "gray.400" },
              _focusWithin: {
                borderColor: "blue.400",
                boxShadow: "0 0 0 3px token(colors.blue.100)",
              },
            },
            tag: {
              display: "inline-flex",
              alignItems: "center",
              gap: "1",
              bg: "gray.100",
              color: "gray.700",
              rounded: "sm",
              pl: "2",
              pr: "1",
              py: "0.5",
              fontSize: "xs",
              maxW: "40",
            },
            tagLabel: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
            tagRemove: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "gray.500",
              rounded: "sm",
              _hover: { bg: "gray.200", color: "gray.700" },
            },
            field: {
              flex: "1",
              minW: "24",
              border: "none",
              outline: "none",
              fontSize: "sm",
              bg: "transparent",
              _placeholder: { color: "gray.400" },
              _disabled: { cursor: "not-allowed" },
            },
          },
          variants: {
            invalid: {
              true: { root: { borderColor: "red.500" } },
            },
            disabled: {
              true: {
                root: {
                  cursor: "not-allowed",
                  bg: "gray.100",
                  borderColor: "gray.200",
                },
              },
            },
          },
        },

        calendar: {
          className: "calendar",
          description: "Calendar grid styles",
          slots: [
            "root",
            "header",
            "monthLabel",
            "grid",
            "weekday",
            "day",
            "dayOutside",
          ],
          base: {
            root: {
              display: "flex",
              flexDirection: "column",
              gap: "3",
              p: "3",
              bg: "white",
              rounded: "lg",
              borderWidth: "1px",
              borderColor: "gray.200",
              boxShadow: "md",
              minW: "64",
            },
            header: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            monthLabel: {
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.800",
            },
            grid: {
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "1",
            },
            weekday: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "xs",
              fontWeight: "medium",
              color: "gray.500",
              h: "8",
            },
            day: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              w: "8",
              h: "8",
              fontSize: "sm",
              rounded: "md",
              color: "gray.800",
              cursor: "pointer",
              bg: "transparent",
              borderWidth: "1px",
              borderColor: "transparent",
              transition: "all 0.1s",
              _hover: { bg: "gray.100" },
              _focusVisible: {
                outline: "none",
                borderColor: "blue.400",
              },
              _disabled: {
                cursor: "not-allowed",
                color: "gray.300",
                _hover: { bg: "transparent" },
              },
            },
            dayOutside: {
              color: "gray.300",
            },
          },
          variants: {
            today: {
              true: {
                day: {
                  fontWeight: "semibold",
                  borderColor: "blue.300",
                },
              },
            },
            selected: {
              true: {
                day: {
                  bg: "blue.500",
                  color: "white",
                  _hover: { bg: "blue.600" },
                },
              },
            },
            inRange: {
              true: {
                day: {
                  bg: "blue.50",
                  rounded: "none",
                },
              },
            },
          },
        },

        progress: {
          className: "progress",
          description: "Progress bar styles",
          slots: ["track", "bar"],
          base: {
            track: {
              width: "full",
              height: "2",
              bg: "gray.200",
              rounded: "full",
              overflow: "hidden",
            },
            bar: {
              height: "full",
              bg: "blue.500",
              rounded: "full",
              transition: "width 0.2s",
            },
          },
          variants: {
            colorScheme: {
              blue: { bar: { bg: "blue.500" } },
              green: { bar: { bg: "green.500" } },
              red: { bar: { bg: "red.500" } },
            },
          },
          defaultVariants: {
            colorScheme: "blue",
          },
        },

        tooltip: {
          className: "tooltip",
          description: "Tooltip bubble styles",
          slots: ["content", "arrow"],
          base: {
            content: {
              bg: "gray.900",
              color: "white",
              fontSize: "xs",
              px: "2.5",
              py: "1.5",
              rounded: "md",
              boxShadow: "md",
              maxW: "64",
              zIndex: 60,
            },
            arrow: {
              position: "absolute",
              w: "2",
              h: "2",
              bg: "gray.900",
              transform: "rotate(45deg)",
            },
          },
        },

        popover: {
          className: "popover",
          description: "Popover content styles",
          slots: ["content", "header", "body", "footer"],
          base: {
            content: {
              bg: "white",
              rounded: "lg",
              borderWidth: "1px",
              borderColor: "gray.200",
              boxShadow: "lg",
              minW: "56",
              zIndex: 60,
            },
            header: {
              px: "4",
              py: "3",
              borderBottomWidth: "1px",
              borderColor: "gray.100",
              fontWeight: "medium",
              fontSize: "sm",
            },
            body: {
              px: "4",
              py: "3",
              fontSize: "sm",
              color: "gray.700",
            },
            footer: {
              px: "4",
              py: "3",
              borderTopWidth: "1px",
              borderColor: "gray.100",
              display: "flex",
              justifyContent: "flex-end",
              gap: "2",
            },
          },
        },

        modal: {
          className: "modal",
          description: "Modal dialog styles",
          slots: ["overlay", "content", "header", "body", "footer", "closeButton"],
          base: {
            overlay: {
              position: "fixed",
              inset: 0,
              bg: "rgba(15, 23, 42, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "4",
              zIndex: 100,
            },
            content: {
              bg: "white",
              rounded: "xl",
              boxShadow: "xl",
              width: "full",
              maxH: "[calc(100vh - 32px)]",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            },
            header: {
              px: "6",
              py: "4",
              borderBottomWidth: "1px",
              borderColor: "gray.100",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "md",
              fontWeight: "semibold",
              color: "gray.900",
            },
            body: {
              px: "6",
              py: "4",
              overflowY: "auto",
              color: "gray.700",
              fontSize: "sm",
            },
            footer: {
              px: "6",
              py: "4",
              borderTopWidth: "1px",
              borderColor: "gray.100",
              display: "flex",
              justifyContent: "flex-end",
              gap: "2",
            },
            closeButton: {
              flexShrink: 0,
            },
          },
          variants: {
            size: {
              sm: { content: { maxW: "sm" } },
              md: { content: { maxW: "md" } },
              lg: { content: { maxW: "lg" } },
              xl: { content: { maxW: "2xl" } },
              full: { content: { maxW: "full", height: "full" } },
            },
          },
          defaultVariants: {
            size: "md",
          },
        },

        drawer: {
          className: "drawer",
          description: "Drawer panel styles",
          slots: ["overlay", "content", "header", "body", "footer"],
          base: {
            overlay: {
              position: "fixed",
              inset: 0,
              bg: "rgba(15, 23, 42, 0.5)",
              zIndex: 100,
            },
            content: {
              position: "fixed",
              bg: "white",
              boxShadow: "xl",
              display: "flex",
              flexDirection: "column",
              zIndex: 101,
            },
            header: {
              px: "6",
              py: "4",
              borderBottomWidth: "1px",
              borderColor: "gray.100",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "md",
              fontWeight: "semibold",
            },
            body: {
              px: "6",
              py: "4",
              overflowY: "auto",
              flex: "1",
              fontSize: "sm",
              color: "gray.700",
            },
            footer: {
              px: "6",
              py: "4",
              borderTopWidth: "1px",
              borderColor: "gray.100",
              display: "flex",
              justifyContent: "flex-end",
              gap: "2",
            },
          },
          variants: {
            placement: {
              right: { content: { top: 0, right: 0, height: "100vh" } },
              left: { content: { top: 0, left: 0, height: "100vh" } },
              top: { content: { top: 0, left: 0, width: "100vw" } },
              bottom: { content: { bottom: 0, left: 0, width: "100vw" } },
            },
            size: {
              sm: { content: { width: "80" } },
              md: { content: { width: "96" } },
              lg: { content: { width: "[32rem]" } },
              full: { content: { width: "100vw" } },
            },
          },
          defaultVariants: {
            placement: "right",
            size: "md",
          },
        },

        toast: {
          className: "toast",
          description: "Toast notification styles",
          slots: ["root", "icon", "content", "title", "description", "closeButton"],
          base: {
            root: {
              display: "flex",
              alignItems: "flex-start",
              gap: "3",
              bg: "white",
              rounded: "lg",
              boxShadow: "lg",
              borderWidth: "1px",
              px: "4",
              py: "3",
              minW: "72",
              maxW: "96",
            },
            icon: {
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              mt: "0.5",
            },
            content: {
              flex: "1",
            },
            title: {
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.900",
            },
            description: {
              fontSize: "xs",
              color: "gray.600",
              mt: "0.5",
            },
            closeButton: {
              flexShrink: 0,
            },
          },
          variants: {
            variant: {
              success: { root: { borderColor: "green.200" }, icon: { color: "green.500" } },
              error: { root: { borderColor: "red.200" }, icon: { color: "red.500" } },
              warning: { root: { borderColor: "yellow.200" }, icon: { color: "yellow.600" } },
              info: { root: { borderColor: "blue.200" }, icon: { color: "blue.500" } },
            },
          },
          defaultVariants: {
            variant: "info",
          },
        },

        tabs: {
          className: "tabs",
          description: "Tabs styles",
          slots: ["list", "tab", "panel"],
          base: {
            list: {
              display: "flex",
              gap: "1",
              borderBottomWidth: "1px",
              borderColor: "gray.200",
            },
            tab: {
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5",
              px: "4",
              py: "2.5",
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.500",
              cursor: "pointer",
              borderBottomWidth: "2px",
              borderColor: "transparent",
              marginBottom: "-1px",
              transition: "all 0.15s",
              _hover: { color: "gray.800" },
              _disabled: { cursor: "not-allowed", opacity: 0.5 },
            },
            panel: {
              py: "4",
            },
          },
          variants: {
            selected: {
              true: {
                tab: { color: "blue.600", borderColor: "blue.600" },
              },
            },
          },
        },

        accordion: {
          className: "accordion",
          description: "Accordion styles",
          slots: ["root", "item", "header", "icon", "panel"],
          base: {
            root: {
              display: "flex",
              flexDirection: "column",
              borderWidth: "1px",
              borderColor: "gray.200",
              rounded: "lg",
              overflow: "hidden",
            },
            item: {
              borderBottomWidth: "1px",
              borderColor: "gray.200",
              _last: { borderBottomWidth: 0 },
            },
            header: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "full",
              px: "4",
              py: "3",
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.800",
              bg: "white",
              cursor: "pointer",
              _hover: { bg: "gray.50" },
              _disabled: { cursor: "not-allowed", opacity: 0.5 },
            },
            icon: {
              flexShrink: 0,
              transition: "transform 0.2s",
              color: "gray.500",
            },
            panel: {
              px: "4",
              py: "3",
              fontSize: "sm",
              color: "gray.700",
              borderTopWidth: "1px",
              borderColor: "gray.100",
            },
          },
          variants: {
            open: {
              true: {
                icon: { transform: "rotate(180deg)" },
              },
            },
          },
        },

        banner: {
          className: "banner",
          description: "Banner alert styles",
          slots: ["root", "icon", "content", "title", "description", "closeButton"],
          base: {
            root: {
              display: "flex",
              alignItems: "flex-start",
              gap: "3",
              rounded: "lg",
              px: "4",
              py: "3",
              borderWidth: "1px",
            },
            icon: {
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              mt: "0.5",
            },
            content: { flex: "1" },
            title: {
              fontSize: "sm",
              fontWeight: "medium",
            },
            description: {
              fontSize: "xs",
              mt: "0.5",
            },
            closeButton: { flexShrink: 0 },
          },
          variants: {
            variant: {
              info: {
                root: { bg: "blue.50", borderColor: "blue.200" },
                icon: { color: "blue.500" },
                title: { color: "blue.900" },
                description: { color: "blue.700" },
              },
              success: {
                root: { bg: "green.50", borderColor: "green.200" },
                icon: { color: "green.500" },
                title: { color: "green.900" },
                description: { color: "green.700" },
              },
              warning: {
                root: { bg: "yellow.50", borderColor: "yellow.200" },
                icon: { color: "yellow.600" },
                title: { color: "yellow.900" },
                description: { color: "yellow.800" },
              },
              danger: {
                root: { bg: "red.50", borderColor: "red.200" },
                icon: { color: "red.500" },
                title: { color: "red.900" },
                description: { color: "red.700" },
              },
            },
          },
          defaultVariants: {
            variant: "info",
          },
        },

        segmentedControl: {
          className: "segmented-control",
          description: "Segmented control styles",
          slots: ["root", "option"],
          base: {
            root: {
              display: "inline-flex",
              bg: "gray.100",
              rounded: "lg",
              p: "1",
              gap: "1",
            },
            option: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5",
              px: "3",
              py: "1.5",
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.600",
              rounded: "md",
              cursor: "pointer",
              transition: "all 0.15s",
              _hover: { color: "gray.900" },
              _disabled: { cursor: "not-allowed", opacity: 0.5 },
            },
          },
          variants: {
            fullWidth: {
              true: { root: { display: "flex", width: "full" }, option: { flex: "1" } },
            },
            selected: {
              true: {
                option: { bg: "white", color: "gray.900", boxShadow: "sm" },
              },
            },
          },
        },

        slider: {
          className: "slider",
          description: "Slider input styles",
          slots: ["root", "track", "range", "thumb"],
          base: {
            root: {
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "full",
              height: "5",
            },
            track: {
              position: "relative",
              width: "full",
              height: "1.5",
              bg: "gray.200",
              rounded: "full",
            },
            range: {
              position: "absolute",
              height: "full",
              bg: "blue.500",
              rounded: "full",
            },
            thumb: {
              position: "absolute",
              top: "50%",
              w: "4.5",
              h: "4.5",
              bg: "white",
              borderWidth: "2px",
              borderColor: "blue.500",
              rounded: "full",
              boxShadow: "sm",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow: "0 0 0 4px token(colors.blue.100)",
              },
            },
          },
          variants: {
            disabled: {
              true: {
                thumb: { cursor: "not-allowed", borderColor: "gray.300" },
                range: { bg: "gray.300" },
              },
            },
          },
        },

        dropzone: {
          className: "dropzone",
          description: "File dropzone styles",
          slots: ["root", "icon", "text", "hint"],
          base: {
            root: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2",
              width: "full",
              borderWidth: "2px",
              borderStyle: "dashed",
              borderColor: "gray.300",
              rounded: "lg",
              bg: "gray.50",
              py: "8",
              px: "4",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.15s",
              _hover: { borderColor: "blue.400", bg: "blue.50" },
            },
            icon: { color: "gray.400" },
            text: { fontSize: "sm", color: "gray.700" },
            hint: { fontSize: "xs", color: "gray.400" },
          },
          variants: {
            active: {
              true: { root: { borderColor: "blue.500", bg: "blue.50" } },
            },
            invalid: {
              true: { root: { borderColor: "red.400", bg: "red.50" } },
            },
            disabled: {
              true: {
                root: {
                  cursor: "not-allowed",
                  opacity: 0.6,
                  _hover: { borderColor: "gray.300", bg: "gray.50" },
                },
              },
            },
          },
        },

        timeline: {
          className: "timeline",
          description: "Timeline styles",
          slots: ["root", "item", "dot", "connector", "content", "title", "caption"],
          base: {
            root: { display: "flex", flexDirection: "column" },
            item: { position: "relative", display: "flex", gap: "3", pb: "6" },
            dot: {
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              w: "6",
              h: "6",
              rounded: "full",
              bg: "blue.100",
              color: "blue.600",
              zIndex: 1,
            },
            connector: {
              position: "absolute",
              left: "3",
              top: "6",
              bottom: 0,
              width: "1px",
              bg: "gray.200",
            },
            content: { flex: "1", pt: "0.5" },
            title: { fontSize: "sm", fontWeight: "medium", color: "gray.900" },
            caption: { fontSize: "xs", color: "gray.500", mt: "0.5" },
          },
        },

        table: {
          className: "table",
          description: "Table styles",
          slots: ["container", "root", "headRow", "headCell", "row", "cell"],
          base: {
            container: {
              width: "full",
              overflowX: "auto",
              borderWidth: "1px",
              borderColor: "gray.200",
              rounded: "lg",
            },
            root: {
              width: "full",
              borderCollapse: "collapse",
              fontSize: "sm",
            },
            headRow: {
              bg: "gray.50",
            },
            headCell: {
              textAlign: "left",
              px: "4",
              py: "3",
              fontSize: "xs",
              fontWeight: "semibold",
              color: "gray.500",
              textTransform: "uppercase",
              letterSpacing: "wide",
              borderBottomWidth: "1px",
              borderColor: "gray.200",
            },
            row: {
              _notLast: { borderBottomWidth: "1px", borderColor: "gray.100" },
            },
            cell: {
              px: "4",
              py: "3",
              color: "gray.700",
            },
          },
          variants: {
            hoverable: {
              true: { row: { _hover: { bg: "gray.50" } } },
            },
            bordered: {
              true: { cell: { borderWidth: "1px", borderColor: "gray.200" } },
            },
            narrow: {
              true: { cell: { py: "1.5" } },
            },
          },
          defaultVariants: {
            hoverable: true,
          },
        },

        broadcast: {
          className: "broadcast",
          description: "Full-width announcement bar styles",
          slots: ["root", "content", "action", "closeButton"],
          base: {
            root: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3",
              width: "full",
              px: "4",
              py: "2.5",
              fontSize: "sm",
              position: "relative",
            },
            content: {
              display: "flex",
              alignItems: "center",
              gap: "2",
              flexWrap: "wrap",
              justifyContent: "center",
            },
            action: {
              fontWeight: "medium",
              textDecoration: "underline",
              cursor: "pointer",
            },
            closeButton: {
              position: "absolute",
              right: "3",
              top: "50%",
              transform: "translateY(-50%)",
            },
          },
          variants: {
            variant: {
              info: { root: { bg: "blue.600", color: "white" } },
              success: { root: { bg: "green.600", color: "white" } },
              warning: { root: { bg: "yellow.500", color: "gray.900" } },
              danger: { root: { bg: "red.600", color: "white" } },
              neutral: { root: { bg: "gray.900", color: "white" } },
            },
          },
          defaultVariants: {
            variant: "neutral",
          },
        },

        scrollArea: {
          className: "scroll-area",
          description: "Custom thin-scrollbar container styles",
          slots: ["root"],
          base: {
            root: {
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "token(colors.gray.300) transparent",
              "&::-webkit-scrollbar": { width: "8px", height: "8px" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background: "token(colors.gray.300)",
                borderRadius: "9999px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "token(colors.gray.400)",
              },
            },
          },
          variants: {
            direction: {
              vertical: { root: { overflowX: "hidden", overflowY: "auto" } },
              horizontal: { root: { overflowX: "auto", overflowY: "hidden" } },
              both: { root: { overflow: "auto" } },
            },
          },
          defaultVariants: {
            direction: "both",
          },
        },
      },

      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },

      // Aligned with Mekari Pixel 3 (@mekari/pixel3-theme/src/tokens) so this
      // library's look & feel matches the reference design system.
      tokens: {
        fonts: {
          body: {
            value:
              '"Inter", -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif, "Segoe UI", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          },
        },
        colors: {
          blue: {
            50: { value: "#EAECFB" },
            100: { value: "#D5DEFF" },
            400: { value: "#4B61DD" },
            500: { value: "#1C44D5" },
            700: { value: "#0031BE" },
          },
          red: {
            50: { value: "#FDECEE" },
            400: { value: "#DA473F" },
            500: { value: "#C83E39" },
            700: { value: "#AB3129" },
          },
          green: {
            50: { value: "#E8F5EB" },
            400: { value: "#68BE79" },
            500: { value: "#4FB262" },
            700: { value: "#3C914D" },
          },
          yellow: {
            50: { value: "#FBF3DD" },
            400: { value: "#E0AB00" },
            500: { value: "#DE9400" },
            700: { value: "#DB8000" },
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
