import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { log } from "../utils/log";

export const recipeRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx: { db, userId } }) => {
    const recipes = await db.recipe.findMany();

    log({ level: "INFO", message: "Getting all recipes", userId });

    return { recipes };
  }),
});
