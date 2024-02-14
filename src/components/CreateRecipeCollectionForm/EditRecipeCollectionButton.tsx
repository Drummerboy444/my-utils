import { ExclamationTriangleIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Callout, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { absurd } from "~/utils/absurd";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import {
  RecipeCollectionForm,
  type RecipeCollectionFormState,
} from "./RecipeCollectionForm";

export const EditRecipeCollectionButton = ({
  recipeCollectionId,
  defaultValues,
  refetch,
}: {
  recipeCollectionId: string;
  defaultValues: RecipeCollectionFormState;
  refetch: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  const [formState, setFormState] =
    useState<RecipeCollectionFormState>(defaultValues);

  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutate: editRecipeCollection, isLoading: isEditingRecipeCollection } =
    api.recipeCollection.edit.useMutation({
      onSuccess: async ({ type }) => {
        switch (type) {
          case "SUCCESS": {
            await refetch();
            setOpen(false);
            toast.success("Successfully edited recipe book");
            return;
          }

          case "EMPTY_NAME": {
            setErrorMessage("Name cannot be empty");
            return;
          }

          case "EMPTY_DESCRIPTION": {
            setErrorMessage("Description cannot be empty");
            return;
          }

          case "NO_RECIPE_COLLECTION_FOUND": {
            setOpen(false);
            toast.error("This recipe book does not exist");
            return;
          }

          case "ACCESS_DENIED": {
            setOpen(false);
            toast.error("You do not have permission to edit this recipe book");
            return;
          }

          default: {
            absurd(type);
          }
        }
      },
      onError: () => {
        setErrorMessage(
          "Something went wrong while editing this recipe book, please try again later"
        );
      },
    });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setFormState(defaultValues);
        setErrorMessage(undefined);
      }}
    >
      <Dialog.Trigger>
        <IconButton color="gold" variant="ghost">
          <Pencil1Icon />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit Recipe Book</Dialog.Title>

        <Flex direction="column" gap="5">
          <RecipeCollectionForm
            formState={formState}
            onFormStateChange={(formStateChange) => {
              setFormState({ ...formState, ...formStateChange });
            }}
          />

          {errorMessage !== undefined && (
            <Callout.Root color="red">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>{errorMessage}</Callout.Text>
            </Callout.Root>
          )}

          <Flex gap="3" justify="end" align="center">
            {isEditingRecipeCollection && <LoadingSpinner />}
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                disabled={isEditingRecipeCollection}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                setErrorMessage(undefined);
                editRecipeCollection({ recipeCollectionId, ...formState });
              }}
              disabled={isEditingRecipeCollection}
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
