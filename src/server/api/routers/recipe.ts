import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx: { db } }) => {
    const recipes = await db.recipe.findMany();
    return { recipes };
  }),

  create: privateProcedure
    .input(
      z.object({
        recipeCollectionId: z.string(),
        name: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { db, userId }, input: { recipeCollectionId, name } }) => {
        const recipeCollection = await db.recipeCollection.findUnique({
          where: { id: recipeCollectionId },
          select: { ownerId: true },
        });

        if (recipeCollection === null)
          return { type: "NO_RECIPE_COLLECTION_FOUND" as const };

        const isRecipeCollectionOwner = recipeCollection.ownerId === userId;

        if (!isRecipeCollectionOwner) return { type: "ACCESS_DENIED" as const };

        return db.recipe.create({
          data: {
            recipeCollectionId,
            name,
            body: "",
          },
        });
      }
    ),
});
