import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { DeleteRecipeCollectionButton } from "~/components/DeleteRecipeCollectionButton";
import { CreateRecipeCollectionButton } from "~/components/CreateRecipeCollectionButton";
import { ErrorPage } from "~/components/Pages/ErrorPage";
import { LoadingPage } from "~/components/Pages/LoadingPage";
import { Page } from "~/components/Pages/Page";
import { api } from "~/utils/api";

export default function RecipeCollectionsPage() {
  const {
    data: recipeCollectionData,
    isLoading: isLoadingRecipeCollections,
    refetch: refetchRecipeCollections,
  } = api.recipeCollection.getAll.useQuery();

  if (isLoadingRecipeCollections) return <LoadingPage />;

  if (recipeCollectionData === undefined)
    return (
      <ErrorPage message="We couldn't find your recipe books, please try again later" />
    );

  return (
    <Page>
      <Flex gap="4" direction="column" px="4">
        <Box>
          <CreateRecipeCollectionButton refetch={refetchRecipeCollections} />
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
                refetch={async () => {
                  await refetchRecipeCollections();
                }}
              />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Page>
  );
}
