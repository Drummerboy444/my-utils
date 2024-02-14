import {
  Box,
  Flex,
  Grid,
  Heading,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { CreateRecipeButton } from "~/components/CreateRecipeButton";
import { ErrorPage } from "~/components/Pages/ErrorPage";
import { LoadingPage } from "~/components/Pages/LoadingPage";
import { Page } from "~/components/Pages/Page";
import { useSafeRecipeCollectionIdQueryParams } from "~/hooks/use-safe-query-params";
import { api } from "~/utils/api";
import { getRecipeRoute } from "~/utils/routing";

export default function RecipeCollectionPage() {
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
        <Heading size="9" as="h1">
          {recipeCollection.name}
        </Heading>
        <Heading size="6" color="gray" as="h2">
          {recipeCollection.description}
        </Heading>
      </Box>

      <Box pb="6">
        <CreateRecipeButton
          recipeCollectionId={recipeCollection.id}
          refetch={async () => {
            await refetchRecipeCollection();
          }}
        />
      </Box>

      {recipeCollection.recipes.length > 0 ? (
        <Flex direction="column" gap="2">
          {recipeCollection.recipes.map((recipe, i) => [
            <Link key={recipe.id} href={getRecipeRoute(recipe.id)}>
              {/* @ts-expect-error At the time of writing, the type of columns is coming through as never */}
              <Grid columns="2">
                <Strong>{recipe.name}</Strong>
                <Text>{recipe.description}</Text>
              </Grid>
            </Link>,
            ...(i < recipeCollection.recipes.length - 1
              ? [<Separator key={`${recipe.id}-separator`} size="4" />]
              : []),
          ])}
        </Flex>
      ) : (
        <Text color="gray" style={{ fontStyle: "italic" }}>
          This recipe book has no recipes...
        </Text>
      )}
    </Page>
  );
}
