import { DotFilledIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { PageHeading } from "~/components/Headers/PageHeading";
import { PageSubHeading } from "~/components/Headers/PageSubHeading";
import { ErrorPage } from "~/components/Pages/ErrorPage";
import { LoadingPage } from "~/components/Pages/LoadingPage";
import { Page } from "~/components/Pages/Page";
import { useSafeRecipeIdQueryParams } from "~/hooks/use-safe-query-params";
import { api } from "~/utils/api";

export default function RecipePage() {
  const queryParams = useSafeRecipeIdQueryParams();

  const { data: recipeData, isLoading: isLoadingRecipe } =
    api.recipe.get.useQuery(
      queryParams !== "LOADING" && queryParams !== "QUERY_PARAMS_UNAVAILABLE"
        ? queryParams
        : { recipeId: "" },
      {
        enabled:
          queryParams !== "LOADING" &&
          queryParams !== "QUERY_PARAMS_UNAVAILABLE",
      }
    );

  if (isLoadingRecipe) return <LoadingPage />;

  if (recipeData === undefined)
    return (
      <ErrorPage message="We couldn't find this recipe, please try again later" />
    );

  if (recipeData.type === "NO_RECIPE_FOUND")
    return <ErrorPage message="This recipe does not exist" />;

  if (recipeData.type === "ACCESS_DENIED")
    return (
      <ErrorPage message="You do not have permission to access this recipe" />
    );

  const { recipe } = recipeData;

  return (
    <Page>
      <Box pb="6">
        <PageHeading heading={recipe.name} />
        <PageSubHeading subHeading={recipe.description} />
      </Box>

      <Box pb="2">
        <Heading size="7" as="h3">
          Ingredients
        </Heading>
      </Box>

      <Flex direction="column" gap="2" pb="6">
        {recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ingredient) => (
            <Flex key={ingredient.id} align="center" gap="1">
              <DotFilledIcon />
              <Text>
                {ingredient.quantity} x {ingredient.name}
              </Text>
            </Flex>
          ))
        ) : (
          <Text color="gray" style={{ fontStyle: "italic" }}>
            This recipe has no ingredients...
          </Text>
        )}
      </Flex>

      <Box pb="2">
        <Heading size="7" as="h3">
          Method
        </Heading>
      </Box>

      {recipe.method === "" ? (
        <Text color="gray" style={{ fontStyle: "italic" }}>
          This recipe has no method...
        </Text>
      ) : (
        <Text>{recipe.method}</Text>
      )}
    </Page>
  );
}
