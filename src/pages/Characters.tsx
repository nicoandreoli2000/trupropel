import {
  Spinner,
  Input,
  Flex,
  IconButton,
  Text,
  Table,
  Image,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { debounce } from "lodash";
import { useState, useCallback, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useCharacters } from "../api";
import { Layout } from "../components";

export const Characters = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((term) => setDebouncedSearchTerm(term), 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const [page, setPage] = useState(1);

  const { data, loading, error } = useCharacters({
    filter: {
      name: debouncedSearchTerm,
    },
    page,
  });

  if (loading) {
    return (
      <Layout title="Characters">
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Characters">
        <Text>Something went wrong</Text>
      </Layout>
    );
  }

  return (
    <Layout title="Characters">
      <Input
        _focus={{ borderColor: "inherit" }}
        colorScheme="blue"
        placeholder="Search by name..."
        onChange={(evt) => setSearchTerm(evt.target.value)}
        value={searchTerm}
        w={200}
      />
      <Table.Root>
        <Table.Header>
          <Table.Row bg="none">
            <Table.ColumnHeader color="black">Name</Table.ColumnHeader>
            <Table.ColumnHeader color="black">Status</Table.ColumnHeader>
            <Table.ColumnHeader color="black">Image</Table.ColumnHeader>
            <Table.ColumnHeader color="black">Location</Table.ColumnHeader>
            <Table.ColumnHeader color="black">
              First episode date
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data && data.characters.results.length > 0 ? (
            data.characters.results.map((character) => (
              <Table.Row key={character.id} bg="none">
                <Table.Cell>{character.name}</Table.Cell>
                <Table.Cell>{character.status}</Table.Cell>
                <Table.Cell>
                  <Image w={50} src={character.image} alt={character.name} />
                </Table.Cell>
                <Table.Cell>{character.location.name}</Table.Cell>
                <Table.Cell>
                  {character.episode.length > 0
                    ? formatDate(character.episode[0].created)
                    : "No episodes"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Text>No characters found</Text>
          )}
        </Table.Body>
      </Table.Root>
      {data?.characters.results && (
        <Flex align="center" gap={2}>
          <IconButton
            as={BiChevronLeft}
            onClick={page <= 1 ? undefined : () => setPage((p) => p - 1)}
            disabled={page <= 1}
          />
          <Text>
            {page} of {data?.characters.info.pages}
          </Text>
          <IconButton
            as={BiChevronRight}
            onClick={
              page >= data?.characters.info.pages
                ? undefined
                : () => setPage((p) => p + 1)
            }
            disabled={page >= data?.characters.info.pages}
          />
        </Flex>
      )}
    </Layout>
  );
};

const formatDate = (date: string) => {
  return formatDistance(date, new Date(), { addSuffix: true });
};
