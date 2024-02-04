import { PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { Page } from "~/components/Page";
import { api } from "~/utils/api";

export default function RecipeCollectionsPage() {
  const { data: recipeCollectionData, isLoading: isLoadingRecipeCollections } =
    api.recipeCollection.getAll.useQuery();

  if (isLoadingRecipeCollections) return <div>Loading...</div>;

  if (recipeCollectionData === undefined) return <div>Error</div>;

  return (
    <Page>
      <Flex gap="4" direction="column" px="4">
        <Box>
          <Button>
            <PlusIcon />
            New
          </Button>
        </Box>

        {recipeCollectionData.recipeCollections.map((recipeCollection) => (
          <Card key={recipeCollection.id}>
            <Text weight="bold">{recipeCollection.name}</Text>
          </Card>
        ))}
      </Flex>
    </Page>
  );
}
