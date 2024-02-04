import { UserButton, useUser } from "@clerk/nextjs";
import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Page } from "~/components/Page";
import { api } from "~/utils/api";

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
      <UserButton afterSignOutUrl="/" />
      <TextField.Input
        value={newRecipeCollectionName}
        onChange={({ target: { value } }) => {
          setNewRecipeCollectionName(value);
        }}
      />
      <Button onClick={create}>Create</Button>
      {recipeCollectionsData.recipeCollections.map((recipeCollection) => {
        return <div key={recipeCollection.id}>{recipeCollection.name}</div>;
      })}
    </Page>
  );
}
