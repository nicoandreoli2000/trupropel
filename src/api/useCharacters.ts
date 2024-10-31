import { gql, useQuery } from "@apollo/client";

const GET_CHARACTERS = gql`
  query Characters($filter: FilterCharacter, $page: Int) {
    characters(filter: $filter, page: $page) {
      results {
        id
        name
        status
        image
        location {
          id
          name
        }
        episode {
          id
          episode
          created
        }
      }
      info {
        count
        next
        pages
        prev
      }
    }
  }
`;

export const useCharacters = (inputs?: {
  filter?: {
    name?: string;
  };
  page?: number;
}) => {
  const { filter, page } = inputs || {};

  console.log(filter);

  const query = useQuery<{
    characters: {
      results: {
        id: string;
        name: string;
        status: string;
        image: string;
        location: {
          id: string;
          name: string;
        };
        episode: {
          id: string;
          episode: string;
          created: string;
        }[];
      }[];
      info: {
        count: number;
        next: number;
        pages: number;
        prev: number;
      };
    };
  }>(GET_CHARACTERS, { variables: { filter, page } });

  return query;
};
