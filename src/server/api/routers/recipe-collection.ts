import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const recipeCollectionRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx: { db } }) => {
    const recipeCollections = await db.recipeCollection.findMany();
    return { recipeCollections };
  }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx: { db, userId }, input: { name } }) => {
      return db.recipeCollection.create({
        data: {
          ownerId: userId,
          name,
        },
      });
    }),
});
