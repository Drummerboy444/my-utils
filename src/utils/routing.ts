export const HOME_ROUTE = "/";
export const RECIPE_COLLECTIONS_ROUTE = "/recipe-books";
export const ADMIN_ROUTE = "/admin";

export const getRecipeCollectionRoute = (recipeCollectionId: string) =>
  `${RECIPE_COLLECTIONS_ROUTE}/${recipeCollectionId}`;
