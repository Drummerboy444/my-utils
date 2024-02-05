import { clerkClient } from "@clerk/nextjs";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  statistics: adminProcedure.query(async ({ ctx: { db } }) => {
    const recipeCollectionsCount = await db.recipeCollection.count();
    const recipesCount = await db.recipe.count();
    const ingredientsCount = await db.ingredient.count();
    const usersCount = await clerkClient.users.getCount();

    return {
      recipeCollectionsCount,
      recipesCount,
      ingredientsCount,
      usersCount,
    };
  }),
});
