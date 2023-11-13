import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
  colors: {
    background: {
      400: "#2A2A2A", // 5%
      500: "#1d1d1d",
    },
  },
});

export default theme;
