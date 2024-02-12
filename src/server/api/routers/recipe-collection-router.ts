import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { isUniqueConstraintViolation } from "../utils/db-violations";

export const recipeCollectionRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx: { db, userId } }) => {
    const recipeCollections = await db.recipeCollection.findMany({
      where: { ownerId: userId },
    });
    return { recipeCollections };
  }),

  get: privateProcedure
    .input(z.object({ recipeCollectionId: z.string() }))
    .query(async ({ ctx: { db, userId }, input: { recipeCollectionId } }) => {
      const recipeCollection = await db.recipeCollection.findUnique({
        where: { id: recipeCollectionId },
        include: { recipes: true },
      });

      if (recipeCollection === null)
        return { type: "NO_RECIPE_COLLECTION_FOUND" as const };

      const canAccessRecipeCollection = recipeCollection.ownerId === userId;

      if (!canAccessRecipeCollection) return { type: "ACCESS_DENIED" as const };

      return { type: "SUCCESS" as const, recipeCollection };
    }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx: { db, userId }, input: { name, description } }) => {
      const preprocessedName = name.trim();
      if (preprocessedName === "") return { type: "EMPTY_NAME" as const };

      const preprocessedDescription = description.trim();
      if (preprocessedDescription === "")
        return { type: "EMPTY_DESCRIPTION" as const };

      try {
        return {
          type: "SUCCESS" as const,
          recipeCollection: await db.recipeCollection.create({
            data: {
              ownerId: userId,
              name: preprocessedName,
              description: preprocessedDescription,
            },
          }),
        };
      } catch (error) {
        if (isUniqueConstraintViolation(error)) {
          return { type: "RECIPE_COLLECTION_ALREADY_EXISTS" as const };
        }

        throw error;
      }
    }),

  delete: privateProcedure
    .input(z.object({ recipeCollectionId: z.string() }))
    .mutation(
      async ({ ctx: { db, userId }, input: { recipeCollectionId } }) => {
        const recipeCollection = await db.recipeCollection.findUnique({
          where: { id: recipeCollectionId },
        });

        if (recipeCollection === null) {
          return { type: "NO_RECIPE_COLLECTION_FOUND" as const };
        }

        const canDeleteRecipeCollection = recipeCollection.ownerId === userId;

        if (!canDeleteRecipeCollection)
          return { type: "ACCESS_DENIED" as const };

        return {
          type: "SUCCESS" as const,
          adventure: await db.recipeCollection.delete({
            where: { id: recipeCollectionId },
          }),
        };
      }
    ),
});
