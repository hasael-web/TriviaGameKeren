import { Link, Text } from "@chakra-ui/react";
import { NavLink as NavLinkReactRouter, To } from "react-router-dom";
import { IconType } from "react-icons";

interface INavLinkprops {
  Icon: IconType;
  label: string;
  to: To;
}

export default function NavLink({ Icon, label, to }: INavLinkprops) {
  return (
    <Link
      as={NavLinkReactRouter}
      to={to}
      display="flex"
      alignItems="center"
      gap={4}
      py={3}
      px={4}
      borderRadius="lg"
      color="whiteAlpha.600"
      cursor="pointer"
      w="full"
      shadow="sm"
      transition="color 150ms ease-in-out"
      _hover={{ color: "white", bg: "background.400" }}
      _activeLink={{ color: "white", bg: "background.400" }}
    >
      <Icon size="1.8rem" />
      <Text fontWeight={700}>{label}</Text>
    </Link>
  );
}
