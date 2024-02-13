import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { CreateRecipeButton } from "~/components/CreateRecipeButton";
import { ErrorPage } from "~/components/Pages/ErrorPage";
import { LoadingPage } from "~/components/Pages/LoadingPage";
import { Page } from "~/components/Pages/Page";
import { useSafeRecipeCollectionIdQueryParams } from "~/hooks/use-safe-query-params";
import { api } from "~/utils/api";

export default function RecipePage() {
  const queryParams = useSafeRecipeCollectionIdQueryParams();

  const {
    data: recipeCollectionData,
    isLoading: isLoadingRecipeCollection,
    refetch: refetchRecipeCollection,
  } = api.recipeCollection.get.useQuery(
    queryParams !== "LOADING" && queryParams !== "QUERY_PARAMS_UNAVAILABLE"
      ? queryParams
      : { recipeCollectionId: "" },
    {
      enabled:
        queryParams !== "LOADING" && queryParams !== "QUERY_PARAMS_UNAVAILABLE",
    }
  );

  if (isLoadingRecipeCollection) return <LoadingPage />;

  if (recipeCollectionData === undefined)
    return (
      <ErrorPage message="We couldn't find this recipe book, please try again later" />
    );

  if (recipeCollectionData.type === "NO_RECIPE_COLLECTION_FOUND")
    return <ErrorPage message="This recipe book does not exist" />;

  if (recipeCollectionData.type === "ACCESS_DENIED")
    return (
      <ErrorPage message="You do not have permission to access this recipe book" />
    );

  const { recipeCollection } = recipeCollectionData;

  return (
    <Page>
      <Box pb="6">
        <Heading size="9">{recipeCollection.name}</Heading>
        <Heading size="5" color="gray">
          {recipeCollection.description}
        </Heading>
      </Box>

      <Box pb="2">
        <CreateRecipeButton
          recipeCollectionId={recipeCollection.id}
          refetch={async () => {
            await refetchRecipeCollection();
          }}
        />
      </Box>

      <Flex direction="column" gap="2">
        {recipeCollection.recipes.map((recipe) => (
          <Text key={recipe.id}>{recipe.name}</Text>
        ))}
      </Flex>
    </Page>
  );
}
