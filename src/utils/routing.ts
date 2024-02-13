import { or } from "./or";

export const HOME_ROUTE = "/";
export const RECIPE_COLLECTIONS_ROUTE = "/recipe-books";
export const RECIPES_ROUTE = "/recipes";
export const ADMIN_ROUTE = "/admin";

const isRoute = (path: string) => (route: string) => route.startsWith(path);
const isExactRoute = (path: string) => (route: string) => route === path;

export const isHomeRoute = isExactRoute(HOME_ROUTE);
export const isRecipeCollectionsRoute = or(
  isRoute(RECIPE_COLLECTIONS_ROUTE),
  isRoute(RECIPES_ROUTE)
);
export const isAdminRoute = isExactRoute(ADMIN_ROUTE);

export const getRecipeCollectionRoute = (recipeCollectionId: string) =>
  `${RECIPE_COLLECTIONS_ROUTE}/${recipeCollectionId}`;

export const getRecipeRoute = (recipeId: string) =>
  `${RECIPES_ROUTE}/${recipeId}`;
