import { useUser } from "@clerk/nextjs";
import { Box, Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Page } from "~/components/Page";
import { api } from "~/utils/api";

const CreateRecipeForm = ({
  recipeCollectionId,
  refetch,
}: {
  recipeCollectionId: string;
  refetch: () => void;
}) => {
  const [recipeName, setRecipeName] = useState("");
  const { mutate: createRecipe } = api.recipe.create.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const createRecipeAction = (recipeCollectionId: string) => {
    createRecipe({ recipeCollectionId, name: recipeName });
    setRecipeName("");
  };

  return (
    <>
      <TextField.Input
        value={recipeName}
        onChange={({ target: { value } }) => {
          setRecipeName(value);
        }}
      />
      <Button
        onClick={() => {
          createRecipeAction(recipeCollectionId);
        }}
      >
        Create recipe
      </Button>
    </>
  );
};

export default function Home() {
  const { isLoaded: userIsLoaded } = useUser();

  const {
    data: recipeCollectionsData,
    isLoading: isLoadingRecipeCollections,
    refetch,
  } = api.recipeCollection.getAll.useQuery();

  const [newRecipeCollectionName, setNewRecipeCollectionName] = useState("");

  const { mutate } = api.recipeCollection.create.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const create = () => {
    mutate({ name: newRecipeCollectionName });
    setNewRecipeCollectionName("");
  };

  if (!userIsLoaded || isLoadingRecipeCollections) return <div>Loading...</div>;

  if (recipeCollectionsData === undefined) return <div>Error!</div>;

  return (
    <Page>
      <Box p="4">
        <TextField.Input
          value={newRecipeCollectionName}
          onChange={({ target: { value } }) => {
            setNewRecipeCollectionName(value);
          }}
        />
        <Button onClick={create}>Create recipe collection</Button>
        <Box>
          {recipeCollectionsData.recipeCollections.map((recipeCollection) => (
            <Box key={recipeCollection.id}>
              {recipeCollection.name}
              <Box pl="4">
                {recipeCollection.recipes.map((recipe) => (
                  <Box key={recipe.id}>{recipe.name}</Box>
                ))}
                <CreateRecipeForm
                  recipeCollectionId={recipeCollection.id}
                  refetch={() => {
                    void refetch();
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Page>
  );
}
