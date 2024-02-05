import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { DeleteRecipeCollectionButton } from "~/components/DeleteRecipeCollectionButton";
import { NewRecipeCollectionButton } from "~/components/NewRecipeCollectionButton";
import { Page } from "~/components/Page";
import { api } from "~/utils/api";

export default function RecipeCollectionsPage() {
  const {
    data: recipeCollectionData,
    isLoading: isLoadingRecipeCollections,
    refetch: refetchRecipeCollections,
  } = api.recipeCollection.getAll.useQuery();

  if (isLoadingRecipeCollections) return <div>Loading...</div>;

  if (recipeCollectionData === undefined) return <div>Error</div>;

  return (
    <Page>
      <Flex gap="4" direction="column" px="4">
        <Box>
          <NewRecipeCollectionButton refetch={refetchRecipeCollections} />
        </Box>

        {recipeCollectionData.recipeCollections.map((recipeCollection) => (
          <Card key={recipeCollection.id}>
            <Flex gap="2">
              <Flex grow="1" direction="column" gap="2">
                <Text weight="bold">{recipeCollection.name}</Text>
                <Text color="gray" size="2">
                  {recipeCollection.description}
                </Text>
              </Flex>

              <DeleteRecipeCollectionButton
                recipeCollectionId={recipeCollection.id}
                refetch={refetchRecipeCollections}
              />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Page>
  );
}