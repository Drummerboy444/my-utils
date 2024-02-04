import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { isUniqueConstraintViolation } from "../utils/db-violations";

export const recipeRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        recipeCollectionId: z.string(),
        name: z.string(),
        body: z.string().default(""),
      })
    )
    .mutation(
      async ({
        ctx: { db, userId },
        input: { recipeCollectionId, name, body },
      }) => {
        const recipeCollection = await db.recipeCollection.findUnique({
          where: { id: recipeCollectionId },
          select: { ownerId: true },
        });

        if (recipeCollection === null)
          return { type: "NO_RECIPE_COLLECTION_FOUND" as const };

        const isRecipeCollectionOwner = recipeCollection.ownerId === userId;

        if (!isRecipeCollectionOwner) return { type: "ACCESS_DENIED" as const };

        try {
          return {
            type: "SUCCESS" as const,
            recipe: await db.recipe.create({
              data: {
                recipeCollectionId,
                name,
                body,
              },
            }),
          };
        } catch (error) {
          if (isUniqueConstraintViolation(error)) {
            return { type: "RECIPE_ALREADY_EXISTS" as const };
          }

          throw error;
        }
      }
    ),
});
