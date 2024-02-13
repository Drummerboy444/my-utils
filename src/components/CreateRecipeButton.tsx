import { ExclamationTriangleIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { absurd } from "~/utils/absurd";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner";

export const CreateRecipeButton = ({
  recipeCollectionId,
  refetch,
}: {
  recipeCollectionId: string;
  refetch: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutate: createRecipe, isLoading: isCreatingRecipe } =
    api.recipe.create.useMutation({
      onSuccess: async ({ type }) => {
        switch (type) {
          case "SUCCESS": {
            await refetch();
            setOpen(false);
            toast.success("Successfully created recipe");
            return;
          }

          case "RECIPE_ALREADY_EXISTS": {
            setErrorMessage("A recipe with this name already exists");
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
            toast.error(
              "You do not have permission to add to this recipe book"
            );
            return;
          }

          default: {
            absurd(type);
          }
        }
      },
      onError: () => {
        setErrorMessage(
          "Something went wrong while creating this recipe, please try again later"
        );
      },
    });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setName("");
        setDescription("");
        setErrorMessage(undefined);
      }}
    >
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
          New recipe
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>New Recipe</Dialog.Title>

        <Flex direction="column" gap="5">
          <Box>
            <Text>Name:</Text>
            <TextField.Input
              value={name}
              onChange={({ target: { value } }) => {
                setName(value);
              }}
            />
          </Box>
          <Box>
            <Text>Description:</Text>
            <TextField.Input
              value={description}
              onChange={({ target: { value } }) => {
                setDescription(value);
              }}
            />
          </Box>

          {errorMessage !== undefined && (
            <Callout.Root color="red">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>{errorMessage}</Callout.Text>
            </Callout.Root>
          )}

          <Flex gap="3" justify="end" align="center">
            {isCreatingRecipe && <LoadingSpinner />}
            <Dialog.Close>
              <Button variant="soft" color="gray" disabled={isCreatingRecipe}>
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                setErrorMessage(undefined);
                createRecipe({ recipeCollectionId, name, description });
              }}
              disabled={isCreatingRecipe}
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
