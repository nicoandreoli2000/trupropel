import { Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface LayoutProps {
  title: string;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title,
  children,
}) => {
  return (
    <Flex
      justify="center"
      w="full"
      p={4}
      direction="column"
      align="center"
      gap={6}
    >
      <Text fontSize="4xl">{title}</Text>
      {children}
    </Flex>
  );
};
