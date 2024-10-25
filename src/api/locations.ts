import { gql, useApolloClient, useQuery } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }x
`;

export const useLocations = () => {
  const client = useApolloClient();
  const query = useQuery<{ locations: { id: string; name: string }[] }>(
    GET_LOCATIONS,
    {
      onCompleted: async () => {
        console.log("hey");
        await client.refetchQueries({
          include: "active",
        });
        console.log("done?");
      },
    }
  );

  return {
    ...query,
    locations: query.data?.locations,
  };
};
