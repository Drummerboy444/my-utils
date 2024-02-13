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

  return <Page>Recipe page: {recipe.name}</Page>;
}
