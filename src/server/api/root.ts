import { createTRPCRouter } from "~/server/api/trpc";
import { recipeRouter } from "./routers/recipe-router";
import { recipeCollectionRouter } from "./routers/recipe-collection-router";
import { adminRouter } from "./routers/admin-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  recipeCollection: recipeCollectionRouter,
  recipe: recipeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
