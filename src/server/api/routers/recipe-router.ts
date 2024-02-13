import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { isUniqueConstraintViolation } from "../utils/db-violations";

export const recipeRouter = createTRPCRouter({
  get: privateProcedure
    .input(
      z.object({
        recipeId: z.string(),
      })
    )
    .query(async ({ ctx: { db, userId }, input: { recipeId } }) => {
      const recipe = await db.recipe.findUnique({
        where: { id: recipeId },
        include: {
          recipeCollection: { select: { ownerId: true } },
          ingredients: { select: { name: true, quantity: true } },
        },
      });

      if (recipe === null) return { type: "NO_RECIPE_FOUND" as const };

      const canAccessRecipe = recipe.recipeCollection.ownerId === userId;

      if (!canAccessRecipe) return { type: "ACCESS_DENIED" as const };

      return { type: "SUCCESS" as const, recipe };
    }),

  create: privateProcedure
    .input(
      z.object({
        recipeCollectionId: z.string(),
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(
      async ({
        ctx: { db, userId },
        input: { recipeCollectionId, name, description },
      }) => {
        const preprocessedName = name.trim();
        if (preprocessedName === "") return { type: "EMPTY_NAME" as const };

        const preprocessedDescription = description.trim();
        if (preprocessedDescription === "")
          return { type: "EMPTY_DESCRIPTION" as const };

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
                name: preprocessedName,
                description: preprocessedDescription,
                method: "",
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
