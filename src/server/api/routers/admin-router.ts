import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  statistics: adminProcedure.query(async ({ ctx: { db } }) => {
    const recipeCollectionsCount = await db.recipeCollection.count();
    const recipesCount = await db.recipe.count();

    return { recipeCollectionsCount, recipesCount };
  }),
});
