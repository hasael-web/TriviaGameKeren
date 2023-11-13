import { Button, Flex, Text } from "@chakra-ui/react";
import {
  MdHome,
  MdPeople,
  MdQuestionMark,
  MdLogout,
  MdLogin,
  MdFace,
  MdAttachMoney,
} from "react-icons/md";
import NavLink from "./NavLink/NavLink";

export default function Navbar() {
  const isLogin = false;
  return (
    <Flex
      p={4}
      direction="column"
      gap={4}
      borderRight="1px solid"
      borderColor="whiteAlpha.300"
    >
      <Flex w="full" justify="center">
        <Text fontSize="2xl" fontWeight={900}>
          Trivia Game
        </Text>
      </Flex>
      <Flex as="nav" my={10} gap={2} direction="column">
        <NavLink Icon={MdHome} to="/" label="Home" />
        <NavLink Icon={MdPeople} to="/users" label="Users" />
        <NavLink Icon={MdQuestionMark} to="/questions" label="Questions" />
        <NavLink Icon={MdFace} to="/avatar" label="Avatar" />
        <NavLink Icon={MdAttachMoney} to="/transaction" label="Transaction" />
      </Flex>
      <Button
        colorScheme={isLogin ? "red" : "green"}
        mt="auto"
        w="full"
        gap={2}
        _hover={{ color: "black", bg: "white" }}
      >
        {isLogin ? <MdLogout size="1.4em" /> : <MdLogin size="1.4em" />}
        <Text>{isLogin ? "Logout" : "Login"}</Text>
      </Button>
    </Flex>
  );
}
