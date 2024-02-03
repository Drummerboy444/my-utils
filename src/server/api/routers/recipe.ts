import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx: { db } }) => {
    const recipes = await db.recipe.findMany();

    return { recipes };
  }),
});
