import { ExclamationTriangleIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Callout,
  Flex,
  IconButton,
} from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { absurd } from "~/utils/absurd";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner";

export const DeleteRecipeButton = ({
  recipeId,
  refetch,
}: {
  recipeId: string;
  refetch: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutate: deleteRecipe, isLoading: isDeletingRecipe } =
    api.recipe.delete.useMutation({
      onSuccess: async ({ type }) => {
        switch (type) {
          case "SUCCESS": {
            await refetch();
            setOpen(false);
            toast.success("Successfully deleted recipe");
            return;
          }

          case "NO_RECIPE_FOUND": {
            setOpen(false);
            toast.error("This recipe does not exist");
            return;
          }

          case "ACCESS_DENIED": {
            setOpen(false);
            toast.error("You do not have permission to delete this recipe");
            return;
          }

          default: {
            absurd(type);
          }
        }
      },
      onError: () => {
        setErrorMessage(
          "Something went wrong while deleting this recipe, please try again later"
        );
      },
    });

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setErrorMessage(undefined);
      }}
    >
      <AlertDialog.Trigger>
        <IconButton color="red" variant="ghost">
          <TrashIcon />
        </IconButton>
      </AlertDialog.Trigger>

      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete Recipe</AlertDialog.Title>

        <Flex gap="3" direction="column">
          <AlertDialog.Description>
            This action cannot be undone.
          </AlertDialog.Description>

          {errorMessage !== undefined && (
            <Callout.Root color="red">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>{errorMessage}</Callout.Text>
            </Callout.Root>
          )}

          <Flex gap="3" justify="end" align="center">
            {isDeletingRecipe && <LoadingSpinner />}
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" disabled={isDeletingRecipe}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <Button
              color="red"
              onClick={() => {
                setErrorMessage(undefined);
                deleteRecipe({ recipeId });
              }}
              disabled={isDeletingRecipe}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
