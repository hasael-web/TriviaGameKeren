import { Grid } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);
  return (
    <Grid
      gridTemplateColumns="280px 1fr"
      gridTemplateRows="100vh"
      overflow="hidden"
      bg="background.500"
      color="white"
    >
      <Navbar />
      <Outlet />
    </Grid>
  );
}
