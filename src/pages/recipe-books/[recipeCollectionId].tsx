import { ErrorPage } from "~/components/Pages/ErrorPage";
import { LoadingPage } from "~/components/Pages/LoadingPage";
import { Page } from "~/components/Pages/Page";
import { useSafeRecipeCollectionIdQueryParams } from "~/hooks/use-safe-query-params";

export default function RecipePage() {
  const queryParams = useSafeRecipeCollectionIdQueryParams();

  if (queryParams === "LOADING") return <LoadingPage />;

  if (queryParams === "QUERY_PARAMS_UNAVAILABLE")
    return <ErrorPage message="Params unavailable" />;

  return (
    <Page>This is a page for recipe ID: {queryParams.recipeCollectionId}</Page>
  );
}
