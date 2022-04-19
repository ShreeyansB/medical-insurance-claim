import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: "Plus Jakarta Sans, sans-serif",
    body: "Roboto, sans-serif",
  },
  styles: {
    global: (props) => ({
      "html, body": {
        bg: props.colorMode === "dark" ? colors.bgDark : colors.bgLight,
      },
    }),
  },
});

export default theme;
