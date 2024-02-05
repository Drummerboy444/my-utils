import { TrashIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { NewRecipeCollectionButton } from "~/components/NewRecipeCollectionButton";
import { Page } from "~/components/Page";
import { absurd } from "~/utils/absurd";
import { api } from "~/utils/api";

export default function RecipeCollectionsPage() {
  const {
    data: recipeCollectionData,
    isLoading: isLoadingRecipeCollections,
    refetch: refetchRecipeCollections,
  } = api.recipeCollection.getAll.useQuery();

  const { mutate: deleteRecipeCollection } =
    api.recipeCollection.delete.useMutation({
      onSuccess: ({ type }) => {
        switch (type) {
          case "SUCCESS": {
            toast.success("Success!");
            void refetchRecipeCollections();
            return;
          }

          case "NO_RECIPE_COLLECTION_FOUND": {
            toast.error("This recipe collection does not exist...");
            return;
          }

          case "ACCESS_DENIED": {
            toast.error(
              "You do not have permission to delete this recipe collection"
            );
            return;
          }

          default: {
            absurd(type);
          }
        }
      },
      onError: () => {
        toast.error("Something went wrong, please try again later...");
      },
    });

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

              <IconButton
                color="red"
                variant="ghost"
                onClick={() => {
                  deleteRecipeCollection({
                    recipeCollectionId: recipeCollection.id,
                  });
                }}
              >
                <TrashIcon />
              </IconButton>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Page>
  );
}
