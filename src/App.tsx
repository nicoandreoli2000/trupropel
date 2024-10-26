import { Flex, Text } from "@chakra-ui/react";
import { useLocations } from "./api";
import { PropsWithChildren } from "react";

function App() {
  const { locations, loading, error } = useLocations();

  if (loading || error) return null;

  return (
    <Layout>
      <Text fontSize="4xl">Locations</Text>
      <Flex direction="column" gap={1}>
        {locations &&
          locations.map((location) => (
            <Text key={location.id}>{location.name}</Text>
          ))}
      </Flex>
    </Layout>
  );
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      justify="center"
      w="full"
      p={4}
      direction="column"
      align="center"
      gap={6}
    >
      {children}
    </Flex>
  );
};

export default App;
