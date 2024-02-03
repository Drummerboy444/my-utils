import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx: { db } }) => {
    const recipes = await db.recipe.findMany();

    return { recipes };
  }),
});
