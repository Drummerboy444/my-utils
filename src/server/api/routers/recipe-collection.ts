import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { isUniqueConstraintViolation } from "../utils/db-violations";

export const recipeCollectionRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx: { db, userId } }) => {
    const recipeCollections = await db.recipeCollection.findMany({
      where: { ownerId: userId },
      include: { recipes: true },
    });
    return { recipeCollections };
  }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx: { db, userId }, input: { name } }) => {
      try {
        return {
          type: "SUCCESS" as const,
          recipeCollection: await db.recipeCollection.create({
            data: {
              ownerId: userId,
              name,
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
});
