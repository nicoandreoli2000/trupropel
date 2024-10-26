import { gql, useQuery } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export const useLocations = () => {
  const query = useQuery<{ locations: { id: string; name: string }[] }>(
    GET_LOCATIONS
  );

  return {
    ...query,
    locations: query.data?.locations,
  };
};
