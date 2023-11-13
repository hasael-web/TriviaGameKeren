import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import routes from "./routes";
import theme from "./utils/theme";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={routes} />
    </ChakraProvider>
  );
}
